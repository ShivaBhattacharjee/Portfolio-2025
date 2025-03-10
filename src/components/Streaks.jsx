import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Calendar,
  Flame,
  Trophy,
  GitCommit,
  Github,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const GitHubStreak = ({
  initialUsername = "shivabhattacharjee",
  className = "",
}) => {
  const [username, setUsername] = useState(initialUsername);
  const [inputUsername, setInputUsername] = useState("");
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalContributions: 0,
    lastWeekData: days.map((day) => ({ day, commits: 0 })),
    loading: true,
    lastUpdated: new Date(),
  });

  const fetchGitHubData = async (user) => {
    try {
      setStreakData((prev) => ({ ...prev, loading: true }));

      const userResponse = await fetch(`https://api.github.com/users/${user}`);
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const userData = await userResponse.json();

      const reposResponse = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=100`,
      );
      const reposData = await reposResponse.json();

      const totalStars = reposData.reduce(
        (acc, repo) => acc + repo.stargazers_count,
        0,
      );

      const eventsResponse = await fetch(
        `https://api.github.com/users/${user}/events?per_page=100`,
      );
      const eventsData = await eventsResponse.json();

      // Calculate daily commits from events
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);

      // Initialize data for the last 7 days
      const dailyCommits = {};
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dayString = days[date.getDay()];
        dailyCommits[dayString] = 0;
      }

      // Count push events in the last week
      eventsData.forEach((event) => {
        if (event.type === "PushEvent") {
          const eventDate = new Date(event.created_at);
          if (eventDate > lastWeek) {
            const dayString = days[eventDate.getDay()];
            dailyCommits[dayString] += event.payload.commits
              ? event.payload.commits.length
              : 1;
          }
        }
      });

      // Convert to array format for chart
      const lastWeekData = Object.keys(dailyCommits).map((day) => ({
        day,
        commits: dailyCommits[day],
      }));

      // Simple streak calculation (this is an approximation)
      // For accurate streaks, you'd need contribution data which requires more complex API usage
      const currentStreak = Math.min(
        7,
        Object.values(dailyCommits).filter((count) => count > 0).length,
      );

      setStreakData({
        currentStreak: currentStreak,
        longestStreak: userData.public_repos > 20 ? 14 : 7, // Estimate based on activity level
        totalContributions: totalStars || userData.public_repos || 0,
        lastWeekData: lastWeekData,
        loading: false,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Error fetching GitHub data:", error);

      // Reset on error
      setStreakData({
        currentStreak: 0,
        longestStreak: 0,
        totalContributions: 0,
        lastWeekData: days.map((day) => ({ day, commits: 0 })),
        loading: false,
        lastUpdated: new Date(),
        error: error.message,
      });
    }
  };

  useEffect(() => {
    fetchGitHubData(username);
  }, [username]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
    }
  };

  return (
    <div
      className={`relative m-auto w-full max-w-3xl overflow-hidden border-4 border-black bg-[#1e2130] font-mono shadow-[8px_8px_0px_0px_rgba(255,86,49,0.8)] dark:border-white ${className}`}
    >
      {/* Neo-Brutalist accent - right side orange border */}
      <div className="absolute bottom-0 right-0 top-0 w-4 bg-black/20"></div>

      {/* Header */}
      <div className="relative z-0 border-b-4 border-white bg-[#1e2130] p-4 text-white">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <h2 className="flex items-center text-xl font-black uppercase tracking-tight">
            <Calendar size={24} className="mr-2" />
            <span className="bg-[#ff3e00] px-2 py-1">LAST 7 DAYS</span>
          </h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-2 border-white bg-[#2a2e43] w-full md:w-52 text-white"
              >
                <Search size={14} className="mr-1" />
                <span>@{username}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="border-4 border-white bg-[#1e2130] text-white">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">
                  CHECK GITHUB STATS
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Enter a GitHub username to view their streak stats.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUsernameSubmit} className="space-y-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="GitHub username"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    className="border-2 border-white bg-[#2a2e43] text-white"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="border-2 border-white bg-[#ff5631] text-white hover:bg-[#ff3e00]"
                    >
                      VIEW STATS
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="p-0">
        {streakData.loading ? (
          <div className="flex h-64 items-center justify-center bg-[#1e2130]">
            <div className="animate-pulse font-mono font-bold text-white">
              LOADING DATA...
            </div>
          </div>
        ) : streakData.error ? (
          <div className="flex h-64 items-center justify-center bg-[#1e2130]">
            <div className="p-4 text-center font-mono text-red-500">
              <div className="mb-2 font-bold">ERROR</div>
              <div>{streakData.error}</div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-[#1e2130] p-4">
              <div className="flex flex-col flex-wrap items-center border-2 border-white bg-[#171923] p-4">
                <div className="m-auto mb-1 flex text-sm font-bold uppercase tracking-wide text-white">
                  <Flame size={18} className="mr-2 text-[#ff5631]" />
                  CURRENT
                </div>
                <div className="flex items-center">
                  <span className="text-4xl font-black text-white">
                    {streakData.currentStreak}
                  </span>
                </div>
                <div className="mt-1 bg-[#ff5631] px-2 text-xs text-white">
                  days
                </div>
              </div>

              <div className="flex flex-col items-center border-2 border-white bg-[#171923] p-4">
                <div className="mb-1 flex text-sm font-bold uppercase tracking-wide text-white">
                  <Trophy size={18} className="mr-2 text-yellow-500" />
                  LONGEST
                </div>
                <div className="flex items-center">
                  <span className="text-4xl font-black text-white">
                    {streakData.longestStreak}
                  </span>
                </div>
                <div className="mt-1 bg-yellow-500 px-2 text-xs text-black">
                  days
                </div>
              </div>

              <div className="flex flex-col items-center border-2 border-white bg-[#171923] p-4">
                <div className="mb-1 flex text-sm font-bold uppercase tracking-wide text-white">
                  {" "}
                  <GitCommit size={18} className="mr-2 text-blue-400" />
                  TOTAL
                </div>
                <div className="flex items-center">
                  <span className="text-4xl font-black text-white">
                    {streakData.totalContributions}
                  </span>
                </div>
                <div className="mt-1 bg-blue-400 px-2 text-xs text-white">
                  stars
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="border-t-2 border-white bg-[#1e2130] p-4">
              <div className="h-64 w-full border-2 border-white bg-[#171923] p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={streakData.lastWeekData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <XAxis
                      dataKey="day"
                      axisLine={{ stroke: "#fff", strokeWidth: 1 }}
                      tick={{ fill: "#fff", fontSize: 12, fontWeight: "bold" }}
                    />
                    <YAxis
                      axisLine={{ stroke: "#fff", strokeWidth: 1 }}
                      tick={{ fill: "#fff", fontSize: 12, fontWeight: "bold" }}
                      domain={[0, "dataMax + 1"]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#171923",
                        border: "2px solid #fff",
                        borderRadius: 0,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="commits"
                      fill="#ff5631"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t-4 border-white bg-[#171923] p-3 font-mono text-xs font-bold uppercase text-white">
        LAST UPDATED: {streakData.lastUpdated.toLocaleString()}
      </div>
    </div>
  );
};

export default GitHubStreak;
