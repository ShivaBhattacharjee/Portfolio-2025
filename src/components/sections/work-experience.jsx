"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  BriefcaseBusiness,
  Code2,
  Cpu,
  Rocket,
  Infinity as InfinityIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { TechBadge } from "@/lib/tech-icons";
import { ChevronsUpDownIcon } from "@/components/icons/chevrons-up-down";

// ---------- helpers ----------

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// Parse "Feb 2024" / "Sept 2024" / "2024" into a Date. Returns null for "Present".
function parsePeriodDate(str) {
  if (!str) return null;
  const trimmed = str.trim();
  if (/present|now/i.test(trimmed)) return null;

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    const year = parseInt(parts[0], 10);
    return Number.isNaN(year) ? null : new Date(year, 0, 1);
  }

  const [monthRaw, yearRaw] = parts;
  const month = MONTHS[monthRaw.slice(0, 3).toLowerCase()];
  const year = parseInt(yearRaw, 10);
  if (month === undefined || Number.isNaN(year)) return null;
  return new Date(year, month, 1);
}

// "Feb 2024 - Sept 2024" -> { start, end, isOngoing }
function parseYearRange(year) {
  const [startStr, endStr] = (year || "").split(/\s*[-–—]\s*/);
  const isOngoing = !endStr || /present|now/i.test(endStr);
  return { startStr: startStr?.trim(), endStr: endStr?.trim(), isOngoing };
}

function formatDuration(year) {
  const { startStr, endStr } = parseYearRange(year);
  const start = parsePeriodDate(startStr);
  const end = parsePeriodDate(endStr) ?? new Date();
  if (!start) return "";

  // +1 to count both start and end months inclusively.
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  if (totalMonths <= 0) return "";
  if (totalMonths < 12) return `${totalMonths}m`;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return months === 0 ? `${years}y` : `${years}y ${months}m`;
}

// Pick an icon from the role/type so each position feels distinct.
function resolveIcon(role = "", type = "") {
  const text = `${role} ${type}`.toLowerCase();
  if (/founder|founding/.test(text)) return Rocket;
  if (/ai|ml|engineer|applied/.test(text)) return Cpu;
  if (/developer|dev|software/.test(text)) return Code2;
  return BriefcaseBusiness;
}

// Render a segmented responsibility (array of { text, bold }) or plain string.
function ResponsibilitySegments({ bullet }) {
  if (Array.isArray(bullet)) {
    return bullet.map((seg, j) =>
      seg.bold ? (
        <strong key={j} className="font-semibold text-foreground">
          {seg.text}
        </strong>
      ) : (
        <span key={j}>{seg.text}</span>
      )
    );
  }
  return bullet;
}

// ---------- components ----------

export function WorkExperience({ className, experiences }) {
  return (
    <div className={cn("w-full min-w-0 text-foreground", className)}>
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={experience.company ?? index}
          experience={experience}
          index={index}
        />
      ))}
    </div>
  );
}

