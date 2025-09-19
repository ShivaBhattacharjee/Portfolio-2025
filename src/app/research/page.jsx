import Layout from "@/components/layout/layout";
import ResearchList from "@/components/sections/research-list";
import { research } from "@/constants";

export const metadata = {
  title: "Research",
};

const Research = () => {
  return (
    <Layout
      showHeader
      title="Research"
      subtitle="Academic research, publications, and experimental projects"
    >
      <ResearchList research={research} />
    </Layout>
  );
};

export default Research;