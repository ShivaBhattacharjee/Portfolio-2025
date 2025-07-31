"use client";
import React from "react";
import _ from "lodash";
import { FaClipboard, FaGithub, FaTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/layout/contact-dialog";
import { Goldman, Zen_Dots } from "next/font/google";
import { toast } from "../ui/use-toast";
import GitHubStreak from "../Streaks";
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
            <h2 className={`text-lg font-medium`}>
              Full Stack + AI Engineer & Part-time Researcher
            </h2>
            <p className={`${zenDots.className}`}>
              I build functional and beautiful applications with intuitive UI/UX. I also research SLMs and computer vision, with 5+ research projects.
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
            I&apos;m a 20-year-old Full Stack + AI Engineer and Part-time Researcher passionate about building innovative solutions. My expertise lies in developing and deploying full-stack applications with a focus on intuitive UI/UX, as well as conducting research in SLMs and Computer Vision. I have contributed to 5+ research projects, exploring applications of computer vision and SLMs, and developing fine-tuning pipelines for SLMs and LLMs. I am driven to create impactful technology that solves real-world problems.
          </p>
        </div>
      </div>
      <GitHubStreak/>
    </div>
  );
};

export default Hero;

