import React from "react";

import { FaArrowRight } from "react-icons/fa6";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Projects = ({ category, title, description, techstacks, status, link }) => {
  return (
    <Card className="flex grow flex-col">
      <CardHeader>
        <>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">{category}</p>
            <Badge variant={status} className="ml-2">
              {status === 'active' ? 'Active' : 'Discontinued'}
            </Badge>
          </div>
          <h1 className="text-xl">{title}</h1>
        </>
      </CardHeader>
      <CardContent className="flex-1 pb-10">
        <p className="mb-4 text-sm">{description}</p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {techstacks.map((tech, index) => (
            <Badge
              key={index}
              className="flex justify-center whitespace-nowrap text-center"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-end justify-end">
        <a href={link} target="_blank">
          <Button>
            Learn More <FaArrowRight className="ml-2" size="14px" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default Projects;
