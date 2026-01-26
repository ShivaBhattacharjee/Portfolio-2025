import React, { useState, useEffect, useRef } from "react";
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
import { Press_Start_2P, Zen_Dots } from "next/font/google";

const pressStartFont = Press_Start_2P({ subsets: ["latin"], weight: "400" });
const zenDots = Zen_Dots({ subsets: ["latin"], weight: "400" });
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


const cache = {
  data: {},
  set: function(key, value, ttl = 15 * 60 * 1000) { 
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    this.data[key] = item;
    

    try {
      const storageKey = 'github-streak-cache';
      const existingCache = localStorage.getItem(storageKey);
      const parsedCache = existingCache ? JSON.parse(existingCache) : {};
      parsedCache[key] = item;
      localStorage.setItem(storageKey, JSON.stringify(parsedCache));
    } catch (e) {
      console.log("Could not store in localStorage", e);
    }
  },
  get: function(key) {
    const now = new Date();
    
    // First check memory cache
    if (this.data[key] && this.data[key].expiry > now.getTime()) {
      return this.data[key].value;
    }
    
    // Then check localStorage
    try {
      const cached = localStorage.getItem('github-streak-cache');
      if (cached) {
        const parsedCache = JSON.parse(cached);
        if (parsedCache[key] && parsedCache[key].expiry > now.getTime()) {
          // Restore to memory cache and return
          this.data[key] = parsedCache[key];
          return parsedCache[key].value;
        }
      }
    } catch (e) {
      console.log("Error reading from localStorage", e);
    }
    
    return null;
  }
};



