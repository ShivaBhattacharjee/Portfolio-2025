"use client";
import React from "react";
import _ from "lodash";
import { FaClipboard, FaGithub, FaTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/layout/contact-dialog";
import { Goldman, Zen_Dots } from "next/font/google";
import { toast } from "../ui/use-toast";
const zenDots = Zen_Dots({ subsets: ["latin"], weight: "400" });
const Hero = () => {
  return (
    <div className="mx-auto flex flex-col gap-10 md:w-[800px]">
      <div className="flex flex-col justify-center gap-10 md:flex-row md:justify-between">
        <div className="order-last md:order-1 md:w-[500px]">
          <div
            className={`mb-6 flex flex-col gap-y-2 text-center md:text-start ${zenDots.className}`}
          >
            <h1 className={`text-4xl font-bold`}>Shiva Bhattacharjee</h1>
            <h2 className={`text-lg font-medium`}>Full Stack Engineer</h2>
            <p className={`${zenDots.className}`}>
              I am passionate about integrating functionality and design in
              applications to create intuitive, user-friendly experiences.
            </p>
          </div>
          <div
            className={`flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 ${zenDots.className}`}
          >
            <ContactDialog />
            <Button
              size="lg"
              className="w-full md:w-48"
              onClick={() => {
                navigator.clipboard.writeText("npx shivadev");
                toast({
                  title: "Copied to clipboard",
                  description: "npx shivadev",
                  status: "success",
                });
              }}
            >
              npx shivadev <FaClipboard className="ml-2" size="14px" />
            </Button>
          </div>
          <div className="mt-10 flex justify-center space-x-5 md:justify-start">
            <a href="https://github.com/shivabhattacharjee" target="_blank">
              <FaGithub size="24px" className="opacity-60 hover:opacity-100" />
            </a>
            <a href="https://x.com/sh17va" target="_blank">
              <FaTwitter size="24px" className="opacity-60 hover:opacity-100" />
            </a>
            <a href="mailto:hello@theshiva.xyz" target="_blank">
              <IoIosMail size="24px" className="opacity-60 hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h5
            className={`mb-4 font-cera text-2xl font-medium ${zenDots.className}`}
          >
            About Me
          </h5>
          <p className="mb-4">
            I&rsquo;m a 19-year-old software engineer passionate about crafting
            robust and user-centric web applications. I thrive at the
            intersection of design and development, aiming to create experiences
            that are both visually appealing and functionally efficient. My
            focus is on building scalable and performant solutions, utilizing
            modern technologies to deliver exceptional user experiences.
          </p>
          <p className="mb-4">
            Currently, as a Founding Engineer at a{" "}
            <span
              onClick={()=>{
                window.location.href = "https://trim.theshiva.xyz/a63740a";
              }}
              className="font-medium text-pink-600 cursor-pointer hover:underline"
            >
              Stealth Startup.
            </span>
            , I&rsquo;m developing web applications that streamline construction
            document creation and implementing AI-driven systems. Prior to this,
            I gained valuable experience at TTIPL, ConcertPal, and GITCS,
            contributing to diverse projects from ERP modules to Chrome
            extensions, and handling tasks ranging from feature development to
            performance optimization. I&rsquo;ve also had the privilege of winning 5
            hackathons, showcasing my ability to quickly innovate and deliver
            impactful solutions.
          </p>
          <p className="mb-4">
            My experience spans various technologies, including ReactJS, NextJS,
            Node.js, and more, allowing me to build comprehensive full-stack
            applications. I enjoy tackling complex problems and leveraging new
            tools to enhance my development process. You can explore my projects
            like Animetrix, Waste Easy, and Quibble, which demonstrate my
            passion for building innovative and practical applications.
          </p>
          <p className="mb-4">
            Outside of coding, I&rsquo;m usually diving into new tech, tinkering with
            gadgets, or exploring the world of video games. And yes, I&rsquo;m a big
            foodie, always on the lookout for new culinary experiences. And of
            course coffee is a must, it fuels my creativity and helps me stay
            focused on my projects. I&rsquo;m always eager to learn and grow, both
            professionally and personally.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
