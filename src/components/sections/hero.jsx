"use client";
import React from "react";
import _ from "lodash";
import { FaClipboard, FaDiscord, FaGithub,  } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { IoIosMail } from "react-icons/io";
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/layout/contact-dialog";
import {  Zen_Dots } from "next/font/google";
import { toast } from "../ui/use-toast";
import GitHubStreak from "../Streaks";
import { Rss } from "lucide-react";
import Link from "next/link";
import { GeistPixelSquare } from "geist/font/pixel";
const zenDots = Zen_Dots({ subsets: ["latin"], weight: "400" });
const Hero = () => {
  return (
    <div className="mx-auto flex flex-col gap-10 md:max-w-5xl">
      <div className="flex flex-col justify-center gap-10 md:flex-row md:justify-between">
        <div className="order-last md:order-1 md:w-[500px]">
          <div
            className={`mb-6 flex flex-col gap-y-2 text-center md:text-start ${GeistPixelSquare.className}`}
          >
            <h1 className={`text-3xl md:text-4xl font-bold`}>Shiva Bhattacharjee</h1>
            <h2 className={`text-sm md:text-xl font-medium uppercase tracking-widest`}>
              Applied AI Engineer
            </h2>
            <p className={`text-sm md:text-base leading-relaxed opacity-90`}>
              I build AI agents and workflows. I also work on fine-tuning
              pipelines, prompt engineering, and computer vision research.
            </p>
          </div>
          <div
            className={`flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 ${GeistPixelSquare.className}`}
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
              <RiTwitterXLine size="24px" className="opacity-60 hover:opacity-100" />
            </a>
            <a href="mailto:hello@theshiva.xyz" target="_blank">
              <IoIosMail size="24px" className="opacity-60 hover:opacity-100" />
            </a>
            <a
              href="https://discord.com/users/503152077824851968"
              target="_blank"
            >
              <FaDiscord size="24px" className="opacity-60 hover:opacity-100"/>
              </a>
            <Link
              href="/rss.xml"
              target="_blank"
              className="flex items-center justify-center space-x-2 transition-colors hover:text-accent-foreground"
              title="RSS Feed"
            >
              <Rss size="24px" className="opacity-60 hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h5
            className={`mb-4 font-cera text-3xl md:text-2xl font-medium ${zenDots.className}`}
          >
            About Me
          </h5>
          <p className="mb-4 text-sm md:text-lg">
            I&apos;m a 20-year-old Full Stack + AI Engineer who builds
            production-ready AI systems and researches SLMs and Computer Vision.
            Currently, I&apos;m working at an AI-powered jewelry creation startup,
            building generative design pipelines and multi-modal AI workflows
            that transform creative concepts into 3D-ready assets. I work with
            OpenAI, Claude, and open-source models to create agentic workflows
            using LangChain and Vercel AI SDK. I&apos;ve contributed to 5+
            research projects and developed fine-tuning pipelines for both SLMs
            and LLMs.
          </p>
        </div>
      </div>
  
     <GitHubStreak />
    
    </div>
  );
};

export default Hero;
