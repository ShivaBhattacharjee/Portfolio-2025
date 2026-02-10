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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex w-full  py-2 md:px-6 md:py-6"
            >
              <ProjectCard {...project} />
            </div>
          ))}
          </div>
    </Layout>
  );
};

export default Projects;
