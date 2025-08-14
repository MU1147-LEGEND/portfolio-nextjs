import Link from "next/link";
import Header from "./Header";
import HeadingSpringBounce from "./HeadingSpringBounce";
import RevealBounce from "./motions/RevealBounce";
import Transition from "./motions/Transition";
import { Facebook, Github, Instagram, Linkedin } from "@deemlol/next-icons";

const Hero = () => {
    return (
        <section className="hero section-container">
            {/* header */}
            <Header />
            {/* hero */}

            <div
                id="hero"
                className="section-container flex flex-col-reverse lg:flex-row items-center justify-between gap-10 !mt-10 lg:!mt-20"
            >
                {/* left */}
                <div className="lg:w-1/2 lg:space-y-12 ">
                    {/* name-desc */}
                    <div>
                        {/* name */}
                        <HeadingSpringBounce />

                        <RevealBounce>
                            <p className="text-gray-300 my-4 leading-loose tracking-wide">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Facilis eum culpa, minima
                                saepe commodi rem adipisci quia asperiores
                                reprehenderit a.
                            </p>
                        </RevealBounce>
                    </div>
                    {/* hire me */}
                    <div>
                        <Transition>
                            <button className="relative overflow-hidden bg-primary w-60 h-[2.8125rem] rounded-lg cursor-pointer text-white font-medium after:content-[''] after:absolute after:left-0 after:top-0 after:w-0 after:h-full after:bg-primary/50 after:transition-all after:duration-300 after:z-0 hover:after:w-full">
                                <span className="relative z-10">Hire Me</span>
                            </button>
                        </Transition>
                    </div>
                    {/* social icons */}
                    <div className="w-3/4 my-10 mx-auto lg:mx-0">
                        <Transition>
                            <ul className="flex items-center justify-around gap-3">
                                <li>
                                    <Link
                                        href="https://facebook.com/fb.mohammadullah"
                                        target="_blank"
                                    >
                                        <Facebook className="hover:text-secondary cursor-pointer hover:scale-110 transition-all duration-300" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://www.instagram.com/mohammad_ullah11/"
                                        target="_blank"
                                    >
                                        <Instagram className="hover:text-secondary cursor-pointer hover:scale-110 transition-all duration-300" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://www.linkedin.com/in/mohammad-ullah32"
                                        target="_blank"
                                    >
                                        <Linkedin className="hover:text-secondary cursor-pointer hover:scale-110 transition-all duration-300" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://github.com/mu1147-legend"
                                        target="_blank"
                                    >
                                        <Github className="hover:text-secondary cursor-pointer hover:scale-110 transition-all duration-300" />
                                    </Link>
                                </li>
                            </ul>
                        </Transition>
                    </div>
                </div>
                {/* right */}
                <div className="lg:w-[30rem] w-9/12 ">
                    <div className="relative">
                        {/* Blurred background */}
                        <RevealBounce>
                            <div className="absolute blur-sm inset-0  z-0">
                                <img
                                    src="/assets/profile.jpg"
                                    alt="profile"
                                    className="rounded-full object-cover w-4/5"
                                />
                            </div>

                            {/* Clear main image */}
                            <img
                                src="/assets/profile.png"
                                alt="profile"
                                className="relative rounded-full object-cover z-10 w-4/5"
                            />
                        </RevealBounce>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;
