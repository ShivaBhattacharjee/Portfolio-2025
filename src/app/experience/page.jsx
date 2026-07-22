import Layout from "@/components/layout/layout";
import { WorkExperience } from "@/components/sections/work-experience";
import { experiences } from "@/constants";


export const metadata = {
  title: "Experience",
};

const getExperienceYears = () => {
  const earliest = experiences
    .map((e) => new Date(e.year.split(" - ")[0]))
    .sort((a, b) => a - b)[0];
  const years = (new Date() - earliest) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years);
};

const Experience = () => {
  const totalYears = getExperienceYears();

  return (
    <Layout
      showHeader
      title="Experiences"
      subtitle={`My journey as a software developer over ${totalYears}+ years`}
    >
      <WorkExperience
        className="divide-y divide-black/[0.06] dark:divide-white/[0.06]"
        experiences={[...experiences].reverse()}
      />
    </Layout>
  );
};

export default Experience;
