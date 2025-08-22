import Link from "next/link";

export default function Contact() {
    return (
        <section className="section-container">
            <div className="max-w-[80rem] m-auto flex items-center justify-center py-10">
                <div
                    id="contact"
                    className="bg-primary text-white rounded-2xl shadow-lg w-full grid md:grid-cols-2"
                >
                    {/* Left Side - Form */}
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold mb-6">
                            Contact Me
                        </h2>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full bg-transparent border-b border-gray-500 outline-none py-2"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-transparent border-b border-gray-500 outline-none py-2"
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full bg-transparent border-b border-gray-500 outline-none py-2"
                            />
                            <textarea
                                placeholder="Message"
                                className="w-full bg-transparent border-b border-gray-500 outline-none py-2 h-24"
                            ></textarea>
                            <button
                                type="button"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow-md transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Right Side - Contact Info */}
                    <div className="bg-[#191c2350] p-8 rounded-r-2xl">
                        <h2 className="text-2xl font-semibold mb-4">
                            Contact information
                        </h2>
                        <p className="text-gray-400 mb-6">
                            I'm open for any suggestion or just to have a chat
                        </p>

                        <div className="space-y-4 text-gray-300">
                            <div className="flex items-start gap-3">
                                <span className="w-5 h-5 mt-1">📍</span>
                                <p>
                                    <span className="font-semibold text-white">
                                        Address:
                                    </span>{" "}
                                    Kasba, Brahmanbaria - Bangladesh
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="w-5 h-5 mt-1">📞</span>
                                <p>
                                    <span className="font-semibold text-white">
                                        Phone:
                                    </span>{" "}
                                    <Link
                                        href="tel:+8801734906838"
                                        className="text-blue-500 visited:text-purple-500 hover:underline"
                                    >
                                        +8801734906838
                                    </Link>
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="w-5 h-5 mt-1">✉️</span>
                                <p>
                                    <span className="font-semibold text-white">
                                        Email:
                                    </span>{" "}
                                    ullahmohammad314@gmail.com
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="w-5 h-5 mt-1">🌐</span>
                                <p>
                                    <span className="font-semibold text-white">
                                        Website:
                                    </span>{" "}
                                    <Link
                                        href="https://mohammadullah.me"
                                        className="text-blue-500 visited:text-purple-500 hover:underline"
                                    >
                                        mohammadullah.me
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
