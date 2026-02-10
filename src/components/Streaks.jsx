"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Calendar, Flame, Trophy, GitCommit, Github, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Press_Start_2P, Zen_Dots } from "next/font/google";

const pressStartFont = Press_Start_2P({ subsets: ["latin"], weight: "400" });
const zenDots = Zen_Dots({ subsets: ["latin"], weight: "400" });
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const cache = {
  data: {},
  set(key, value, ttl = 15 * 60 * 1000) {
    const item = { value, expiry: Date.now() + ttl };
    this.data[key] = item;
    try {
      const existing = localStorage.getItem("github-streak-cache");
      const parsed = existing ? JSON.parse(existing) : {};
      parsed[key] = item;
      localStorage.setItem("github-streak-cache", JSON.stringify(parsed));
    } catch {}
  },
  get(key) {
    const now = Date.now();
    if (this.data[key]?.expiry > now) return this.data[key].value;
    try {
      const cached = localStorage.getItem("github-streak-cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed[key]?.expiry > now) {
          this.data[key] = parsed[key];
          return parsed[key].value;
        }
      }
    } catch {}
    return null;
  },
}

async function fetchContributionData(username) {
  try {
    const response = await fetch(`/api/github/contributions/${encodeURIComponent(username)}`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const responseBody = await response.json()
    if (!responseBody.data) throw new Error("No contribution data received")
    return responseBody.data
  } catch (error) {
    if (error instanceof Error) console.error("Error fetching GitHub contributions:", error.message)
    return []
  }
}

function calculateStreaksFromContributions(contribution) {
  if (!contribution?.length) return { currentStreak: 0, longestStreak: 0, longestStreakThisYear: 0 }
  const dateToCount = new Map(contribution.map((c) => [c.date, c.count ?? 0]))
  const totalContributions = contribution.reduce((sum, c) => sum + (c.count ?? 0), 0)
  const sortedDates = contribution
    .filter((c) => (c.count ?? 0) > 0)
    .map((c) => c.date)
    .sort()

  const today = new Date().toISOString().split("T")[0]
  let currentStreak = 0
  let checkDate = today
  while ((dateToCount.get(checkDate) ?? 0) > 0) {
    currentStreak++
    const next = new Date(checkDate)
    next.setDate(next.getDate() - 1)
    checkDate = next.toISOString().split("T")[0]
  }

  let longestStreak = sortedDates.length ? 1 : 0
  let streak = 1
  for (let i = 1; i < sortedDates.length; i++) {
    const diff = (new Date(sortedDates[i]) - new Date(sortedDates[i - 1])) / 86400000
    streak = diff === 1 ? streak + 1 : 1
    longestStreak = Math.max(longestStreak, streak)
  }

  const currentYear = new Date().getFullYear()
  const thisYearDates = sortedDates.filter((d) => new Date(d).getFullYear() === currentYear)
  let longestStreakThisYear = thisYearDates.length ? 1 : 0
  streak = 1
  for (let i = 1; i < thisYearDates.length; i++) {
    const diff = (new Date(thisYearDates[i]) - new Date(thisYearDates[i - 1])) / 86400000
    streak = diff === 1 ? streak + 1 : 1
    longestStreakThisYear = Math.max(longestStreakThisYear, streak)
  }

  return {
    currentStreak,
    longestStreak,
    longestStreakThisYear,
    totalContributions,
    dateToCount,
  }
}

function buildLastWeekData(dateToCount) {
  const dailyCommits = Object.fromEntries(days.map((d) => [d, 0]))
  const now = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split("T")[0]
    const count = dateToCount.get(dateStr) ?? 0
    const dayIndex = (d.getDay() + 6) % 7
    dailyCommits[days[dayIndex]] += count
  }
  return days.map((day) => ({ day, commits: dailyCommits[day] }))
}

