import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "@deemlol/next-icons";
import Link from "next/link";

const ProjectCard = ({ projectInfo }) => {
    return (
        <Card className="bg-primary project-card relative">
            <CardContent className="flex my-6 items-center justify-center">
                <div className="w-full h-full">
                    <div className="overflow-hidden rounded-md aspect-video">
                        <img
                            src={projectInfo.imageUrl}
                            alt={projectInfo.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <h3 className="text-xl text-center text-white mt-4">
                        {projectInfo.title}
                    </h3>
                    {/* overlay for hover */}
                    <div className="overlay rounded-2xl text-white absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between p-10">
                        <h3 className="text-2xl text-center">
                            {projectInfo.title}
                        </h3>
                        <div className="flex justify-between">
                            <Link
                                href={projectInfo.liveLink}
                                target="_blank"
                                className="text-white underline bg-indigo-500 px-3 py-2 rounded-2xl hover:bg-indigo-600 transition-colors"
                            >
                                <ExternalLink className="inline" /> Live Demo
                            </Link>
                            <Link
                                href={projectInfo.githubLink}
                                target="_blank"
                                className="text-white underline bg-indigo-500 px-3 py-2 rounded-2xl hover:bg-indigo-600 transition-colors"
                            >
                                <Github className="inline" /> GitHub Repo
                            </Link>
                        </div>
                        <p className="line-clamp-4">
                            {projectInfo.description}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default ProjectCard;
