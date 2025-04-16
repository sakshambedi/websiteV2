import React from 'react';

export default function HomeContent() {
    return (
        <div className="item-center w-full pt-4 text-gray-700 dark:text-gray-200 ">
            <p className="text-base font-mono mt-2 phone:mt-1 phone:text-sm ">Hi!👋🏼</p>
            <p className="text-base font-mono pt-4 phone:text-sm phone:pt-4">I am Saksham Bedi, a driven 5th-year Computer Science student at the University of Manitoba specializing in AI & Deep Learning with an Economics and Math minor. I am the lead researcher on a 3D point cloud diffusion model that cuts agricultural data collection from 90 days to minutes, and I built an image classification web app deployed on AWS with React, FastAPI, and Docker.</p>

            <div className="pt-10">
                <h1 className="font-rebondG text-3xl md:pt-2 md:text-xl phone:pt-3 phone:text-xl text-black dark:text-white"> Research</h1>
                <ul className="font-mono text-base phone:text-sm pt-1 list-disc list-outside pl-5 space-y-1.5">
                    <li>
                        <span className="font-bold">3D Point Cloud Diffusion Model:</span> Lead researcher on an autoencoder-based diffusion model for infected wheat plant point clouds, reducing data collection time from 90 days to minutes with an Earth Mover&apos;s Distance of &#8776;0.003 and Chamfer distance of &#8776;0.005.
                    </li>
                </ul>
            </div>
            
            <div className="pt-10">
                <h1 className="font-rebondG text-3xl md:pt-2 md:text-2xl phone:pt-3 phone:text-xl text-black dark:text-white">Skills</h1>
                <span className="font-mono text-base phone:text-sm">
                    <p className="pt-1 md:pt-1.5  phone:pt-1.5"><span className="font-bold text-black dark:text-white">AI & ML Skills: </span>Deep Learning Architectures (CNNs, RNNs), Generative Models (AutoEncoders, GAN), Computer Vision, Transfer Learning, Hyperparameter Optimization</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5"><span className="font-bold text-black dark:text-white">Languages: </span>Python, Java, JavaScript, C++, C, R</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5"><span className="font-bold text-black dark:text-white">Frameworks: </span>PyTorch, NumPy, Matplotlib, Pandas, FastAPI, TensorFlow + Keras</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5"><span className="font-bold text-black dark:text-white">Cloud & DevOps: </span>AWS (CloudFront, EC2, Lambda, S3, Amplify), Azure, CI/CD (GitHub Actions), Dynatrace, Docker, Nginx, REST API</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5"><span className="font-bold text-black dark:text-white">Database: </span>SQL, MongoDB, Neo4j</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5"><span className="font-bold text-black dark:text-white">Tools: </span>TensorBoard, Git, GitHub/GitLab, Figma, JIRA, Pytest, Hugging Face, Linux</p>
                </span>
            </div>

            <div className="pt-10">
              <h1 className="font-rebondG text-3xl md:pt-2 md:text-xl phone:pt-3 phone:text-xl text-black dark:text-white">Work Experience</h1>
              <div className="pt-6">
                <h2 className="text-xl font-rebondG font-semibold text-gray-900 dark:text-white">Software Developer &amp; Project Manager</h2>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-base font-mono text-gray-700 dark:text-gray-200">Daemon Defense Systems, Winnipeg, MB</p>
                  <time className="text-base font-mono text-gray-700 dark:text-gray-200">Sep 2022 – Jan 2025</time>
                </div>
                {/* <p className="text-base font-mono text-gray-700 dark:text-gray-200 mb-2"> | Sep 2022 – Jan 2025</p> */}
                <ul className="list-disc list-outside pl-5 space-y-1.5 text-base text-gray-600 dark:text-gray-200 font-mono">
                  <li>Built a reliable pipeline using Microsoft Fabric and a BI dashboard for 20 project managers, replacing error-prone Excel sheets and cutting data handling time by 15% while reducing errors by 8%.</li>
                  <li>Planned and coordinated RIS‑PACS upgrades across Manitoba, collaborating with clinical engineering teams and integrators to ensure seamless integration with existing infrastructure.</li>
                  <li>Architected and deployed an Azure-integrated monitoring solution with Dynatrace, identifying 12 critical vulnerabilities responsible for a province-wide outage in 2023.</li>
                  <li>Streamlined device procurement processes, achieving 100% on-time delivery through strategic planning and cross-functional coordination.</li>
                </ul>
              </div>
              <div className="pt-6">
                <h2 className="text-xl font-rebondG font-semibold text-gray-900 dark:text-white">Software Developer Intern</h2>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-base font-mono text-gray-700 dark:text-gray-200">InfoMagnetics Technologies, Winnipeg, MB</p>
                  <time className="text-base font-mono text-gray-700 dark:text-gray-200">May 2022 – Sep 2022</time>
                </div>
                <ul className="list-disc font-mono list-outside pl-5 space-y-1.5 text-base text-gray-600 dark:text-gray-200">
                  <li>Integrated Loqate REST API with IBM Master Data Management System, reducing keystrokes by 50% and improving data accuracy.</li>
                  <li>Spearheaded JIRA implementation to streamline Agile workflows, boosting team efficiency by 20%.</li>
                </ul>
              </div>
            </div>

            <div className="pt-10">
                <h1 className="font-rebondG text-3xl md:pt-2 md:text-xl phone:pt-3 phone:text-xl text-black dark:text-white">Education</h1>
                <div className="flex flex-row justify-between font-mono text-lg pt-2  phone:text-sm phone:pt-1.5">
                    <h3 className='text-left'>B.Sc. in Computer Science, </h3>
                    <h3 className='text-right'>2020 - 2025</h3>
                </div>
                <p className=" font-mono text-base  phone:text-sm md:pt-0">University of Manitoba</p>
            </div>

        </div >

    );
}