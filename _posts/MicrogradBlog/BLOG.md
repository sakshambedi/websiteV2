---
title: "Micrograd: A Chronological Deep Dive into Design, Development, and Performance"
date: "2025-07-12"
category: "ML"
tags:
  [
    "ML",
    "Machine Learning",
    "PyTorch",
    "Eigen",
    "C++",
    "TensorFlow",
    "tinygrad",
  ]
---

## 0. First Steps: Python-only Buffer with array.array

**Commits:** very initial prototype
Before diving into C++, the earliest versions of micrograd used Python's built-in `array.array` to store raw numeric data. In `grad/buffer.py`, a simple wrapper managed an `array.array`:

```python
from array import array

class SimpleBuffer:
    def __init__(self, data, dtype):
        self._dtype = dtype
        self._storage = array(dtype.typecode, data)
```

This approach delivered functional correctness and easy iterability but suffered from pure-Python overhead:

- 1M-element addition timing: **~0.15 s**
- Lacked SIMD/vectorization and memory alignment control
- Python loop dispatch dominated runtime

To overcome these limitations and unlock native performance, the project soon transitioned to a C++ backend via pybind11.

_Last updated: commit c94181c_

This post walks through the complete development history of **micrograd**, tracing decisions, challenges, and benchmarks from the earliest SIMD buffer integration to the final performance-tuned kernels. Each section maps to key commits, illustrating how the code evolved and why.

---

## 1. Laying the Foundation: SIMD Vector Buffer and CPU Kernel (commit 5f0585e)

**Date:** Early prototype stage
**Commit:** `5f0585e - Add SIMD vector buffer and CPU kernel`

- Introduced `VecBuffer`, a templated C++ container supporting SIMD loads/stores.
- Built the first `cpu_kernel.cpp`, exposing raw buffer operations via pybind11.
- Motivation: achieve low-level control over memory alignment and vectorization.
- Challenge: ensuring proper alignment on multiple platforms.

**Outcome:** Successful proof-of-concept for C++-based tensor data storage.

---

## 2. Modular SIMD Support and Build Refactor (commit 4ac4835)

**Date:** After initial prototype
**Commit:** `4ac4835 - Refactor kernel and build system for modular SIMD support`

- Refactored CMake and build system to allow optional SIMD backends.
- Separated alignment utilities, so we could swap in AVX2, SSE, or scalar paths.
- This modularity set the stage for future unrolling and optimization experiments.

---

## 3. Unifying DType Handling and Python Bindings (commit e58f67f & b2e2504)

**Commits:**

- `e58f67f - Refactor Buffer and dtype usage for consistent argument order`
- `b2e2504 - Remove pybind11 submodule and update Buffer and Tensor classes`

- Streamlined `grad/dtype.py` to centralize all numeric types.
- Updated `Buffer` constructor signatures for consistent dtype ordering.
- Removed outdated pybind11 submodule in favor of a top-level `kernels/` CMake integration.
- Cleaned Python API in `grad/buffer.py` and `grad/tensor.py` for ergonomic use.

**Takeaway:** Consistency in APIs prevents confusion when expanding operations.

---

## 4. Broadcasting & Binary Kernels (commit 6e7639d)

**Commit:** `6e7639d - Add broadcast binary kernel and tests`

- Implemented generic binary kernel supporting element-wise operations with broadcasting.
- Added comprehensive tests for shape mismatches and broadcasting semantics.
- Wrote `operations.binary_op` to dispatch to the C++ kernel for `ADD`, `SUB`, `MUL`, `DIV`.

**Benchmark baseline:** ~0.00925 s for adding two float32 buffers of 1M elements.

---

## 5. Ensuring Correct Casting & Half-Precision (commits 52175c3, faa0336)

**Commits:**

- `52175c3 - Add tests for VecBuffer cast method covering all type conversions`
- `faa0336 - Fix half precision build and implement buffer add`

- Expanded `VecBuffer::cast<T>()` to support all integer and floating dtypes.
- Enabled IEEE‐754 half-precision (`float16`) conversion through `half.hpp`.
- Added unit tests for every `cast()` path ensuring no data corruption.

**Challenge:** Maintaining precision guarantees across scalar and vectorized code.

---

## 6. SIMD Kernel Compliance and Test Consolidation (commits 812cc29 & b6fb698)

