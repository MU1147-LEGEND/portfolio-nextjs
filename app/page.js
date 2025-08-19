import AboutMe from "./components/AboutMe";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ScrollProgress from "./components/ScrollProgress";
import ProjectCards from "./components/ProjectCards";

const page = () => {
    return (
        <main>
            <ScrollProgress />
            <Header />
            <Hero />
            <AboutMe />
            <ProjectCards />
        </main>
    );
};
export default page;
