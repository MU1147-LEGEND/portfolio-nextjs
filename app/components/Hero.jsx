import Header from "./Header";
import HeadingSpringBounce from "./HeadingSpringBounce";
import RevealBounce from "./motions/RevealBounce";
import Transition from "./motions/Transition";

const Hero = () => {
    return (
        <section className="hero section-container">
            {/* header */}
            <Header />
            {/* hero */}

            <div
                id="hero"
                className="section-container flex flex-col-reverse lg:flex-row items-center justify-between gap-10"
            >
                {/* left */}
                <div className="lg:w-1/2 space-y-10 ">
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
                            <button className="text-lg rounded-2xl bg-primary px-16 py-3 ">
                                Hire me
                            </button>
                        </Transition>
                    </div>
                    {/* social icons */}
                    <div>
                        <ul className="flex items-center justify-around gap-3">
                            <li>f</li>
                            <li>x</li>
                            <li>i</li>
                            <li>l</li>
                            <li>g</li>
                        </ul>
                    </div>
                </div>
                {/* right */}
                <div className="lg:w-[30rem] w-9/12 ">
                    <div className="relative">
                        {/* Blurred background */}
                        <RevealBounce>
                            <div className="absolute inset-0 blur-lg z-0">
                                <img
                                    src="/assets/profile.jpg"
                                    alt="profile"
                                    className="rounded-full object-cover"
                                />
                            </div>

                            {/* Clear main image */}
                            <img
                                src="/assets/profile.jpg"
                                alt="profile"
                                className="relative rounded-full object-cover z-10"
                            />
                        </RevealBounce>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;
