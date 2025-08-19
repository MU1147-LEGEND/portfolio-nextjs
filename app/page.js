import AboutMe from "./components/AboutMe";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PathMorphing from "./components/motions/PathsMorph";
import UsePresenceData from "./components/motions/SkillsPresence";
import ScrollProgress from "./components/ScrollProgress";

const page = () => {
    return (
        <main>
            <ScrollProgress />
            <Header />
            <Hero />

            <AboutMe />
            <UsePresenceData />

        </main>
    );
};
export default page;
