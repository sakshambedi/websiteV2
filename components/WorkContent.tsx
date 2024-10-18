import React from "react";

export default function WorkContent() {
    return (
        <section className="text-gray-700 dark:text-gray-300">

            {/* <h3 className="font-serif text-2xl pt-5 md:pt-2  phone:pt-3 phone:text-xl text-black dark:text-white">Work Mission</h3>
            <p className="font-mono text-base dark:text-gray-200 phone:text-sm pt-2 md:pt-1 phone:pt-1.5 ">On a mission to build AI-driven products that enhance productivity and drive positive change for humanity. Documenting my journey, openly sharing lessons learned, and helping others benefit from my experiences as we grow together on this path to innovation and impact.</p> */}

            <div className="pt-0 ">
                <h3 className="font-serif text-2xl  pt-2  phone:text-xl phone:pt-1.5 text-black dark:text-white">Technical Analyst and Project Coordinator</h3>
                <h4 className="text-base font-mono phone:font-base text-gray-800 dark:text-gray-200" >Daemon Defense Systems, 2022 - Present</h4>

                <ul className="font-mono text-base phone:text-sm pt-1 md:pt-1 phone:pt-1.5 list-disc list-outside pl-5 space-y-1.5  " >
                    <li>
                        Analyze EPR(Electronic Patient Records) system from a software architectural perspective and integration with other clinical engineering modules in SharedHealth.
                    </li>
                    <li>
                        Collaborated with clinical engineering software providers and integrator(s) to ensure the successful delivery of migration plans for the clinical engineering modules for the SH Manitoba. The in-depth analysis of existing infrastructure guaranteed a seamless deployment, ensuring no disruption to healthcare operations in Manitoba.
                    </li>
                    <li>
                        Implement Dynatrace integration with existing infrastructure for Elections Manitoba, aiding in the identification of the root causes behind the infrastructure outage in 2023. This initiative identified 12 potential exploits within the infrastructure, improved monitoring capabilities and contributed preventing disruptions.
                    </li>
                    <li>
                        Ensured timely procurement of endpoints for Share Health Manitoba by executing strategic project planning and delivery across the Manitoba. Achieved a 98% on-time completion rate for construction milestones by closely monitoring procurement processes and ensuring seamless delivery of equipment.
                    </li>
                </ul>

            </div>

            <div className="pt-10">
                <h3 className="font-serif text-2xl  font-base  pt-2  phone:text-xl phone:pt-1.5 text-black dark:text-white ">Software Developer Intern</h3>
                <h4 className="text-base font-mono text-gray-800 dark:text-gray-200" >IMT (Winnipeg), Summer 2022</h4>


                <ul className="font-mono text-base phone:text-sm pt-1 md:pt-1 phone:pt-1.5 font-normal list-disc list-outside pl-5 space-y-2  " >
                    <li>
                        Implementing Loqate with MDM leading to consistent and standardized input address in IBM Master Database Management.

                    </li>
                    <li>
                        Worked with PMO(s) on Project Management to improve efficiency and communication about tickets and integrating it directly with services used by the organization. Documenting process and presenting changes to senior developers and PM(s)
                    </li>
                    <li>
                        Optimized SQL queries in Microsoft Reporting Services, reducing misinformation in reporting files and decreasing the
                        error rate by 18%
                    </li>
                </ul>

            </div >


        </section >

    );
}