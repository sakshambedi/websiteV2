---
title: "pygrad: A Chronological Deep Dive into Design, Development, and Performance"
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

# Building pygrad: A Personal Journey into the Guts of Deep Learning

_How I went from "let me understand how PyTorch works" to writing SIMD kernels at 2 AM_

## The Beginning: May 2025

It started, as many of my projects do, with a simple question: _"How does automatic differentiation actually work?"_

I'd been using PyTorch for a while, calling `.backward()` like it was magic, trusting that gradients would flow through my neural networks. But I never really understood what was happening under the hood. So I did what any reasonable engineer would do - I decided to build my own tensor library from scratch.

The first commit was titled `tinygrad start`. Looking back at that now, it makes me smile. I had no idea what I was getting myself into.

## Phase 1: The Naive Python Days

My initial approach was pure Python. I figured if I could just get the math right, everything else would follow. The early commits tell the story:

```
7ed2e00 Remove numpy underlying framework and implementing features form the core
2f6f9a5 added bool dtype support for tensor and added tests for the tensors
be5e4f5 using a more low level approach with support for some binary ops
```

I remember spending an entire weekend just getting tensor indexing to work correctly. Negative indices, multi-dimensional slicing, the edge cases kept multiplying. Every time I thought I was done, I'd discover another scenario where PyTorch handled something elegantly that my code butchered.

The first real "aha" moment came when I implemented strides. Before that, my tensors were just flat arrays with a shape tuple bolted on. Understanding that `view()` doesn't copy data - it just changes how you interpret the memory layout - that was when things started clicking.

```
02998c7 implement pytorch like stride function function
ba81289 added support for contigous buffers for cheap views
b711ce0 added transpose feature
```

I'll be honest: I got the stride calculation wrong three times before it worked. The commit message "fixed return statement issue in the stride function" doesn't capture the four hours of debugging that preceded it.

## Phase 2: The BufferPool Experiment

Once basic operations worked, I hit my first performance wall. Creating new arrays for every operation was killing me. So I did what the PyTorch source code suggested: implement a memory pool.

```
09c743d Add thread-safe buffer pooling for memory reuse
289e5dc Enhance BufferPool with dynamic memory management
```

I went way overboard. Power-of-2 size bucketing. Memory pressure detection. Automatic garbage collection. Configurable limits. I was so proud of this code.

It was also completely unnecessary for an educational project.

But here's the thing - building it taught me _why_ frameworks like PyTorch have memory allocators. When you're training a neural network and you're allocating and deallocating millions of tensors, every microsecond matters. I didn't need that level of optimization, but understanding why it exists changed how I think about systems programming.

## Phase 3: The Autograd Revelation

Getting the forward pass working was one thing. Implementing backward propagation was when this project went from "toy" to "actually understanding deep learning."

```
a9866f1 adding building blocks for computation graph
6ddf999 Implement Neg operation and improve test coverage
```

The computation graph concept is beautiful once you see it. Every operation creates a node. Each node knows its parents and the function that created it. When you call `backward()`, you're just traversing this graph in reverse, applying the chain rule at each step.

I spent a lot of time staring at my whiteboard, drawing little boxes with arrows between them. For addition: if `L = a + b`, then `dL/da = 1` and `dL/db = 1`, so you just pass the gradient through unchanged. For multiplication: `L = a * b` means `dL/da = b` and `dL/db = a`. You need to save the inputs during the forward pass to use them in backward.

The `ctx.save_for_backward(a, b)` pattern that PyTorch uses suddenly made perfect sense.

## Phase 4: The C++ Pivot

And then came the moment that changed everything.

I profiled my code and discovered , to my suprise, that element-wise operations were slower. Python loops over large arrays just can't compete with compiled code. I had two choices: use NumPy as a backend (which felt like cheating) or write my own C++ kernels.

I chose violence.

```
f12b28b Replace Python buffer with pybind11 C++ eigen lib backend
1aa73d5 Add C++ kernel library with pybind11 and test setup
```

Learning pybind11 was its own adventure. The template metaprogramming required to make Python and C++ play nice is... something. But once I got the bindings working, the speedup was immediate and dramatic.

The `VecBuffer` class became the heart of the project - a type-erased container that could hold int8, float16, float32, or any other numeric type, while still exposing a consistent interface to Python.

## Phase 5: SIMD and the Performance Rabbit Hole

Once I had C++ working, I couldn't stop optimizing.

```
5f0585e Add SIMD vector buffer and CPU kernel
970d72d Optimize binary kernels with unrolled SIMD loop
812cc29 Refactor SIMD kernels for IEEE 754 compliance and add tests
```

SIMD (Single Instruction, Multiple Data) lets you operate on multiple values simultaneously. Instead of adding two numbers, you add eight (or sixteen, depending on your CPU). The xsimd library made this almost pleasant—it abstracts over AVX2, NEON, and other instruction sets so your code stays portable.

