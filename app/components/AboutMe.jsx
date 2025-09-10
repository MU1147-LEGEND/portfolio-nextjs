"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import figma from "../../public/assets/figma.png";
import git from "../../public/assets/git.png";
import html from "../../public/assets/html.png";
import js from "../../public/assets/js.png";
import linux from "../../public/assets/linux.png";
import mongo from "../../public/assets/mongo.png";
import next from "../../public/assets/next-w.png";
import node from "../../public/assets/node.svg";
import react from "../../public/assets/react.png";
import ts from "../../public/assets/ts.jpg";
import tw from "../../public/assets/tw.png";
import wp from "../../public/assets/wp.png";
import redux from "../../public/assets/redux.png";
import InfiniteScroll from "./motions/InfiniteScroll";
import RevealBounce from "./motions/RevealBounce";

const AboutMe = () => {
    const skills = [
        { name: "HTML", icon: html },
        { name: "Tailwind CSS", icon: tw },
        { name: "JavaScript", icon: js },
        { name: "TypeScript", icon: ts },
        { name: "React", icon: react },
        { name: "Redux", icon: redux },
        { name: "Next.js", icon: next },
        { name: "Node.js", icon: node },
        { name: "MongoDB", icon: mongo },
        { name: "Git", icon: git },
        { name: "Wordpress", icon: wp },
        { name: "Figma", icon: figma },
        { name: "Linux", icon: linux },
    ];

    return (
        <section className="section-container" id="about">
            <RevealBounce>
                <h2 className="text-[2rem] font-semibold text-center">
                    About Me
                </h2>
                <div
                    id="about-me"
                    className="max-w-[79.875rem] m-auto bg-primary rounded-xl px-5 py-6 my-10"
                >
                    <pre>
                        <code className="text-xl">{"{ whoami }"}</code>
                    </pre>
                    <p className="text-gray-200 my-4 leading-loose tracking-wide">
                        I’m <strong>Mohammad Ullah</strong>, a frontend
                        developer passionate about building{" "}
                        <strong>responsive, interactive web apps</strong> using{" "}
                        <strong>
                            React, Next.js, JavaScript, and Tailwind CSS
                        </strong>
                        . I turn ideas into clean, maintainable code and
                        engaging user experiences. Always curious and creative,
                        I tackle challenges head-on—both in coding and on my{" "}
                        <strong>biking adventures</strong>.
                    </p>
                </div>
            </RevealBounce>

            <RevealBounce>
                <div
                    id="edu-certificate"
                    className="max-w-[79.875rem] lg:flex-row flex flex-col items-center justify-between gap-10 m-auto rounded-xl py-6 my-10"
                >
                    <div className="lg:w-1/2 bg-primary rounded-xl px-5 py-6">
                        <h3 className="text-xl ">Education </h3>
                        <ul className="list-disc pl-6 my-5 h-[4rem] ">
                            <li>
                                Alim(HSC) - Tamirul Millat Kamil Madrasah - 2020
                            </li>
                            <li>
                                Diploma in Computer Science and Technology -
                                Session (2022-2023)
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-1/2 bg-primary rounded-xl px-5 py-6">
                        <h3 className="text-xl ">Certifications</h3>
                        <ul className="list-disc pl-6 my-5 h-[4rem] ">
                            <li>Responsive Web Design - freeCodeCamp</li>
                            <li>
                                JavaScript Algorithms and Data Structures (aug 16, 2025) -
                                <Link
                                    href={
                                        "https://www.freecodecamp.org/certification/mu1147_legend/javascript-algorithms-and-data-structures-v8"
                                    }
                                    target="_blank"
                                    className="text-blue-500 hover:underline leading-loose tracking-wide"
                                >
                                    {" "}
                                    freeCodeCamp
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </RevealBounce>

            <RevealBounce>
                <div
                    id="skills"
                    className="max-w-[79.875rem] m-auto bg-primary rounded-xl px-5 py-6 pb-10 my-10"
                >
                    <h2 className="text-xl">Skills & Technologies</h2>
                    <div>
                        {/* Auto-scrolling skills carousel with reusable InfiniteScroll */}
                        <div className="mt-5">
                            <InfiniteScroll
                                itemWidth={98}
                                gap={16}
                                duration={60}
                                direction="left"
                            >
                                {skills.map((skill, index) => (
                                    <motion.li
                                        key={skill.name}
                                        className="flex items-center flex-col justify-center gap-2 bg-white rounded-lg p-4 shadow-md text-black font-semibold text-xs w-[5.13rem] md:w-[6.13rem] h-[5rem] md:h-[7rem] text-nowrap flex-shrink-0 list-none select-none"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <Image
                                            src={skill.icon}
                                            alt={skill.name}
                                            width={48}
                                            height={48}
                                            className="mr-2 w-[2rem] md:w-[3rem]"
                                            draggable="false"
                                        />
                                        {skill.name}
                                    </motion.li>
                                ))}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </RevealBounce>
        </section>
    );
};
export default AboutMe;
