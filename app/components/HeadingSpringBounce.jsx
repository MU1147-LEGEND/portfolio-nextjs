import RevealBounce from "./motions/RevealBounce";

const HeadingSpringBounce = () => {
    return (
        <RevealBounce>
            <h1 className="uppercase text-3xl lg:text-5xl font-bold my-8">
                <span>
                    I<span className="text-secondary">'</span>m
                </span>
                <span className="text-secondary"> Mohammad Ullah</span>
            </h1>
        </RevealBounce>
    );
};
export default HeadingSpringBounce;
