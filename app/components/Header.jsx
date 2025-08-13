"use client";
import { ArrowRightCircle, Menu } from "@deemlol/next-icons";
import { useState } from "react";

const Header = () => {
    const [isOpened, setIsOpened] = useState(false);
    const handleOpen = () => {
        setIsOpened(!isOpened);
    };

    const handleOuterClose = () => {
        setIsOpened(false);
    };

    return (
        <div className="sticky top-0 z-20 w-full">
            {/* Desktop Header - Always visible */}
            <header className="hidden lg:flex bg-primary/80 items-center justify-between px-8 py-2 h-[4.86rem] max-w-[79.88rem] m-auto rounded-[3rem] backdrop-blur-md">
                {/* left */}
                <div className="">
                    <button className="bg-black w-60 h-[2.8125rem] rounded-4xl cursor-pointer">
                        Download Resume
                    </button>
                </div>
                {/* right */}
                <div className="">
                    <ul className="flex items-center justify-around space-x-5">
                        <li className="cursor-pointer">Home</li>
                        <li className="cursor-pointer">About</li>
                        <li className="cursor-pointer">Projects</li>
                        <li className="cursor-pointer">Contact</li>
                    </ul>
                </div>
            </header>

            {/* Mobile Header - Slides in from right */}
            <div className="lg:hidden py-3 h-full">
                <div className="flex items-center justify-between w-full bg-primary/90 p-2 rounded-2xl">
                    <button className="bg-black w-60 h-[2.8125rem] rounded-4xl cursor-pointer">
                        Download Resume
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
                            ? "translate-x-0 opacity-100"
                            : "translate-x-full opacity-0"
                    } lg:hidden fixed top-[6rem] right-0 w-full bg-primary/90 flex flex-col space-y-5 items-center justify-between px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-md z-20`}
                >
                    {/* right */}
                    <div className="">
                        <ul className="flex flex-col items-center justify-around space-y-5">
                            <li
                                className="cursor-pointer"
                                onClick={handleOuterClose}
                            >
                                Home
                            </li>
                            <li
                                className="cursor-pointer"
                                onClick={handleOuterClose}
                            >
                                About
                            </li>
                            <li
                                className="cursor-pointer"
                                onClick={handleOuterClose}
                            >
                                Projects
                            </li>
                            <li
                                className="cursor-pointer"
                                onClick={handleOuterClose}
                            >
                                Contact
                            </li>
                        </ul>
                    </div>
                </header>
            </div>
        </div>
    );
};
export default Header;