function ExperienceItem({ experience, index = 0 }) {
  const {
    company,
    website,
    logo,
    logoPadding,
    invertLogo,
    isCurrentEmployer,
    year,
  } = experience;

  const isCurrent =
    isCurrentEmployer ?? parseYearRange(year).isOngoing;

  return (
    <motion.div
      className="w-full min-w-0 space-y-4 px-2 py-4 md:px-0"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/[0.08] bg-black/[0.03] dark:border-white/[0.08] dark:bg-white/[0.05]">
          {logo ? (
            <Image
              src={logo}
              alt={`${company} logo`}
              width={32}
              height={32}
              className={cn(
                "h-full w-full object-contain",
                logoPadding && "p-1.5",
                invertLogo && "dark:invert"
              )}
            />
          ) : (
            <span className="text-[10px] font-bold text-muted-foreground">
              {company?.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold leading-snug">
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {company}
            </a>
          ) : (
            company
          )}
        </h3>

        {isCurrent && (
          <span
            className="relative flex items-center justify-center"
            aria-label="Current Employer"
          >
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-black opacity-50 dark:bg-white" />
            <span className="relative inline-flex size-2 rounded-full bg-black dark:bg-white" />
          </span>
        )}
      </div>

      <div className="relative min-w-0 space-y-4 before:absolute before:left-3 before:top-1 before:h-[calc(100%-0.5rem)] before:w-px before:bg-black/[0.1] dark:before:bg-white/[0.1]">
        <ExperiencePositionItem experience={experience} />
      </div>
    </motion.div>
  );
}

function ExperiencePositionItem({ experience }) {
  const {
    role,
    type,
    location,
    year,
    responsibility = [],
    techstacks = [],
    isExpanded,
  } = experience;

  const [open, setOpen] = useState(
    isExpanded ?? parseYearRange(year).isOngoing
  );
  const hasDescription = responsibility.length > 0;

  const { startStr, endStr, isOngoing } = parseYearRange(year);
  const duration = formatDuration(year);
  const Icon = resolveIcon(role, type);

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        onClick={() => hasDescription && setOpen((v) => !v)}
        disabled={!hasDescription}
        className={cn(
          "group block w-full min-w-0 select-none text-left",
          "relative rounded-lg transition-colors",
          hasDescription && "hover:bg-black/[0.02] dark:hover:bg-white/[0.03]",
          !hasDescription && "cursor-default"
        )}
      >
        <div className="relative z-[1] mb-1 flex items-start gap-3 text-base">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-black/[0.03] text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.06] [&_svg]:size-3.5">
            <Icon />
          </div>

          <h4 className="min-w-0 flex-1 font-medium text-balance text-foreground">
            {role}
          </h4>

          {hasDescription && (
            <div className="shrink-0 text-muted-foreground [&_svg]:h-5 [&_svg]:w-4">
              <ChevronsUpDownIcon open={open} />
            </div>
          )}
        </div>

        <dl className="relative z-[1] flex flex-wrap items-center gap-2 pl-9 font-space-mono text-xs text-muted-foreground md:text-sm">
          {type && (
            <>
              <div>
                <dt className="sr-only">Employment Type</dt>
                <dd>{type}</dd>
              </div>
              <Dot />
            </>
          )}

          <div>
            <dt className="sr-only">Employment Period</dt>
            <dd className="flex items-center gap-1 tabular-nums">
              <span>{startStr}</span>
              <span className="font-mono">—</span>
              {isOngoing ? (
                <InfinityIcon
                  className="size-4 translate-y-[0.5px]"
                  aria-label="Present"
                />
              ) : (
                <span>{endStr}</span>
              )}
            </dd>
          </div>

          {duration && (
            <>
              <Dot />
              <div>
                <dt className="sr-only">Duration</dt>
                <dd className="tabular-nums">{duration}</dd>
              </div>
            </>
          )}

          {location && (
            <>
              <Dot />
              <div>
                <dt className="sr-only">Location</dt>
                <dd>{location}</dd>
              </div>
            </>
          )}
        </dl>
      </button>

      <AnimatePresence initial={false}>
        {open && hasDescription && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-w-0 overflow-hidden"
          >
            <ul className="w-full min-w-0 list-disc space-y-1.5 pt-2 pl-[3.25rem] font-space-mono text-xs leading-relaxed text-muted-foreground marker:text-muted-foreground/40 md:space-y-2 md:text-sm">
              {responsibility.map((bullet, i) => (
                <li key={i} className="break-words [overflow-wrap:anywhere]">
                  <ResponsibilitySegments bullet={bullet} />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {techstacks.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-3 pl-9">
          {techstacks.map((tech, i) => (
            <TechBadge key={i} name={tech} />
          ))}
        </div>
      )}
    </div>
  );
}

function Dot() {
  return (
    <span className="inline-block size-1 shrink-0 rounded-full bg-muted-foreground/40" />
  );
}

export default WorkExperience;
