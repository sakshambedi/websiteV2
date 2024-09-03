import Image from 'next/image'
import React from 'react';
import { AWSEC2 } from './ui/logo';

export default function HomeContent() {
    return (
        <div className="item-center w-full ">
            <p className="text-base font-roboto iphone:text-base  ">Hi!👋🏼</p>
            <p className="text-base font-mono  pt-4 iphone:text-base iphone:pt-4">My name is Saksham Bedi. I am a 5th year student at the University of Manitoba. I am a specializing in AI and Deep Learning with Economics Minor. I currently work at Daemon Defense Systems as a Technical Analyst.  In my free time, I like to learn new skills and explore new restaurants, read, play squash and table tennis, workout. Currently learning film photography.</p>


            <div className="pt-10">
                <h1 className="font-serif text-2xl pt-5 md:pt-2 md:text-xl iphone:pt-3 iphone:text-base">Skills</h1>
                <span className="font-mono text-base  iphone:text-base">
                    <p className=" pt-1 md:pt-1.5 iphone:pt-1.5">Languages: Python, Java, SQL, JavaScript, Swift, Bash, C/C++, CQL, TypeScript</p>
                    <p className="pt-1 md:pt-1.5 iphone:pt-1.5">Frameworks: Pytorch, Tensorflow, React, Next.js, Tailwind CSS, SwiftUI</p>
                    <p className="pt-1 md:pt-1.5 iphone:pt-1.5">Tools: git, AWS, JIRA, Docker, Android Studio, Github Actions, Dynatrace</p>
                    <p className="pt-1 md:pt-1.5 iphone:pt-1.5">Soft Skills: Project Management, Leadership and Communication  </p>
                </span>
            </div>

            <div className="pt-10">
                <h1 className="font-serif text-2xl pt-5 md:pt-2 md:text-xl iphone:pt-3 iphone:text-base">Projects</h1>

                <div className="project-info">
                    <div className="flex flex-row justify-between  font-mono text-lg  font-base  pt-2  phone:text-base phone:pt-1.5">
                        <h3>Vortex - AI Classification</h3>
                        <h4>Summer 2024</h4>
                    </div>
                    <p className=" font-mono text-base iphone:text-base pt-1 md:pt-1 iphone:pt-1.5 ">A full stack application for image classification based on Convolution Neural Networks. Transferring my knowledge in CS231n from Stanford University into training the most impactful CNNs of last decade. Designing and developed the full stack application, integrated it with CNNs and deployed it on AWS.
                        Papers Implemented :
                    </p>

                    <ul className="font-mono text-base iphone:text-base pt-1 md:pt-1 iphone:pt-1.5  list-decimal list-outside pl-10 space-y-1   " >
                        <li>
                            <a href="https://huggingface.co/sakshambedi/AlexNet-CIFAR10">AlexNet </a>
                        </li>
                        <li>
                            <a href="https://huggingface.co/sakshambedi/AlexNet-CIFAR10">VGG-Net</a>
                        </li>
                        <li>
                            <p>GoogleNet (fine-tuning pending due to infrastructure cost)</p>

                        </li>
                    </ul>

                    <div className='flex flex-row pt-5 phone:pt-4 justify-start gap-10 phone:gap-5 box-border w-full'>
                        <Image src="/icons/techstack/amazonecs.svg" width={30} height={30}
                            alt="AWS EC2" className="dark:invert"
                        />
                        <Image src="/icons/techstack/amazons3.svg" width={30} height={30}
                            alt="AWS S3" className="dark:invert"
                        />
                        <Image src="/icons/techstack/docker.svg" width={30} height={30}
                            alt="Docker" className="dark:invert"
                        />
                        <Image src="/icons/techstack/githubactions.svg" width={30} height={30}
                            alt="Github Actions" className="dark:invert"
                        />
                        <Image src="/icons/techstack/python.svg" width={30} height={30}
                            alt="Python" className="dark:invert"
                        />
                        <Image src="/icons/techstack/pytorch.svg" width={30} height={30}
                            alt="PyTorch" className="dark:invert"
                        />
                        <Image src="/icons/techstack/react.svg" width={30} height={30}
                            alt="React" className="dark:invert"
                        />
                    </div>
                </div>


                <div className="pt-7">
                    <div className="flex flex-row font-mono justify-between  text-lg pt-2 phone:text-base phone:pt-1.5">
                        <h3>NanoGTP NLP Model</h3>
                        <h4>Summer 2024 - ongoing</h4>
                    </div>
                    <p className=" font-mono  text-base iphone:text-base pt-1 md:pt-1 iphone:pt-1.5">The simplest, fastest repository for training/finetuning medium-sized GPTs. Still under active development
                    </p>
                    <div className='flex flex-row pt-5 phone:pt-4 justify-start gap-10 phone:gap-5'>
                        <Image src="/icons/techstack/python.svg" width={30} height={30}
                            alt="AWS EC2" className="dark:invert"
                        />
                        <Image src="/icons/techstack/pytorch.svg" width={30} height={30}
                            alt="AWS EC2" className="dark:invert"
                        />
                        <Image src="/icons/techstack/huggingface.svg" width={30} height={30}
                            alt="AWS EC2" className="dark:invert"
                        />
                    </div>
                </div>
            </div>


            <div className="pt-10">
                <h1 className="font-serif text-2xl pt-5 md:pt-2 md:text-xl iphone:pt-3 iphone:text-base">Education</h1>
                <div>
                    <h3 className=" font-mono text-lg    pt-2  phone:text-base phone:pt-1.5">B.Sc. in Computer Science, 2020 - 2025</h3>
                    <p className=" font-mono text-base  iphone:text-base pt- md:pt-0 iphone:pt-1.5">University of Manitoba
                    </p>
                </div>
            </div>




        </div >

    );
}