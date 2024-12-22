import React from 'react';


export default function HomeContent() {
    return (
        <div className="item-center w-full pt-4 text-gray-700 dark:text-gray-300 ">
            <p className="text-base font-mono mt-2 phone:mt-1 phone:text-sm ">Hi!👋🏼</p>
            <p className="text-base font-mono  pt-4 phone:text-sm phone:pt-4">My name is Saksham Bedi. I am a 5th year student at the University of Manitoba. I am a specializing in AI and Deep Learning with Economics Minor. I currently work at Daemon Defense Systems as a Technical Analyst.  In my free time, I like to learn new skills and explore new restaurants, read, play squash and table tennis, workout. Currently learning film photography.</p>


            <div className="pt-10">
                <h1 className="font-rebondG text-3xl md:pt-2 md:text-2xl phone:pt-3 phone:text-xl text-black dark:text-white">Skills</h1>
                <span className="font-mono text-base  phone:text-sm">
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5"><span className="font-bold">Languages : </span>Python, Java, SQL, JavaScript, Swift, Bash, C/C++, TypeScript</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5"><span className="font-bold">Frameworks: </span>SwiftUI, React.js, PyTorch, Tensorflow + Keras, Matplotlib, Pandas, FastAPI</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5"><span className="font-bold">Cloud & DevOps : </span>AWS(CloudFront, EC2, Lambda, S3, Amplify), Azure, CI/CD(Github Actions), Dynatrace, Docker,
                        Nginx, REST API</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5"><span className="font-bold">Tools:</span> git, GitHub/GitLab, Node.js, Figma, JIRA, Android Studio, Xcode, JUnit, Pytest, Hugging Face, Linux</p>
                </span>
            </div>

            <div className="pt-10 ">
                <h1 className="font-rebondG text-3xl phone:text-xl phone:pt-1.5 text-black dark:text-white">Work Experience</h1>
                <h2 className="text-lg font-mono phone:font-base pt-2 md:pt-2 phone:pt-1 text-gray-800 dark:text-gray-200" >Technical Analyst and Project Coordinator  </h2>
                <h3 className="text-base font-mono phone:font-base text-gray-800 dark:text-gray-200" >Daemon Defense Systems, 2022 - Present</h3>


                <ul className="font-mono text-base phone:text-sm pt-1 md:pt-1 phone:pt-1.5 list-disc list-outside pl-5 space-y-1.5  " >
                    <li>
                        Analyze EPR(Electronic Patient Records) system from a software architectural perspective and integration with other clinical engineering modules in SharedHealth.
                    </li>
                    <li>
                        Architected and deployed an Azure-integrated monitoring solution using Dynatrace, which facilitated early
                        identification of 12 critical vulnerabilities and resolved key dependency issues for Elections Manitoba.
                    </li>
                    <li>
                        Executed strategic project planning and delivery for the procurement of devices, achieving a 100% on-time
                        completion rate by coordinating with cross-functional teams at Shared Health Manitoba and service provider.
                    </li>
                    {/* <li>
                        Ensured timely procurement of endpoints for Share Health Manitoba by executing strategic project planning and delivery across the Manitoba. Achieved a 98% on-time completion rate for construction milestones by closely monitoring procurement processes and ensuring seamless delivery of equipment.
                    </li> */}
                </ul>

            </div>

            <div className="pt-5">
                <h2 className="text-lg font-mono phone:font-base pt-2 md:pt-2 phone:pt-1 text-gray-800 dark:text-gray-200" >Software Developer Intern</h2>
                <h3 className="text-base font-mono phone:font-base text-gray-800 dark:text-gray-200" >IMT (Winnipeg), Summer 2022</h3>

                <ul className="font-mono text-base phone:text-sm pt-1 md:pt-1 phone:pt-1.5 font-normal list-disc list-outside pl-5 space-y-2  " >
                    <li>
                        Integrated Loqate REST API with IBM Master Data Management System, ensuring consistent data input and
                        reducing keystrokes by 50%, enhancing user efficiency and data accuracy.

                    </li>
                    <li>
                        Spearheaded JIRA implementation to streamline Agile workflows, integrate seamlessly with existing tools, and
                        increase team efficiency by 20%.
                    </li>
                </ul>

            </div >


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