const Streaks = ({
  initialUsername = "shivabhattacharjee",
  className = "",
}) => {
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
  const [rateLimit, setRateLimit] = useState({
    limit: 0,
    remaining: 0,
    reset: null,
    rateLimited: false
  });
  const [fetchAttempts, setFetchAttempts] = useState(0);


  const getHeaders = () => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json'
    };

    headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    return headers;
  };


  const processRateLimitInfo = (response) => {
    if (response.headers) {
      const limit = response.headers.get('x-ratelimit-limit');
      const remaining = response.headers.get('x-ratelimit-remaining');
      const reset = response.headers.get('x-ratelimit-reset');
      
      if (limit && remaining && reset) {
        setRateLimit({
          limit: parseInt(limit),
          remaining: parseInt(remaining),
          reset: new Date(parseInt(reset) * 1000),
          rateLimited: parseInt(remaining) === 0
        });
      }
    }
  };


  const formatResetTime = (resetDate) => {
    if (!resetDate) return 'Unknown';
    
    const now = new Date();
    const diffMs = resetDate - now;
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins <= 0) return 'Any moment now';
    if (diffMins === 1) return '1 minute';
    if (diffMins < 60) return `${diffMins} minutes`;
    
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  const fetchGitHubData = async (user) => {

    const cacheKey = `github-streak-${user}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      setStreakData({
        ...cachedData,
        loading: false,
        lastUpdated: new Date(cachedData.timestamp)
      });
      return;
    }
    
    try {
      setStreakData((prev) => ({ ...prev, loading: true }));


      const userResponse = await fetch(`https://api.github.com/users/${user}`, {
        headers: getHeaders()
      });
      

      processRateLimitInfo(userResponse);
      
      
      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error("User not found");
        }
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }
      
      const userData = await userResponse.json();


      // Fetch all repositories with pagination
      const getAllRepos = async (username) => {
        let allRepos = [];
        let page = 1;
        const perPage = 100; // Maximum allowed per page
        
        while (true) {
          const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`,
            { headers: getHeaders() }
          );
          
          processRateLimitInfo(reposResponse);
          
          if (!reposResponse.ok) {
            throw new Error(`GitHub API error: ${reposResponse.status}`);
          }
          
          const reposData = await reposResponse.json();
          
          if (reposData.length === 0) {
            break; // No more repositories
          }
          
          allRepos = allRepos.concat(reposData);
          
          // If we got less than perPage, we've reached the end
          if (reposData.length < perPage) {
            break;
          }
          
          page++;
        }
        
        return allRepos;
      };

      const allRepos = await getAllRepos(user);
      const totalStars = allRepos.reduce(
        (acc, repo) => acc + repo.stargazers_count,
        0
      );


      // Calculate proper streaks from events data
      const calculateStreaks = (events) => {
        const currentYear = new Date().getFullYear();
        const commitDates = new Set();
        
        console.log(`Total events received: ${events.length}`);
        
        // Extract all commit dates
        events.forEach((event) => {
          if (event.type === "PushEvent") {
            const eventDate = new Date(event.created_at);
            const dateString = eventDate.toISOString().split('T')[0]; // YYYY-MM-DD format
            commitDates.add(dateString);
          }
        });
        
        console.log(`Unique commit dates: ${commitDates.size}`);
        console.log(`Commit dates:`, Array.from(commitDates).sort());
        
        // Convert to sorted array of dates
        const sortedDates = Array.from(commitDates).sort();
        
        if (sortedDates.length === 0) {
          console.log('No commit dates found, returning zeros');
          return { currentStreak: 0, longestStreak: 0, longestStreakThisYear: 0 };
        }
        
        // Calculate current streak (from today backwards)
        let currentStreak = 0;
        const today = new Date();
        let checkDate = new Date(today);
        
        while (true) {
          const checkDateString = checkDate.toISOString().split('T')[0];
          if (commitDates.has(checkDateString)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }
        
        console.log(`Current streak: ${currentStreak}`);
        
        // Calculate longest streak overall
        let longestStreak = 0;
        let currentStreakCount = 1;
        
        for (let i = 1; i < sortedDates.length; i++) {
          const prevDate = new Date(sortedDates[i - 1]);
          const currDate = new Date(sortedDates[i]);
          const dayDiff = (currDate - prevDate) / (1000 * 60 * 60 * 24);
          
          if (dayDiff === 1) {
            currentStreakCount++;
          } else {
            longestStreak = Math.max(longestStreak, currentStreakCount);
            currentStreakCount = 1;
          }
        }
        longestStreak = Math.max(longestStreak, currentStreakCount);
        
        console.log(`Longest streak overall: ${longestStreak}`);
        
        // Calculate longest streak this year
        const thisYearDates = sortedDates.filter(date => {
          return new Date(date).getFullYear() === currentYear;
        });
        
        console.log(`This year dates (${currentYear}):`, thisYearDates);
        
        let longestStreakThisYear = 0;
        let currentStreakThisYear = 1;
        
        if (thisYearDates.length > 0) {
          for (let i = 1; i < thisYearDates.length; i++) {
            const prevDate = new Date(thisYearDates[i - 1]);
            const currDate = new Date(thisYearDates[i]);
            const dayDiff = (currDate - prevDate) / (1000 * 60 * 60 * 24);
            
            if (dayDiff === 1) {
              currentStreakThisYear++;
            } else {
              longestStreakThisYear = Math.max(longestStreakThisYear, currentStreakThisYear);
              currentStreakThisYear = 1;
            }
          }
          longestStreakThisYear = Math.max(longestStreakThisYear, currentStreakThisYear);
        }
        
        console.log(`Longest streak this year: ${longestStreakThisYear}`);
        
        return { currentStreak, longestStreak, longestStreakThisYear };
      };

      const eventsResponse = await fetch(
        `https://api.github.com/users/${user}/events/public?per_page=100`,
        { headers: getHeaders() }
      );
      
      processRateLimitInfo(eventsResponse);

      const eventsData = await eventsResponse.json();

      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);

      const dailyCommits = {};
      days.forEach(day => {
        dailyCommits[day] = 0;
      });


      eventsData.forEach((event) => {
        if (event.type === "PushEvent") {
          const eventDate = new Date(event.created_at);
          if (eventDate > lastWeek) {
            let dayIndex = eventDate.getDay() - 1;
            if (dayIndex < 0) dayIndex = 6; 
            const dayString = days[dayIndex];
            
            dailyCommits[dayString] += event.payload.commits
              ? event.payload.commits.length
              : 1;
          }
        }
      });


      const lastWeekData = days.map((day) => ({
        day,
        commits: dailyCommits[day] || 0,
      }));

      // Calculate proper streaks
      const streaks = calculateStreaks(eventsData);
      
      const result = {
        currentStreak: streaks.currentStreak,
        longestStreak: streaks.longestStreak,
        longestStreakThisYear: streaks.longestStreakThisYear,
        totalContributions: totalStars,
        lastWeekData: lastWeekData,
        loading: false,
        timestamp: new Date().getTime(),
        error: null,
        isSimulated: false
      };


      cache.set(cacheKey, result);
      
      setStreakData({
        ...result,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      

        setFetchAttempts(prev => prev + 1);
        const isRateLimitError = error.message.includes("rate limit");
        
        setStreakData({
          currentStreak: 0,
          longestStreak: 0,
          longestStreakThisYear: 0,
          totalContributions: 0,
          lastWeekData: days.map((day) => ({ day, commits: 0 })),
          loading: false,
          lastUpdated: new Date(),
          error: error.message,
          isRateLimitError
        });
    }
  };

  useEffect(() => {
    fetchGitHubData(username);
  }, []);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
      setFetchAttempts(0); 
      fetchGitHubData(inputUsername.trim());
      setIsDialogOpen(false); 
    }
  };

  const retryFetch = () => {
    fetchGitHubData(username);
  };

  return (
    <div
      className={`${pressStartFont.className} relative m-auto w-full max-w-6xl overflow-hidden border-4 border-black font-mono shadow-[8px_8px_0px_0px_rgba(128,128,128,0.8)] dark:border-white ${className}`}
    >
      <div className="absolute bottom-0 right-0 top-0 w-4 bg-black/20"></div>

      {/* Header */}
      <div className="relative z-0 border-b-4 border-black dark:border-white  p-4 text-black dark:text-white">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <h2 className="flex items-center font-black uppercase tracking-tight text-sm md:text-base">
            <Calendar size={24} className="mr-2" />
            <span className=" text-black dark:text-white px-2 py-1 text-sm md:text-base">LAST 7 DAYS</span>
          </h2>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`h-8 ${zenDots.className} border-2 border-black dark:border-white w-full md:w-56 text-black dark:text-white`}
                onClick={() => setIsDialogOpen(true)}
              >
                <Search size={14} className="mr-1" />
                <span className="truncate text-sm">@{username}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className={`border-4 border-black ${pressStartFont.className} dark:border-white  text-black dark:text-white`}>
              <DialogHeader>
                <DialogTitle className="md:text-lg text-sm font-bold">
                  CHECK GITHUB STATS
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300 text-sm">
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
                    className="border-2 border-black dark:border-white  text-black dark:text-white text-sm md:text-base"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="border-2 border-black dark:border-white text-black dark:text-white"
                  >
                    VIEW STATS
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div >
        {streakData.loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="animate-pulse font-mono font-bold text-black dark:text-white">
              LOADING DATA...
            </div>
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
                onClick={retryFetch}
                className="mt-2 border-2 border-black dark:border-white text-black dark:text-white"
              >
                Retry
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              <div className="flex flex-col flex-wrap items-center border-2 border-black dark:border-white  0 p-4">
                <div className="m-auto mb-1 flex text-xs md:text-sm  items-center justify-center font-bold uppercase tracking-wide text-black dark:text-white">
                  <Flame size={18} className="mr-2 text-black dark:text-white" />
                  CURRENT
                </div>
                <div className="flex items-center">
                  <span className="md:text-4xl text-2xl font-black text-black dark:text-white">
                    {streakData.currentStreak}
                  </span>
                </div>
                <div className="mt-1 px-2 text-xs md:text-sm text-gray-600 dark:text-gray-300">
                  days
                </div>
              </div>

              <div className="flex flex-col flex-wrap items-center border-2 border-black dark:border-white p-4">
                <div className="mb-1 m-auto text-xs md:text-sm flex font-bold uppercase tracking-wide dark:text-white text-black">
                  <Trophy size={18} className="mr-2 dark:text-white text-black" />
                  LONGEST
                </div>
                <div className="flex items-center">
                  <span className="md:text-4xl text-2xl font-black dark:text-white text-black">
                    {streakData.longestStreak}
                  </span>
                </div>
                <div className="mt-1 px-2 text-xs md:text-sm text-white">
                  days
                </div>
              </div>

              <div className="flex flex-col items-center border-2 border-black dark:border-white  p-4">
                <div className="mb-1 m-auto text-xs md:text-sm flex font-bold uppercase tracking-wide dark:text-white text-black">
                  <GitCommit size={18} className="mr-2 dark:text-white text-black" />
                  TOTAL
                </div>
                <div className="flex items-center">
                  <span className="md:text-4xl text-2xl font-black dark:text-white text-black">
                    {streakData.totalContributions}
                  </span>
                </div>
                <div className="mt-1 px-2 text-xs md:text-sm dark:text-white text-black">
                  stars
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="border-t-2 border-black dark:border-white p-4">
              <div className="h-64 w-full border-2 border-black dark:border-white  p-2">
                <ResponsiveContainer>
                  <BarChart
                    className="h-full"
                    data={streakData.lastWeekData}
                    margin={{ top: 25, right: 0, left: -40, bottom: -25 }}
                  >
                    <XAxis
                      dataKey="day"
                      axisLine={{ stroke: "currentColor", strokeWidth: 1 }}
                      tick={{ fill: "currentColor", fontSize: 10, fontWeight: "bold" , textSize: "xs md:text-sm" }}
                      angle={-45}
                      fontSize={10}
                      textAnchor="end"
                      height={60}
                      className="text-black dark:text-white"
                    />
                    <YAxis
                      axisLine={{ stroke: "currentColor", strokeWidth: 1 }}
                      tick={{ fill: "currentColor", fontSize: 12, fontWeight: "bold" , textSize: "xs md:text-sm" }}
                      fontSize={12}
                      domain={[0, "dataMax + 1"]}
                      className="text-black dark:text-white"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "black", // dark gray background
                        border: "2px solid rgb(255, 255, 255)",
                        borderRadius: 0,
                        fontWeight: "bold",
                        color: "rgb(255, 255, 255)",
                        boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.5)",
                      }}
                      labelStyle={{
                        color: "rgb(255, 255, 255)",
                        fontWeight: "bold",
                      }}
                    />
                    <Bar
                      dataKey="commits"
                      fill="#808080"
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
      <div className="border-t-4 border-black dark:border-white  p-3 font-mono text-xs font-bold uppercase text-black dark:text-white">
        <div className="flex justify-between items-center">
          <div>LAST UPDATED: {streakData.lastUpdated.toLocaleString()}</div>
          <div className="flex items-center">
            {streakData.isSimulated && (
              <span className="mr-2 text-yellow-600 dark:text-yellow-400">●</span>
            )}
            <Github size={14} className="mr-1" />
            <span>STATS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streaks;