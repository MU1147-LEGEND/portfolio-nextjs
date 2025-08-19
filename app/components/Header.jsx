"use client";
import { ArrowRightCircle, Menu } from "@deemlol/next-icons";
import Link from "next/link";
import { useState } from "react";
import { handleSmoothScrollWithCallback } from "../utils/smoothScroll";
import RevealBounce from "./motions/RevealBounce";
import Transition from "./motions/Transition";

const Header = () => {
    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = () => {
        setIsOpened(!isOpened);
    };

    const handleOuterClose = () => {
        setIsOpened(false);
    };

    // Wrapper function to handle mobile menu closing
    const handleNavigation = (e, target) => {
        handleSmoothScrollWithCallback(e, target, () => {
            setIsOpened(false);
        });
    };

    return (
        <div className="sticky top-0 z-20 w-full mt-5">
            {/* Desktop Header - Always visible */}
            <header className="hidden lg:flex bg-primary/80 items-center justify-between px-8 py-2 h-[4.86rem] max-w-[79.88rem] m-auto rounded-[3rem] backdrop-blur-md">
                {/* left */}
                <div className="">
                    <RevealBounce>
                        <button className="bg-black w-60 h-[2.8125rem] rounded-4xl cursor-pointer relative increase-bg-width">
                            <Link
                                href="/assets/resume.pdf"
                                // download
                                className="relative z-50"
                            >
                                Download Resume
                            </Link>
                        </button>
                    </RevealBounce>
                </div>
                {/* right */}
                <div className="">
                    <Transition>
                        <ul className="flex items-center justify-around space-x-5">
                            <li className="cursor-pointer menu-list">
                                <button
                                    onClick={(e) => handleNavigation(e, "#")}
                                >
                                    Home
                                </button>
                            </li>
                            <li className="cursor-pointer menu-list">
                                <button
                                    onClick={(e) =>
                                        handleNavigation(e, "#about")
                                    }
                                >
                                    About
                                </button>
                            </li>
                            <li className="cursor-pointer menu-list">
                                <button
                                    onClick={(e) =>
                                        handleNavigation(e, "#projects")
                                    }
                                >
                                    Projects
                                </button>
                            </li>
                            <li className="cursor-pointer menu-list">
                                <button
                                    onClick={(e) =>
                                        handleNavigation(e, "#contact")
                                    }
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </Transition>
                </div>
            </header>

            {/* Mobile Header - Slides in from right */}
            <div className="lg:hidden py-3 h-full">
                <div className="flex items-center justify-between w-full bg-primary/90 p-2 rounded-2xl">
                    <button className="bg-black w-60 h-[2.8125rem] rounded-4xl cursor-pointer">
                        <Link
                            href="/assets/resume.pdf"
                            download
                            className="relative z-50"
                        >
                            Download Resume
                        </Link>
                    </button>

                    <button
                        onClick={handleOpen}
                        className="lg:hidden z-30 flex items-center"
                    >
                        <ArrowRightCircle
                            className={`${
                                isOpened
                                    ? "opacity-100 rotate-0"
                                    : "opacity-0 -rotate-45"
                            } transition-all duration-300 absolute`}
                        />

                        <Menu
                            className={`${
                                isOpened
                                    ? "opacity-0 rotate-45"
                                    : "opacity-100 rotate-0"
                            } transition-all duration-300`}
                        />
                    </button>
                </div>

                {/* Overlay for closing menu when clicking outside */}
                {isOpened && (
                    <div
                        className="fixed inset-0 z-10"
                        onClick={handleOuterClose}
                    />
                )}

                <header
                    className={`${
                        isOpened
                            ? "-translate-y-0 opacity-100 -z-10"
                            : "-translate-y-full opacity-0"
                    } lg:hidden fixed top-[6rem] right-0 w-full bg-gray-800/95 flex flex-col space-y-5 items-center justify-between px-8 py-4 rounded-xl transition-all duration-300 z-20`}
                >
                    {/* right */}
                    <div className="">
                        <ul className="flex flex-col items-center justify-around space-y-6">
                            <li className="cursor-pointer">
                                <button
                                    onClick={(e) => handleNavigation(e, "#")}
                                >
                                    Home
                                </button>
                            </li>
                            <li className="cursor-pointer">
                                <button
                                    onClick={(e) =>
                                        handleNavigation(e, "#about")
                                    }
                                >
                                    About
                                </button>
                            </li>
                            <li className="cursor-pointer">
                                <button
                                    onClick={(e) =>
                                        handleNavigation(e, "#projects")
                                    }
                                >
                                    Projects
                                </button>
                            </li>
                            <li className="cursor-pointer">
                                <button
                                    onClick={(e) =>
                                        handleNavigation(e, "#contact")
                                    }
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>
                </header>
            </div>
        </div>
    );
};
export default Header;
