
import Image from 'next/image'
import React from 'react';


export default function HomeContent() {
    return (
        <div className="item-center w-full pt-4 text-gray-700 dark:text-gray-300 ">
            <p className="text-base font-mono mt-2 phone:mt-1 phone:text-sm ">Hi!👋🏼</p>
            <p className="text-base font-mono  pt-4 phone:text-sm phone:pt-4">My name is Saksham Bedi. I am a 5th year student at the University of Manitoba. I am a specializing in AI and Deep Learning with Economics Minor. I currently work at Daemon Defense Systems as a Technical Analyst.  In my free time, I like to learn new skills and explore new restaurants, read, play squash and table tennis, workout. Currently learning film photography.</p>


            <div className="pt-10">
                <h1 className="font-serif text-2xl pt-5 md:pt-2 md:text-2xl phone:pt-3 phone:text-xl text-black dark:text-white">Skills</h1>
                <span className="font-mono text-base  phone:text-sm">
                    <p className=" pt-1 md:pt-1.5 phone:pt-1.5">Languages: Python, Java, SQL, JavaScript, Swift, Bash, C/C++, CQL, TypeScript</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5">Frameworks: Pytorch, Tensorflow, React, Next.js, Tailwind CSS, SwiftUI</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5">Tools: git, AWS, JIRA, Docker, Android Studio, Github Actions, Dynatrace</p>
                    <p className="pt-1 md:pt-1.5 phone:pt-1.5">Soft Skills: Project Management, Leadership and Communication  </p>
                </span>
            </div>

            <div className="pt-10">
                <h2 className="font-serif text-2xl pt-5 md:pt-2 md:text-xl phone:pt-3 phone:text-xl text-black dark:text-white">Projects</h2>

                <div className="project-info">
                    <div className="flex flex-row justify-between  font-mono   pt-2  space-x-5 phone:space-x-3 phone:pt-1.5 md:pt-2 md:space-x-3">
                        <h3 className='text-xl phone:text-lg md:text-lg text-left text-gray-800 dark:text-gray-200'>Vortex - AI Classification</h3>
                        <p className='text-lg phone:text-base md:text-base  text-right text-gray-800 dark:text-gray-200'>Summer 2024</p>
                    </div>
                    <p className=" font-mono text-base phone:text-sm pt-1 md:pt-1 phone:pt-1.5 ">A full stack application for image classification based on Convolution Neural Networks. Transferring my knowledge in CS231n from Stanford University into training the most impactful CNNs of last decade. Designing and developed the full stack application, integrated it with CNNs and deployed it on AWS.
                        Papers Implemented :
                    </p>

                    <ul className="font-mono text-base phone:text-sm pt-1 md:pt-1 phone:pt-1.5  list-decimal list-outside pl-10 space-y-1   " >
                        <li>
                            <a href="https://huggingface.co/sakshambedi/AlexNet-CIFAR10" className='flex flex-row  text-black dark:text-white'>AlexNet
                                <Image src="/icons/link.svg" width={15} height={15} alt="follow me on linkedin" className=" phone:hidden ml-2 dark:invert" />
                                <Image src="/icons/link.svg" width={10} height={10} alt="follow me on linkedin" className="md:hidden lg:hidden ml-1 dark:invert" />
                            </a>
                        </li>
                        <li>
                            <a href="https://huggingface.co/sakshambedi/AlexNet-CIFAR10" className='flex flex-row  text-black dark:text-white'>VGG-Net
                                <Image src="/icons/link.svg" width={15} height={15} alt="follow me on linkedin" className=" phone:hidden ml-2 dark:invert" />
                                <Image src="/icons/link.svg" width={10} height={10} alt="follow me on linkedin" className="md:hidden lg:hidden ml-1 dark:invert" />
                            </a>
                        </li>
                        <li>
                            <p>GoogleNet (fine-tuning pending due to infrastructure cost)</p>

                        </li>
                    </ul>

                    <div className='flex flex-row flex-wrap pt-5 phone:pt-4 justify-start space-x-9 phone:gap-7 box-border w-full md:gap-9'>
                        <Image
                            src="/icons/techstack/amazonecs.svg"
                            width={32}
                            height={32}
                            alt="Amazon ECS"
                            className="w-8 h-8 phone:w-7 phone:h-7 md:w-7 md:h-7 dark:invert"
                            priority
                        />
                        <Image src="/icons/techstack/amazons3.svg" width={0} height={0}
                            alt="AWS S3" className=
                            "w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9 dark:invert "
                        />
                        <Image src="/icons/techstack/docker.svg" width={0} height={0}
                            alt="Docker" className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
                        />
                        <Image src="/icons/techstack/githubactions.svg" width={0} height={0}
                            alt="Github Actions" className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
                        />
                        <Image src="/icons/techstack/python.svg" width={0} height={0}
                            alt="Python" className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
                        />
                        <Image src="/icons/techstack/pytorch.svg" width={0} height={0}
                            alt="PyTorch" className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
                        />
                        <Image src="/icons/techstack/react.svg" width={0} height={0}
                            alt="React" className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
                        />
                    </div>
                </div>


                <div className="pt-10">
                    <div className="flex flex-row justify-between  font-mono text-lg  font-base  pt-2  space-x-9 phone:space-x-3 phone:pt-1.5 md:pt-2 md:space-x-3">
                        <h3 className='text-xl phone:text-lg md:text-lg text-left text-gray-800 dark:text-gray-200'>NanoGTP NLP Model</h3>
                        <h3 className='text-lg phone:text-base md:text-base text-right'>Summer 2024 - ongoing</h3>
                    </div>
                    <p className=" font-mono  text-base phone:text-sm pt-1 md:pt-1 phone:pt-1.5">The simplest, fastest repository for training/finetuning medium-sized GPTs. Still under active development
                    </p>
                    <div className='flex flex-row pt-5 phone:pt-4 justify-start gap-10 phone:gap-7 md:gap-9'>
                        <Image src="/icons/techstack/python.svg" width={0} height={0}
                            alt="AWS EC2" className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
                        />
                        <Image src="/icons/techstack/pytorch.svg" width={0} height={0}
                            alt="AWS EC2" className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
                        />
                        <Image src="/icons/techstack/huggingface.svg" width={0} height={0}
                            alt="AWS EC2" className="dark:invert w-8 h-8 phone:w-7 phone:h-7 md:w-9 md:h-9"
                        />
                    </div>
                </div>
            </div>


            <div className="pt-10">
                <h1 className="font-serif text-2xl pt-5 md:pt-2 md:text-xl phone:pt-3 phone:text-xl text-black dark:text-white">Education</h1>
                <div className="flex flex-row justify-between font-mono text-lg pt-2  phone:text-sm phone:pt-1.5">
                    <h3 className='text-left'>B.Sc. in Computer Science, </h3>
                    <h3 className='text-right'>2020 - 2025</h3>
                </div>
                <p className=" font-mono text-base  phone:text-sm md:pt-0">University of Manitoba</p>
            </div>




        </div >

    );
}