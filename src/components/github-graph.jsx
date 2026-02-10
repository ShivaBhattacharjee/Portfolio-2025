"use client";

import { Activity, ActivityCalendar } from "react-activity-calendar";
import { memo, useCallback, useEffect, useState } from "react";

import { useTheme } from "next-themes";



const DEFAULT_LIGHT_PALETTE = [
  "#ebedf0",
  "#d1d5db",
  "#9ca3af",
  "#6b7280",
  "#374151",
];

const DEFAULT_DARK_PALETTE = [
  "#1e1e2f",
  "#4a4a4a",
  "#737373",
  "#a3a3a3",
  "#e5e5e5",
];

/**
 * GitHub contribution graph component that displays user's contribution activity
 */
export const GithubGraph = memo(({
  username,
  blockMargin,
  lightColorPalette = DEFAULT_LIGHT_PALETTE,
  darkColorPalette = DEFAULT_DARK_PALETTE,
}) => {
  const [contribution, setContribution] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const contributions = await fetchContributionData(username);
      setContribution(contributions);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch contribution data");
      setContribution([]);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const labels = {
    totalCount: `{{count}} contributions in the last year`,
    legend: { less: "Less", more: "More" },
  };

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="github-graph-full-width relative w-full">
      {loading && (
        <div className="absolute inset-0 flex flex-col gap-4 p-2">
          <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700/60 animate-pulse" />
          <div className="flex flex-wrap gap-[2px]">
            {Array.from({ length: 371 }).map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-sm bg-gray-200 dark:bg-gray-700/60 animate-pulse"
                style={{ animationDelay: `${i % 20}ms` }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">Less</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-sm bg-gray-200 dark:bg-gray-700/60 animate-pulse"
                  style={{ animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">More</span>
          </div>
        </div>
      )}
      <ActivityCalendar
        data={contribution}
        maxLevel={4}
        blockMargin={blockMargin ?? 2}
        loading={loading}
        labels={labels}
        showTotalCount
        showColorLegend
        theme={{
          light: lightColorPalette,
          dark: darkColorPalette,
        }}
        colorScheme={theme === "dark" ? "dark" : "light"}
        style={{ width: "100%" }}
        className="w-full"
      />
    </div>
  );
});

GithubGraph.displayName = "GithubGraph";

/**
 * Fetches GitHub contribution data for a given username
 */
async function fetchContributionData(username) {
  try {
    const response = await fetch(`/api/github/contributions/${encodeURIComponent(username)}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseBody = await response.json()
    if (!responseBody.data) {
      throw new Error("No contribution data received")
    }

    return responseBody.data
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching GitHub contributions:", error.message)
    }
    return []
  }
}