import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "./ProjectCard";

const ProjectCards = () => {
    const projects = [
        {
            title: "Sanchayanbd",
            description: `SanchayanBD is a responsive web application built for a community-based financial organization. It 
provides essential information about membership, services, and organizational values, offering a clean 
and user-friendly interface.`,
            imageUrl: "/assets/sanchayanbd.png",
            liveLink: "https://sanchayanbd.com",
            githubLink: "https://github.com/MU1147-LEGEND/sanchayan",
        },
        {
            title: "Visionary - AI",
            description: "Description for project 2",
            imageUrl: "/assets/visionaryai.png",
            liveLink: "https://visionary-ai-beta.vercel.app/",
            githubLink: "https://github.com/MU1147-LEGEND/VisionaryAI",
        },
        {
            title: "Project 3",
            description: "Description for project 2",
            imageUrl: "/assets/sanchayanbd.png",
            liveLink: "#",
            githubLink: "#",
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
                        className="md:basis-1/2 lg:basis-1/3 cursor-grab"
                    >
                        <div className="p-1">
                            <ProjectCard projectInfo={project} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 z-10 items-center justify-center bg-primary/50 flex" />
            <CarouselNext className="absolute right-0 z-10 items-center justify-center bg-primary/50 flex" />
        </Carousel>
    );
};

export default ProjectCards;
