import React from "react";

export default function HomeContent() {
  return (
    <div className="item-center w-full pt-6 text-gray-700 dark:text-gray-200 space-y-8">
      <div>
        <p className="text-fluid-base font-mono mt-2 phone:mt-1">
          Hi!👋🏼
        </p>
        <p className="text-fluid-base font-mono mt-2 pt-1 phone:pt-2">
          I'm Saksham Bedi, an AI software engineer at Murray Chevrolet and
          Computer Science student at the University of Manitoba. I build
          production-ready ML systems that stay compliant, deliver clear
          business results, and keep teams aligned; outside work you'll find me
          playing squash, golf, chess, or catching F1.
        </p>
      </div>

      <div className="pt-10">
        <h1 className="font-rebondG text-fluid-3xl md:pt-2 phone:pt-3 text-black dark:text-white">
          Skills
        </h1>
        <span className="font-mono text-fluid-base">
          <p className="pt-2 md:pt-1.5 phone:pt-1.5">
            <span className="font-bold text-black dark:text-white">
              AI &amp; Python:{" "}
            </span>
            LangChain, PyTorch, FastAPI, vector databases
          </p>
          <p className="pt-1 md:pt-1.5 phone:pt-1.5">
            <span className="font-bold text-black dark:text-white">
              Data &amp; Platforms:{" "}
            </span>
            Supabase, SQL, Microsoft Fabric, NumPy
          </p>
          <p className="pt-1 md:pt-1.5 phone:pt-1.5">
            <span className="font-bold text-black dark:text-white">
              Ops &amp; Tooling:{" "}
            </span>
            AWS (EC2, S3, CloudFront), Docker, GitHub Actions, Dynatrace
          </p>
        </span>
      </div>

      <div className="pt-10">
        <h1 className="font-rebondG text-fluid-3xl md:pt-2 phone:pt-3 text-black dark:text-white">
          Work Experience
        </h1>
        <div className="pt-2">
          <h2 className="text-fluid-xl font-rebondG font-semibold text-gray-900 dark:text-white">
            AI Software Engineer
          </h2>
          <div className="flex justify-between items-center mb-2">
            <p className="text-fluid-base font-mono text-gray-700 dark:text-gray-200">
              Murray Chevrolet, Winnipeg, MB
            </p>
            <time className="text-fluid-base font-mono text-gray-700 dark:text-gray-200">
              Jan 2025 – Present
            </time>
          </div>
          <ul className="list-disc list-outside pl-5 space-y-1.5 text-fluid-base text-gray-600 dark:text-gray-200 font-mono">
            <li>
              Deliver dealership AI copilots and predictive analytics that
              streamline sales and service decisions.
            </li>
            <li>
              Partner with sales, marketing, and data teams to roll out ML tools
              and mentor co-ops on responsible AI use.
            </li>
          </ul>
        </div>
        <div className="pt-6">
          <h2 className="text-fluid-xl font-rebondG font-semibold text-gray-900 dark:text-white">
            Software Developer &amp; Project Coordinator
          </h2>
          <div className="flex justify-between items-center mb-2">
            <p className="text-fluid-base font-mono text-gray-700 dark:text-gray-200">
              Daemon Defense Systems, Winnipeg, MB
            </p>
            <time className="text-fluid-base font-mono text-gray-700 dark:text-gray-200">
              Sep 2022 – Jan 2025
            </time>
          </div>
          <ul className="list-disc list-outside pl-5 space-y-1.5 text-fluid-base text-gray-600 dark:text-gray-200 font-mono">
            <li>
              Led client workshops to launch HIPAA-compliant RIS-PACS across 80+
              sites with zero disruption.
            </li>
            <li>
              Coordinated engineers and vendors to deploy Azure and Dynatrace
              observability and resolve issues fast.
            </li>
          </ul>
        </div>
        <div className="pt-6">
          <h2 className="text-fluid-xl font-rebondG font-semibold text-gray-900 dark:text-white">
            Software Developer Intern
          </h2>
          <div className="flex justify-between items-center mb-2">
            <p className="text-fluid-base font-mono text-gray-700 dark:text-gray-200">
              InfoMagnetics Technologies, Winnipeg, MB
            </p>
            <time className="text-fluid-base font-mono text-gray-700 dark:text-gray-200">
              May 2022 – Sep 2022
            </time>
          </div>
          <ul className="list-disc font-mono list-outside pl-5 space-y-1.5 text-fluid-base text-gray-600 dark:text-gray-200">
            <li>
              Integrated Loqate API with IBM MDM to deliver secure, normalized
              healthcare data flows.
            </li>
            <li>
              Championed Jira adoption and agile cadences, lifting team
              throughput by 20% and improving communication.
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-10">
        <h1 className="font-rebondG text-fluid-3xl md:pt-2 phone:pt-3 text-black dark:text-white">
          Education
        </h1>
        <div className="flex flex-row justify-between font-mono text-fluid-lg pt-2 phone:pt-1.5">
          <h3 className="text-left">B.Sc. in Computer Science, </h3>
          <h3 className="text-right">2020 - 2025</h3>
        </div>
        <p className="font-mono text-fluid-base md:pt-0">
          University of Manitoba
        </p>
      </div>
    </div>
  );
}
