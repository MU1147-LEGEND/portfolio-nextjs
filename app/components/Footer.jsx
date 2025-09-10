"use client";
import {
    ExternalLink,
    Github,
    Heart,
    Linkedin,
    Mail,
} from "@deemlol/next-icons";
import { handleSmoothScroll } from "../utils/smoothScroll";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "GitHub",
            icon: Github,
            url: "https://github.com/MU1147-LEGEND",
            label: "View my projects on GitHub",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: "https://www.linkedin.com/in/mohammad-ullah32/",
            label: "Connect with me on LinkedIn",
        },
        {
            name: "Email",
            icon: Mail,
            url: "mailto:ullahmohammad314@gmail.com",
            label: "Send me an email",
        },
    ];

    const quickLinks = [
        { name: "Home", target: "#" },
        { name: "About", target: "#about" },
        { name: "Projects", target: "#projects" },
        { name: "Contact", target: "#contact" },
    ];

    const handleExternalLink = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <footer className="bg-black/90 border-t border-primary/20 mt-20">
            <div className="section-container">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Mohammad Ullah
                        </h3>
                        <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                            Full Stack Developer passionate about creating
                            innovative web solutions. Specializing in modern
                            technologies to bring ideas to life.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <button
                                    key={social.name}
                                    onClick={() =>
                                        handleExternalLink(social.url)
                                    }
                                    className="group bg-primary/10 hover:bg-secondary/20 p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-secondary transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={(e) =>
                                            handleSmoothScroll(e, link.target)
                                        }
                                        className="text-gray-300 hover:text-secondary transition-colors duration-300 text-left cursor-pointer"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            Get In Touch
                        </h4>
                        <div className="space-y-3">
                            <button
                                onClick={() =>
                                    handleExternalLink(
                                        "mailto:ullahmohammad314@gmail.com"
                                    )
                                }
                                className="flex items-center text-gray-300 hover:text-secondary transition-colors duration-300 group cursor-pointer"
                            >
                                <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                <span>ullahmohammad314@gmail.com</span>
                            </button>

                            <button
                                onClick={() =>
                                    handleExternalLink(
                                        "https://github.com/MU1147-LEGEND/portfolio-nextjs"
                                    )
                                }
                                className="flex items-center text-gray-300 hover:text-secondary transition-colors duration-300 group cursor-pointer"
                            >
                                <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                <span>View Portfolio Repository</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-primary/20 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="flex items-center text-gray-400 text-sm">
                            <span>
                                © {currentYear} Mohammad Ullah. Made with
                            </span>
                            <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
                            <span>and lots of coffee ☕</span>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex items-center text-gray-400 text-sm">
                            <span className="mr-2">Built with:</span>
                            <div className="flex items-center space-x-2">
                                <span className="bg-primary/20 px-2 py-1 rounded text-xs">
                                    Next.js
                                </span>
                                <span className="bg-primary/20 px-2 py-1 rounded text-xs">
                                    React
                                </span>
                                <span className="bg-primary/20 px-2 py-1 rounded text-xs">
                                    Tailwind CSS
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
