import React from "react";

import TechStackIcon from "./TechStackIcon";
export default function ProjectContent() {
  return (
    <section className="text-gray-700 dark:text-gray-300">
      <div className="pt-0">
        <h2 className="font-rebondG text-fluid-3xl md:pt-2 phone:pt-3 text-black dark:text-white">
          Research
        </h2>

        <div className="project-info">
          <div className="flex flex-row justify-between font-mono pt-2 space-x-5 phone:space-x-3 phone:pt-1.5 md:pt-2 md:space-x-3">
            <h3 className="text-fluid-xl font-rebondG pt-2 md:pt-2 phone:pt-1 text-black dark:text-white">
              3D Point Cloud Diffusion Model
            </h3>
            <p className="text-fluid-base text-right text-gray-800 dark:text-gray-200">
              University of Manitoba
            </p>
          </div>
          <ul className="font-mono text-fluid-base pt-1 md:pt-1 phone:pt-1.5 list-disc list-outside pl-5 space-y-1.5">
            <li>
              Preprocessed raw .ply point cloud data by cleaning noise and
              normalizing coordinates for model training.
            </li>
            <li>
              Developed and trained an autoencoder-driven diffusion model to
              generate high-fidelity synthetic 3D point clouds.
            </li>
            <li>
              Slashed data collection time from 90–120 days to minutes,
              significantly reducing costs for agricultural research.
            </li>
          </ul>
          <div className="flex flex-row flex-wrap pt-5 phone:pt-4 justify-start space-x-9 phone:gap-7 box-border w-full md:gap-9">
            <TechStackIcon
              src="/icons/techstack/python.svg"
              alt="Python"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
            <TechStackIcon
              src="/icons/techstack/pytorch.svg"
              alt="PyTorch"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
          </div>
        </div>

        <h2 className="font-rebondG text-fluid-3xl md:pt-2 phone:pt-3 text-black dark:text-white pt-10">
          Projects
        </h2>

        <div className="project-info">
          <div className="flex flex-row justify-between font-mono pt-2 space-x-5 phone:space-x-3 phone:pt-1.5 md:pt-2 md:space-x-3">
            <h3 className="text-fluid-xl font-rebondG pt-2 md:pt-2 phone:pt-1 text-black dark:text-white">
              Image Classification Web App
            </h3>
            <p className="text-fluid-base text-right text-gray-800 dark:text-gray-200">
              Summer 2024
            </p>
          </div>
          <ul className="font-mono text-fluid-base pt-1 md:pt-1 phone:pt-1.5 list-disc list-outside pl-5 space-y-1.5">
            <li>
              Built a scalable ML pipeline using PyTorch and FastAPI, exposing a
              RESTful API for real-time image classification.
            </li>
            <li>
              Designed a responsive React frontend with a focus on intuitive
              UI/UX.
            </li>
            <li>
              Deployed on AWS EC2 with Docker, integrating S3 and CloudFront for
              asset delivery.
            </li>
            <li>
              Improved platform reliability and team velocity through clear API
              contracts and modular architecture.
            </li>
          </ul>
          <div className="flex flex-row flex-wrap pt-5 phone:pt-4 justify-start space-x-9 phone:gap-7 box-border w-full md:gap-9">
            <TechStackIcon
              src="/icons/techstack/amazonecs.svg"
              width={32}
              height={32}
              alt="Amazon ECS"
              className="w-8 h-8 phone:w-7 phone:h-7 md:w-7 md:h-7 dark:invert"
              priority
            />
            <TechStackIcon
              src="/icons/techstack/amazons3.svg"
              alt="AWS S3"
              className="w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9 dark:invert "
            />
            <TechStackIcon
              src="/icons/techstack/docker.svg"
              alt="Docker"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
            <TechStackIcon
              src="/icons/techstack/githubactions.svg"
              alt="Github Actions"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
            <TechStackIcon
              src="/icons/techstack/python.svg"
              alt="Python"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
            <TechStackIcon
              src="/icons/techstack/pytorch.svg"
              alt="PyTorch"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
            <TechStackIcon
              src="/icons/techstack/react.svg"
              alt="React"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
            <TechStackIcon
              src="/icons/techstack/FastAPI.svg"
              alt="FastAPI"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
          </div>
        </div>

        <div className="pt-10">
          <div className="flex flex-row justify-between font-mono text-fluid-lg pt-2 space-x-9 phone:space-x-3 phone:pt-1.5 md:pt-2 md:space-x-3">
            <h3 className="text-fluid-xl font-rebondG pt-2 md:pt-2 phone:pt-1 text-black dark:text-white">
              MicroGrad – Deep Learning Framework
            </h3>
            <h3 className="text-fluid-base text-right">
              Summer 2025
            </h3>
          </div>
          <ul className="font-mono text-fluid-base pt-1 md:pt-1 phone:pt-1.5 list-disc list-outside pl-5 space-y-1.5">
            <li>
              Designed and implemented a deep learning framework with a
              handwritten autograd engine and optimized CPU tensor kernels using
              Eigen.
            </li>
            <li>
              Built for extensible ML/AI workflows with a focus on computational
              efficiency.
            </li>
            <li>
              Architecture enables future support for CUDA, Metal, and OpenGL
              backends for GPU acceleration.
            </li>
            <li>
              Emphasized performance-critical operations, cross-platform
              compatibility, and modular infrastructure for rapid model
              prototyping.
            </li>
            <li>
              Developed and maintained integration/unit tests using Pytest.
            </li>
          </ul>
          <div className="flex flex-row pt-5 phone:pt-4 justify-start gap-10 phone:gap-7 md:gap-9">
            <TechStackIcon
              src="/icons/techstack/python.svg"
              alt="Python"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
            {/* <TechStackIcon
              src="/icons/techstack/pytorch.svg"
              alt="PyTorch"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            /> */}
            <TechStackIcon
              src="/icons/techstack/pytest.svg"
              alt="Pytest"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
            <TechStackIcon
              src="/icons/techstack/cpp.svg"
              alt="C++"
              className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