**Commits:**

- `812cc29 - Refactor SIMD kernels for IEEE 754 compliance and add tests`
- `b6fb698 - Refactor and unify binary operation tests`

- Tweaked unaligned SIMD loops to handle tail elements safely.
- Ensured rounding behavior matches NumPy/PyTorch for float32 and float64.
- Unified all binary operation tests into `tests/ops_test.py` for maintainability.

---

## 7. Unified Build Scripts & Documentation (commit 4618fc3)

**Commit:** `4618fc3 - Add unified build scripts, docs, and Makefile for C++ kernel`

- Created a top‐level `Makefile` with targets: `setup-env`, `build`, `test`, `clean`.
- Updated `README.md` to clarify build steps, prerequisites, and example usage.
- Ensured reproducible build across Linux, macOS, and Windows (via CMake).

---

## 8. Alignment, Misalignment, and Edge-case Tests (commits 1f5f122, 1c438db, b8b70f9, 2dd9c7b)

**Key Commits:**

- `1f5f122 - Add integer variants and misalignment tests`
- `1c438db - Add alignment utility tests`
- `b8b70f9 - Add Buffer member tests and implement set_item`
- `2dd9c7b - Consolidate buffer and alignment tests into test_cpu_kernel.cpp`

- Verified buffer pointer alignment in unit tests for offsets [0..31].
- Tested integer kernels (int8, uint16, int64, etc.) for correctness under misalignment.
- Added `Buffer.get_item()` / `set_item()` bindings and their tests.
- Consolidated low-level buffer tests for clarity.

---

## 9. High-level API Refinements (commits 731f175, d998e44, 763a60c)

**Commits:**

- `731f175 - Refactor binary ops to use generic kernel and update tests`
- `d998e44 - Update README and add basic operations example script`
- `763a60c - Add Buffer::_filled method for creating filled buffers`

- Simplified `operations.binary_op` dispatch to a single generic kernel call.
- Added user‐friendly Python example in `examples/basic_operations.py`.
- Exposed `Tensor.full()`, `Tensor.ones()`, `Tensor.zeros()` via underlying `Buffer._filled`.

---

## 10. New Operations: Power, Negation, and Expand (commits 75afcff, e517dca, 3bb7b82)

**Commits:**

- `75afcff - Refactor: Consolidate power and negation tests into test_operations.cpp`
- `e517dca - Implement power and negation ops, add tests, and fix dtype name`
- `3bb7b82 - Refactor elementwise ops and add Tensor.expand method`

- Added unary operations `neg()` and elementwise power `pow()`.
- Plugged new ops into the autograd system with forward/backward implementations.
- Introduced `Tensor.expand()` to support broadcasted views without data copy.

**Learning:** Handling autograd with shape-altering operations exposed subtle context-saving challenges.

---

## 11. Performance Leap: Unrolled SIMD Kernel (commit 970d72d)

**Commit:** `970d72d - Optimize binary kernels with unrolled SIMD loop`

- Consolidated aligned & unaligned loops into a single templated function.
- Unrolled the core loop to process four elements per iteration, reducing branch overhead.
- Realigned pointer arithmetic to maintain throughput on misaligned tails.

**Benchmark comparison:**

- Before: 0.00925 s per 1M-element addition
- After: 0.00778 s per 1M-element addition
  → **15% speedup**

This dramatic boost affirmed the value of careful loop unrolling and inlining in performance-critical code.

---

## 12. Final Cleanup & Documentation (commits c2234fd & c94181c)

**Commits:**

- `c2234fd - Update README to document power and negation operations`
- `c94181c - Remove binary kernel benchmark and related files`

- Updated project README with full API reference for new ops.
- Removed legacy benchmark scripts now superseded by tighter integration tests.

---

# Conclusion & Future Directions

This chronological journey demonstrates the value of incremental improvements: building a robust C++ buffer, layering Python APIs, fortifying with tests, and finally squeezing out performance gains.

Next on the roadmap:

- Matrix multiplication kernels (BLAS/CUDA)
- Advanced autograd optimizations and graph pruning
- Neural network layers, activation functions, and optimizers
- GPU acceleration and multi‐device support

micrograd is now a solid foundation for experimenting with deep learning internals. May this detailed history inspire you to carve your own learning path; one commit at a time!
