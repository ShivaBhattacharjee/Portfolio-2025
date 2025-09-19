"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaArrowRight, FaCalendar, FaBook } from "react-icons/fa6";
import { useState } from "react";

const TruncatedTitle = ({ title, maxLength = 60 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTruncated = title.length > maxLength;
  const displayTitle = isExpanded ? title : title.slice(0, maxLength) + (isTruncated ? "..." : "");

  if (!isTruncated) {
    return <h2 className="text-xl font-bold">{title}</h2>;
  }

  return (
    <>
      <div className="hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="text-xl font-bold cursor-help">
              {title.slice(0, maxLength)}...
            </h2>
          </TooltipTrigger>
          <TooltipContent className="max-w-md dark:bg-black bg-white">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="md:hidden">
        <h2 
          className="text-xl font-bold cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {displayTitle}
          {isTruncated && (
            <span className="text-sm text-muted-foreground ml-2">
              {isExpanded ? "(click to collapse)" : "(click to expand)"}
            </span>
          )}
        </h2>
      </div>
    </>
  );
};

const ExpandableAbstract = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground">Abstract</h3>
      

      <div className="hidden md:block">
        <p className="text-base leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="md:hidden">
        <div className="space-y-2">
          {isExpanded ? (
            <p className="text-base leading-relaxed">
              {description}
            </p>
          ) : (
            <p className="text-base leading-relaxed">
              {description.slice(0, 120)}...
            </p>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ResearchList = ({ research }) => {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {research.map((item, index) => (
          <div
            key={index}
            className="border-b border-border pb-6 last:border-b-0"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2">
                    <TruncatedTitle title={item.title} />
                    <Badge 
                      variant={item.status === 'under-review' ? 'under-review' : item.status} 
                      className="w-fit"
                    >
                      {item.status === 'under-review' ? 'Under Review' : 
                       item.status === 'active' ? 'Active' : 'Discontinued'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {item.category}
                  </p>
                </div>
                
                <ExpandableAbstract description={item.description} />
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FaBook size={12} />
                    <span>{item.journal}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendar size={12} />
                    <span>{item.year}</span>
                  </div>
                  {item.collaboration && (
                    <div className="flex items-center gap-1">
                      <span>•</span>
                      <span>{item.collaboration}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {item.techstacks.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                {item.status === 'under-review' ? (
                  <>
                    {/* Desktop: Button with tooltip */}
                    <div className="hidden md:block">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Button 
                              size="sm" 
                              disabled 
                              className="cursor-not-allowed opacity-50"
                            >
                              View Research <FaArrowRight className="ml-2" size="12px" />
                            </Button>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Research is being reviewed by journal</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    
                    {/* Mobile: Button with descriptive text */}
                    <div className="md:hidden">
                      <Button 
                        size="sm" 
                        disabled 
                        className="cursor-not-allowed opacity-50"
                      >
                        Under Review <FaArrowRight className="ml-2" size="12px" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <Button size="sm">
                      View Research <FaArrowRight className="ml-2" size="12px" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default ResearchList;