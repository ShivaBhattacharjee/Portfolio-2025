import Layout from "@/components/layout/layout";
import Timeline from "@/components/layout/timeline";
import { experiences } from "@/constants";


export const metadata = {
  title: "Experience",
};

const Experience = () => {

  return (
    <Layout
      showHeader
      title="Experiences"
      subtitle="My journey as a software developer all throughout the years"
    >
      <div>
        {[...experiences].reverse().map((experience, index) => (
          <Timeline {...experience} key={index} />
        ))}
      </div>
    </Layout>
  );
};

export default Experience;