const Streaks = ({ initialUsername = "shivabhattacharjee", className = "" }) => {
  const [username, setUsername] = useState(initialUsername);
  const [inputUsername, setInputUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    longestStreakThisYear: 0,
    totalContributions: 0,
    lastWeekData: days.map((day) => ({ day, commits: 0 })),
    loading: true,
    lastUpdated: new Date(),
  });
  const [rateLimit, setRateLimit] = useState({ reset: null });

  const formatResetTime = (resetDate) => {
    if (!resetDate) return "Unknown"
    const diffMins = Math.round((resetDate - new Date()) / 60000)
    if (diffMins <= 0) return "Any moment now"
    if (diffMins === 1) return "1 minute"
    if (diffMins < 60) return `${diffMins} minutes`
    return `${Math.floor(diffMins / 60)}h ${diffMins % 60}m`
  }

  const fetchGitHubData = async (user) => {
    const cacheKey = `github-streak-${user}`
    const cachedData = cache.get(cacheKey)

    if (cachedData) {
      setStreakData({ ...cachedData, loading: false, lastUpdated: new Date(cachedData.timestamp) })
      return
    }

    try {
      setStreakData((prev) => ({ ...prev, loading: true }))

      const contribution = await fetchContributionData(user)
      if (!contribution.length) {
        throw new Error("No contribution data received")
      }

      const {
        currentStreak,
        longestStreak,
        longestStreakThisYear,
        totalContributions,
        dateToCount,
      } = calculateStreaksFromContributions(contribution)

      const lastWeekData = buildLastWeekData(dateToCount)

      const result = {
        currentStreak,
        longestStreak,
        longestStreakThisYear,
        totalContributions,
        lastWeekData,
        loading: false,
        timestamp: Date.now(),
        error: null,
        isSimulated: false,
      }

      cache.set(cacheKey, result)
      setStreakData({ ...result, lastUpdated: new Date() })
    } catch (error) {
      setStreakData({
        currentStreak: 0,
        longestStreak: 0,
        longestStreakThisYear: 0,
        totalContributions: 0,
        lastWeekData: days.map((day) => ({ day, commits: 0 })),
        loading: false,
        lastUpdated: new Date(),
        error: error instanceof Error ? error.message : "Failed to load contribution data",
        isRateLimitError: false,
      })
    }
  }

  useEffect(() => {
    fetchGitHubData(username)
  }, [username])

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
      fetchGitHubData(inputUsername.trim());
      setIsDialogOpen(false);
    }
  };

  return (
    <div
      className={`${pressStartFont.className} relative m-auto w-full max-w-6xl overflow-hidden border-4 border-black font-mono shadow-[8px_8px_0px_0px_rgba(128,128,128,0.8)] dark:border-white ${className}`}
    >
      <div className="absolute bottom-0 right-0 top-0 w-4 bg-black/20"></div>

      <div className="relative z-0 border-b-4 border-black dark:border-white p-4 text-black dark:text-white">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <h2 className="flex items-center font-black uppercase tracking-tight text-sm md:text-base">
            <Calendar size={24} className="mr-2" />
            <span className="text-black dark:text-white px-2 py-1 text-sm md:text-base">LAST 7 DAYS</span>
          </h2>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`h-8 ${zenDots.className} border-2 border-black dark:border-white w-full md:w-56 text-black dark:text-white`}
              >
                <Search size={14} className="mr-1" />
                <span className="truncate text-sm">@{username}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className={`border-4 border-black ${pressStartFont.className} dark:border-white text-black dark:text-white`}>
              <DialogHeader>
                <DialogTitle className="md:text-lg text-sm font-bold">CHECK GITHUB STATS</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300 text-sm">
                  Enter a GitHub username to view their streak stats.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUsernameSubmit} className="space-y-4 pt-4">
                <Input
                  type="text"
                  placeholder="GitHub username"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  className="border-2 border-black dark:border-white text-black dark:text-white text-sm md:text-base"
                />
                <DialogFooter>
                  <Button type="submit" className="border-2 border-black dark:border-white text-black dark:text-white">
                    VIEW STATS
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        {streakData.loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="animate-pulse font-mono font-bold text-black dark:text-white">LOADING DATA...</div>
          </div>
        ) : streakData.error ? (
          <div className="flex flex-col h-64 items-center justify-center p-4">
            <div className="p-4 text-center font-mono text-red-600 dark:text-red-400 max-w-md">
              <div className="mb-2 font-bold text-xl">ERROR</div>
              <div className="mb-4">{streakData.error}</div>
              {streakData.isRateLimitError && (
                <div className="text-yellow-600 dark:text-yellow-300 text-sm font-normal mt-2 mb-4">
                  Rate limit will reset in: {formatResetTime(rateLimit.reset)}
                </div>
              )}
              <Button
                onClick={() => fetchGitHubData(username)}
                className="mt-2 border-2 border-black dark:border-white text-black dark:text-white"
              >
                Retry
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              <div className="flex flex-col flex-wrap items-center border-2 border-black dark:border-white p-4">
                <div className="m-auto mb-1 flex text-xs md:text-sm items-center justify-center font-bold uppercase tracking-wide text-black dark:text-white">
                  <Flame size={18} className="mr-2 text-black dark:text-white" />
                  CURRENT
                </div>
                <span className="md:text-4xl text-2xl font-black text-black dark:text-white">
                  {streakData.currentStreak}
                </span>
                <div className="mt-1 px-2 text-xs md:text-sm text-gray-600 dark:text-gray-300">days</div>
              </div>

              <div className="flex flex-col flex-wrap items-center border-2 border-black dark:border-white p-4">
                <div className="mb-1 m-auto text-xs md:text-sm flex font-bold uppercase tracking-wide dark:text-white text-black">
                  <Trophy size={18} className="mr-2 dark:text-white text-black" />
                  LONGEST
                </div>
                <span className="md:text-4xl text-2xl font-black dark:text-white text-black">
                  {streakData.longestStreak}
                </span>
                <div className="mt-1 px-2 text-xs md:text-sm text-gray-600 dark:text-gray-300">days</div>
              </div>

              <div className="flex flex-col items-center border-2 border-black dark:border-white p-4">
                <div className="mb-1 m-auto text-xs md:text-sm flex font-bold uppercase tracking-wide dark:text-white text-black">
                  <GitCommit size={18} className="mr-2 dark:text-white text-black" />
                  TOTAL
                </div>
                <span className="md:text-4xl text-2xl font-black dark:text-white text-black">
                  {streakData.totalContributions}
                </span>
                <div className="mt-1 px-2 text-xs md:text-sm dark:text-white text-black">contributions</div>
              </div>
            </div>

            <div className="border-t-2 border-black dark:border-white p-4">
              <div className="h-64 w-full border-2 border-black dark:border-white p-2">
                <ResponsiveContainer>
                  <BarChart data={streakData.lastWeekData} margin={{ top: 25, right: 0, left: -40, bottom: -25 }}>
                    <XAxis
                      dataKey="day"
                      axisLine={{ stroke: "currentColor", strokeWidth: 1 }}
                      tick={{ fill: "currentColor", fontSize: 10, fontWeight: "bold" }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      className="text-black dark:text-white"
                    />
                    <YAxis
                      axisLine={{ stroke: "currentColor", strokeWidth: 1 }}
                      tick={{ fill: "currentColor", fontSize: 12, fontWeight: "bold" }}
                      domain={[0, "dataMax + 1"]}
                      className="text-black dark:text-white"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "black",
                        border: "2px solid rgb(255, 255, 255)",
                        borderRadius: 0,
                        fontWeight: "bold",
                        color: "rgb(255, 255, 255)",
                        boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.5)",
                      }}
                      labelStyle={{ color: "rgb(255, 255, 255)", fontWeight: "bold" }}
                    />
                    <Bar dataKey="commits" fill="#808080" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="border-t-4 border-black dark:border-white p-3 font-mono text-xs font-bold uppercase text-black dark:text-white">
        <div className="flex justify-between items-center">
          <div>LAST UPDATED: {streakData.lastUpdated.toLocaleString()}</div>
          <div className="flex items-center">
            {streakData.isSimulated && <span className="mr-2 text-yellow-600 dark:text-yellow-400">●</span>}
            <Github size={14} className="mr-1" />
            <span>STATS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streaks;