I learned hard lessons about memory alignment. SIMD instructions expect data at specific boundaries. Access misaligned memory and you either crash or suffer a massive performance penalty. The commit "Refactor SIMD kernels for IEEE 754 compliance" represents a particularly painful debugging session where I discovered that `-ffast-math` breaks floating-point edge cases in ways that make your tests pass but your math wrong.

Loop unrolling was another revelation:

```cpp
// Instead of:
for (int i = 0; i < n; i++) {
    c[i] = a[i] + b[i];
}

// You do:
for (int i = 0; i < n; i += 4) {
    c[i]   = a[i]   + b[i];
    c[i+1] = a[i+1] + b[i+1];
    c[i+2] = a[i+2] + b[i+2];
    c[i+3] = a[i+3] + b[i+3];
}
```

The CPU can execute these independent operations in parallel. Combined with SIMD, you're suddenly operating on 32 floats at once instead of 1. It's intoxicating when the benchmarks come back faster.

## Phase 6: The Infrastructure Debt

Somewhere around commit 50, I realized my project had become unmaintainable. The build system was a mess of shell scripts. Tests were scattered randomly. Half the code was Python, half was C++, and they were coupled in ways that made changes terrifying.

```
4618fc3 Add unified build scripts, docs, and Makefile for C++ kernel
ff453bb Add Dockerfile and update README with build instructions
4ac4835 Refactor kernel and build system for modular SIMD support
```

I spent two weeks just cleaning up. Adding proper CMake configuration. Writing a Makefile that actually made sense. Creating a Dockerfile so anyone could build the project without installing fifteen dependencies manually.

It wasn't glamorous work, but it was necessary. And honestly? Deleting old code felt almost as good as writing new features.

## The Current State: January 2026

Today, pygrad has:

- A proper tensor class with views, strides, and contiguity tracking
- Support for 11 different data types (int8 through float64)
- SIMD-optimized kernels for all binary operations
- A working autograd system (forward pass complete, backward mostly there)
- 500+ tests ensuring I don't break things
- Build support for macOS, Linux, and Windows

What it doesn't have:

- Broadcasting (the bane of my existence - it's next on the list)
- Matrix multiplication (requires different optimization strategies)
- GPU support (CUDA is a whole other world)
- Neural network layers

## What I Actually Learned

Building pygrad taught me more about deep learning than any course or paper could have.

**Tensors are just views into memory.** Shape, stride, offset—these determine how you interpret raw bytes. Most "operations" don't copy data; they just change the interpretation.

**Autograd is graph traversal with calculus.** The forward pass builds the graph. The backward pass walks it in reverse. The chain rule connects everything.

**Performance comes from understanding hardware.** Cache lines, memory alignment, SIMD registers, branch prediction—the CPU has opinions about how you should write code, and ignoring them is expensive.

**Type systems matter.** The amount of code dedicated to handling dtype conversions, upcasting, and type-safe operations is massive. Getting this wrong causes subtle bugs that only appear with specific inputs.

**Good infrastructure enables velocity.** The weeks I spent on build systems and testing paid off tenfold. Every refactor became safer. Every PR could be validated automatically.

## What's Next

The roadmap is long. Broadcasting support is the immediate priority - it's embarrassing that you can't add a scalar to a tensor without jumping through hoops. After that, matrix multiplication, which requires entirely different optimization strategies (tiling, blocking, maybe calling into BLAS).

Eventually, I want to train a simple neural network end-to-end on this framework. A two-layer MLP on MNIST. Nothing groundbreaking, but proof that all the pieces work together.

And GPU support? Maybe someday. CUDA is a commitment, and Metal (for Apple Silicon) is a whole different API. But the architecture is ready for it—the `device` attribute exists for a reason.

## To Anyone Starting Something Similar

If you're thinking about building your own tensor library, here's my advice:

1. **Start with pure Python.** Get the semantics right before optimizing. You'll rewrite everything anyway.

2. **Test against NumPy/PyTorch.** They're the ground truth. If your results differ, you're wrong.

3. **Read the source.** PyTorch and tinygrad are open source. When you're stuck, the answers are there.

4. **Embrace the rabbit holes.** You'll end up learning about CPU architecture, compiler optimizations, and numerical analysis. That's the point.

5. **It will take longer than you think.** My "quick weekend project" turned into an 8-month journey with over 130 commits. And it's still not done.

But it's worth it. Every time I use PyTorch now, I understand what's happening beneath the surface. And that understanding? It's worth every frustrating debug session and late-night refactor.

_pygrad is open source at [github.com/sakshambedi/pygrad](https://github.com/sakshambedi/pygrad). Contributions welcome - especially if you want to help me finally implement broadcasting._

Human written by Saksham Bedi and robotically fixed by Claude Code, January 2026
