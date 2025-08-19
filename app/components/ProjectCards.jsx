import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "./ProjectCard";
import RevealBounce from "./motions/RevealBounce";

const ProjectCards = () => {
    const projects = [
        {
            title: "Sanchayanbd",
            description: `SanchayanBD is a responsive web application built for a community-based financial organization. It 
provides essential information about membership, services, and organizational values, offering a clean 
and user-friendly interface.`,
            imageUrl: "/assets/projects/sanchayanbd.png",
            liveLink: "https://sanchayanbd.com",
            githubLink: "https://github.com/MU1147-LEGEND/sanchayan",
        },
        {
            title: "Visionary - AI",
            description:
                "Visionary - AI is a cutting-edge web application that leverages artificial intelligence to provide personalized AI-driven Image Generations and real-time feedback.",
            imageUrl: "/assets/projects/visionaryai.png",
            liveLink: "https://visionary-ai-beta.vercel.app/",
            githubLink: "https://github.com/MU1147-LEGEND/VisionaryAI",
        },
        {
            title: "Next.js Learning Platform",
            description:
                "A platform for learning Next.js with various resources and tutorials.",
            imageUrl: "/assets/projects/nextlearn.png",
            liveLink: "https://learn-next-modern.vercel.app/",
            githubLink:
                "https://github.com/MU1147-LEGEND/nextjs-learning-platform-using-v0",
        },
        {
            title: "Project 4",
            description: "Description for project 4",
            imageUrl: "/assets/sanchayanbd.png",
            liveLink: "#",
            githubLink: "#",
        },
    ];
    return (
        <section className="section-container" id="projects">
            <RevealBounce>
                <h2 className="text-[2rem] font-semibold text-center mb-8">
                    My Projects
                </h2>
                <Carousel
                    opts={{
                        align: "start",
                        // loop: true,
                    }}
                    className=" max-w-[79.88rem] m-auto bg-primary rounded-2xl"
                >
                    <CarouselContent className="max-w-[77rem] m-auto py-10 select-none">
                        {projects.map((project, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3 cursor-grab active:cursor-grabbing"
                            >
                                <div className="p-1">
                                    <RevealBounce delay={index * 0.4}>
                                        <ProjectCard projectInfo={project} />
                                    </RevealBounce>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 z-10 items-center justify-center bg-primary/50 flex" />
                    <CarouselNext className="absolute right-0 z-10 items-center justify-center bg-primary/50 flex" />
                </Carousel>
            </RevealBounce>
        </section>
    );
};

export default ProjectCards;
