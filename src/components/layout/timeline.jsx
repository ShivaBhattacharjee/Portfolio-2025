import React from "react";

const Timeline = ({ role, company, year, responsibility, techstacks }) => {
  const technologies = techstacks.join(" • ");

  return (
    <ol className="relative border-s-2 border-primary">
      <li className="ms-6 p-5">
        <span className="absolute mt-1.5 -start-2 rounded-full w-3 h-3 bg-primary" />
        <div className="mb-4 space-y-1">
          <h2 className="text-xl font-bold font-cera">{role}</h2>
          <p className="text-sm">{company}</p>
          <p className="text-sm">{year}</p>
        </div>
        <div className="mb-4 space-y-1">
          <p className="font-semibold text-base mb-3">Key Responsibilities</p>
          <p>{responsibility}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-base mb-1">Technology Used:</p>
          <span className="text-sm">{technologies}</span>
        </div>
      </li>
    </ol>
  );
};

export default Timeline;
