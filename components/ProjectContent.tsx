import React from "react";
import Image from 'next/image'
export default function ProjectContent() {
    return (
        <section className="text-gray-700 dark:text-gray-300">

            <div className="pt-0">
                <h2 className="font-rebondG text-3xl md:pt-2 md:text-2xl phone:pt-3 phone:text-xl text-black dark:text-white">Projects</h2>

                <div className="project-info">
                    <div className="flex flex-row justify-between  font-mono   pt-2  space-x-5 phone:space-x-3 phone:pt-1.5 md:pt-2 md:space-x-3">
                        <h3 className='text-lg font-rebondG phone:font-base pt-2 md:pt-2 phone:pt-1  text-black dark:text-white'>Vortex - AI Classification</h3>
                        <p className='text-base phone:text-base md:text-base  text-right text-gray-800 dark:text-gray-200'>Summer 2024</p>
                    </div>
                    <p className="font-mono text-base phone:text-sm pt-1 md:pt-1 phone:pt-1.5 ">A full stack application for image classification based on Convolution Neural Networks. Transferring my knowledge in CS231n from Stanford University into training the most impactful CNNs of last decade. Designing and developed the full stack application, integrated it with CNNs and deployed it on AWS.
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
                        <h3 className='text-lg font-rebondG phone:font-base pt-2 md:pt-2 phone:pt-1 text-black dark:text-white'>NanoGTP NLP Model</h3>
                        <h3 className='text-base phone:text-base md:text-base text-right'>Summer 2024 - ongoing</h3>
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



        </section >

    );
}