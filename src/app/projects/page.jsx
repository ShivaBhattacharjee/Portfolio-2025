import ProjectCard from "@/components/sections/projects";
import Layout from "@/components/layout/layout";
import { projects } from "@/constants";

export const metadata = {
  title: "Projects",
};

const Projects = () => {

  return (
    <Layout
      showHeader
      title="Projects"
      subtitle="A collection of things I've built."
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap w-full  justify-center">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex w-full justify-stretch py-2 md:w-[370px] md:px-6 md:py-6"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
