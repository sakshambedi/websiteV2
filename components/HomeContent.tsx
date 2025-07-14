import React from "react";

export default function HomeContent() {
  return (
    <div className="item-center w-full pt-4 text-gray-700 dark:text-gray-200 ">
      <p className="text-base font-mono mt-2 phone:mt-1 phone:text-sm ">
        Hi!👋🏼
      </p>
      <p className="text-base font-mono pt-4 phone:text-sm phone:pt-4">
        I am Saksham Bedi, an AI/ML Developer and Computer Science student at
        the University of Manitoba specializing in deep learning architectures
        and data-driven solutions. I thrive in collaborative environments,
        bridging technical implementation with strategic planning, and have
        experience building HIPAA/PIPEDA-compliant systems for healthcare
        clients. Beyond coding, I'm passionate about translating complex
        mathematical concepts into practical solutions that drive real business
        impact, bringing a unique perspective through my Economics and
        Mathematics background. Other than that, I love to play squash, golf,
        chess and watch F1 in my free time.
      </p>

      {/* <div className="pt-10">
        <h1 className="font-rebondG text-3xl md:pt-2 md:text-xl phone:pt-3 phone:text-xl text-black dark:text-white">
          {" "}
          Research
        </h1>
        <ul className="font-mono text-base phone:text-sm pt-2 list-disc list-outside pl-5 space-y-1.5 ">
          <li>
            <span className="font-bold">3D Point Cloud Diffusion Model:</span>{" "}
            Lead researcher on an autoencoder-based diffusion model for infected
            wheat plant point clouds, reducing data collection time from 90 days
            to minutes with an Earth Mover&apos;s Distance of &#8776;0.003 and
            Chamfer distance of &#8776;0.005.
          </li>
        </ul>
      </div> */}

      <div className="pt-10">
        <h1 className="font-rebondG text-3xl md:pt-2 md:text-2xl phone:pt-3 phone:text-xl text-black dark:text-white">
          Skills
        </h1>
        <span className="font-mono text-base phone:text-sm">
          <p className="pt-2 md:pt-1.5  phone:pt-1.5">
            <span className="font-bold text-black dark:text-white">
              Programming Languages:{" "}
            </span>
            Python, C++
          </p>
          <p className="pt-1 md:pt-1.5 phone:pt-1.5">
            <span className="font-bold text-black dark:text-white">
              Frameworks & Libraries:{" "}
            </span>
            Flask, FastAPI, PyTorch, NumPy
          </p>
          <p className="pt-1 md:pt-1.5 phone:pt-1.5">
            <span className="font-bold text-black dark:text-white">
              Database & ORM:{" "}
            </span>
            SQL, Microsoft Fabric
          </p>
          <p className="pt-1 md:pt-1.5 phone:pt-1.5">
            <span className="font-bold text-black dark:text-white">
              Testing & CI:{" "}
            </span>
            Pytest, GitHub Actions, Dynatrace
          </p>
          <p className="pt-1 md:pt-1.5 phone:pt-1.5">
            <span className="font-bold text-black dark:text-white">
              Cloud & DevOps:{" "}
            </span>
            AWS (EC2, S3, CloudFront), Azure, Docker
          </p>
          <p className="pt-1 md:pt-1.5 phone:pt-1.5">
            <span className="font-bold text-black dark:text-white">
              Regulatory Compliance:{" "}
            </span>
            HIPAA, PIPEDA, PHI-aware system design, secure REST APIs
          </p>
        </span>
      </div>

      <div className="pt-10">
        <h1 className="font-rebondG text-3xl md:pt-2 md:text-xl phone:pt-3 phone:text-xl text-black dark:text-white">
          Work Experience
        </h1>
        <div className="pt-2">
          <h2 className="text-xl font-rebondG font-semibold text-gray-900 dark:text-white">
            Software Developer &amp; Project Coordinator
          </h2>
          <div className="flex justify-between items-center mb-2">
            <p className="text-base font-mono text-gray-700 dark:text-gray-200">
              Daemon Defense Systems, Winnipeg, MB
            </p>
            <time className="text-base font-mono text-gray-700 dark:text-gray-200">
              Sep 2022 – Jan 2025
            </time>
          </div>
          {/* <p className="text-base font-mono text-gray-700 dark:text-gray-200 mb-2"> | Sep 2022 – Jan 2025</p> */}
          <ul className="list-disc list-outside pl-5 space-y-1.5 text-base text-gray-600 dark:text-gray-200 font-mono">
            <li>
              Led client-facing technical consultations for device procurement
              and infrastructure deployment, aligning stakeholder requirements
              with scalable, compliant system architectures.
            </li>
            <li>
              Collaborated with cross-functional teams and clients to design and
              deploy data-driven solutions for real-world business processes.
            </li>
            <li>
              Supported go-to-market deployment strategy of RIS-PACS across 80+
              imaging sites, ensuring zero downtime and streamlined access to
              1.2M+ clinical records annually.
            </li>
            <li>
              Implemented Azure Dynatrace observability stack to monitor
              mission-critical services, preventing election outages by
              resolving high-impact issues.
            </li>
          </ul>
        </div>
        <div className="pt-6">
          <h2 className="text-xl font-rebondG font-semibold text-gray-900 dark:text-white">
            Software Developer Intern
          </h2>
          <div className="flex justify-between items-center mb-2">
            <p className="text-base font-mono text-gray-700 dark:text-gray-200">
              InfoMagnetics Technologies, Winnipeg, MB
            </p>
            <time className="text-base font-mono text-gray-700 dark:text-gray-200">
              May 2022 – Sep 2022
            </time>
          </div>
          <ul className="list-disc font-mono list-outside pl-5 space-y-1.5 text-base text-gray-600 dark:text-gray-200">
            <li>
              Integrated Loqate API integration for address normalization within
              IBM MDM, ensuring secure, PIPEDA-compliant data workflows for
              healthcare clients.
            </li>
            <li>
              Spearheaded JIRA implementation to streamline Agile workflows,
              increasing team efficiency by 20%.
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-10">
        <h1 className="font-rebondG text-3xl md:pt-2 md:text-xl phone:pt-3 phone:text-xl text-black dark:text-white">
          Education
        </h1>
        <div className="flex flex-row justify-between font-mono text-lg pt-2  phone:text-sm phone:pt-1.5">
          <h3 className="text-left">B.Sc. in Computer Science, </h3>
          <h3 className="text-right">2020 - 2025</h3>
        </div>
        <p className=" font-mono text-base  phone:text-sm md:pt-0">
          University of Manitoba
        </p>
      </div>
    </div>
  );
}
