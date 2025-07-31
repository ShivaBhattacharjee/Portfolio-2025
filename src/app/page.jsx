import Hero from "@/components/sections/hero";
import Layout from "@/components/layout/layout";

export const metadata = {
  title: "Shiva Bhattacharjee",
};

export default function About() {
  return (
    <div className=" overflow-x-hidden">
      <Layout>
        <Hero />
      </Layout>
    </div>
  );
}
