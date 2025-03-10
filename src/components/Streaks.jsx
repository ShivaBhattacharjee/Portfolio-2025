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

// Set days in a consistent order for display
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Cache for storing GitHub data with expiration
const cache = {
  data: {},
  set: function(key, value, ttl = 15 * 60 * 1000) { // Default 15 minutes
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    this.data[key] = item;
    
    // Attempt to persist in localStorage
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

// Generate simulated data when GitHub API is not available
const generateSimulatedData = (username) => {
  // Create a deterministic but unique pattern for each username
  const seed = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate a pattern based on the seed
  const pattern = [];
  
  // Ensure we use the correct day order from our days array
  for (let i = 0; i < days.length; i++) {
    // Generate a number between 0 and 8 that's deterministic for this username
    const dayIndex = i;
    const commits = Math.floor(Math.abs(Math.sin(seed + dayIndex) * 8));
    pattern.push({ day: days[i], commits });
  }
  
  // Calculate current streak based on the pattern
  const currentStreak = pattern.filter(day => day.commits > 0).length;
  
  return {
    currentStreak: currentStreak,
    longestStreak: Math.min(14, currentStreak + Math.floor(seed % 7)),
    totalContributions: pattern.reduce((acc, day) => acc + day.commits, 0) * 7,
    lastWeekData: pattern,
    loading: false,
    lastUpdated: new Date(),
    isSimulated: true
  };
};

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
  const [rateLimit, setRateLimit] = useState({
    limit: 0,
    remaining: 0,
    reset: null,
    rateLimited: false
  });
  const [fetchAttempts, setFetchAttempts] = useState(0);

  // Helper function to create request headers with GitHub token from environment variable
  const getHeaders = () => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    // Use environment variable for token

      headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN }`;

    console.log("Using GitHub token for requests", process.env.NEXT_PUBLIC_GITHUB_TOKEN );
    return headers;
  };

  // Helper function to handle rate limit information
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

  // Format a date for display
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
    // Check cache first
    const cacheKey = `github-streak-${user}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      console.log("Using cached data for", user);
      setStreakData({
        ...cachedData,
        loading: false,
        lastUpdated: new Date(cachedData.timestamp)
      });
      return;
    }
    
    try {
      setStreakData((prev) => ({ ...prev, loading: true }));

      // Get user data
      const userResponse = await fetch(`https://api.github.com/users/${user}`, {
        headers: getHeaders()
      });
      
      // Process rate limit info
      processRateLimitInfo(userResponse);
      
      // Handle rate limiting
      if (userResponse.status === 403 && userResponse.headers.get('x-ratelimit-remaining') === '0') {
        console.log("Rate limited. Using simulated data.");
        const simulatedData = generateSimulatedData(user);
        
        // Cache the simulated data for 15 minutes
        cache.set(cacheKey, simulatedData);
        
        setStreakData({
          ...simulatedData,
          lastUpdated: new Date()
        });
        return;
      }
      
      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error("User not found");
        }
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }
      
      const userData = await userResponse.json();

      // Get repository data
      const reposResponse = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=100`,
        { headers: getHeaders() }
      );
      
      processRateLimitInfo(reposResponse);
      
      // Handle rate limiting for repos request
      if (!reposResponse.ok) {
        if (reposResponse.status === 403) {
          console.log("Rate limited on repos request. Using simulated data.");
          const simulatedData = generateSimulatedData(user);
          cache.set(cacheKey, simulatedData);
          setStreakData({
            ...simulatedData,
            lastUpdated: new Date()
          });
          return;
        }
        throw new Error(`Error fetching repositories: ${reposResponse.status}`);
      }
      
      const reposData = await reposResponse.json();
      const totalStars = reposData.reduce(
        (acc, repo) => acc + repo.stargazers_count,
        0
      );

      // Get events data
      const eventsResponse = await fetch(
        `https://api.github.com/users/${user}/events?per_page=100`,
        { headers: getHeaders() }
      );
      
      processRateLimitInfo(eventsResponse);
      
      // Handle rate limiting for events request
      if (!eventsResponse.ok) {
        if (eventsResponse.status === 403) {
          console.log("Rate limited on events request. Using simulated data.");
          const simulatedData = generateSimulatedData(user);
          cache.set(cacheKey, simulatedData);
          setStreakData({
            ...simulatedData,
            lastUpdated: new Date()
          });
          return;
        }
        throw new Error(`Error fetching events: ${eventsResponse.status}`);
      }
      
      const eventsData = await eventsResponse.json();

      // Calculate daily commits from events
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);

      // Initialize data for the last 7 days
      const dailyCommits = {};
      // Initialize all days to zero first
      days.forEach(day => {
        dailyCommits[day] = 0;
      });

      // Count push events in the last week
      eventsData.forEach((event) => {
        if (event.type === "PushEvent") {
          const eventDate = new Date(event.created_at);
          if (eventDate > lastWeek) {
            // Map day to our day array (0 = Monday in our array)
            let dayIndex = eventDate.getDay() - 1;
            if (dayIndex < 0) dayIndex = 6; // Sunday becomes index 6
            const dayString = days[dayIndex];
            
            dailyCommits[dayString] += event.payload.commits
              ? event.payload.commits.length
              : 1;
          }
        }
      });

      // Convert to array format for chart, ensuring correct day order
      const lastWeekData = days.map((day) => ({
        day,
        commits: dailyCommits[day] || 0,
      }));

      // Simple streak calculation (this is an approximation)
      const currentStreak = Math.min(
        7,
        Object.values(dailyCommits).filter((count) => count > 0).length
      );
      
      const result = {
        currentStreak: currentStreak,
        longestStreak: userData.public_repos > 20 ? 14 : 7, // Estimate based on activity level
        totalContributions: totalStars,
        lastWeekData: lastWeekData,
        loading: false,
        timestamp: new Date().getTime(),
        error: null,
        isSimulated: false
      };

      // Cache the result
      cache.set(cacheKey, result);
      
      setStreakData({
        ...result,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      
      // If we've already tried multiple times, use simulated data
      if (fetchAttempts > 1) {
        console.log("Multiple fetch attempts failed. Using simulated data.");
        const simulatedData = generateSimulatedData(user);
        
        // Cache the simulated data
        cache.set(cacheKey, simulatedData);
        
        setStreakData({
          ...simulatedData,
          lastUpdated: new Date()
        });
      } else {
        // Increment fetch attempts for this session
        setFetchAttempts(prev => prev + 1);
        
        // Check if it's a rate limit error
        const isRateLimitError = error.message.includes("rate limit");
        
        setStreakData({
          currentStreak: 0,
          longestStreak: 0,
          totalContributions: 0,
          lastWeekData: days.map((day) => ({ day, commits: 0 })),
          loading: false,
          lastUpdated: new Date(),
          error: error.message,
          isRateLimitError
        });
      }
    }
  };

  useEffect(() => {
    fetchGitHubData(username);
  }, [username]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
      setFetchAttempts(0); // Reset fetch attempts for new username
    }
  };

  const retryFetch = () => {
    fetchGitHubData(username);
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
                <span className="truncate">@{username}</span>
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
          <div className="flex flex-col h-64 items-center justify-center bg-[#1e2130] p-4">
            <div className="p-4 text-center font-mono text-red-500 max-w-md">
              <div className="mb-2 font-bold text-xl">ERROR</div>
              <div className="mb-4">{streakData.error}</div>
              
              {streakData.isRateLimitError && (
                <div className="text-yellow-300 text-sm font-normal mt-2 mb-4">
                  Rate limit will reset in: {formatResetTime(rateLimit.reset)}
                </div>
              )}
              
              <Button
                onClick={retryFetch}
                className="mt-2 border-2 border-white bg-[#ff5631] text-white hover:bg-[#ff3e00]"
              >
                Retry
              </Button>
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
                  className="w-100vw h-full"
                    data={streakData.lastWeekData}
                    margin={{ top: 20, right: 5, left: 5, bottom: 30 }}
                  >
                    <XAxis
                      dataKey="day"
                      axisLine={{ stroke: "#fff", strokeWidth: 1 }}
                      tick={{ fill: "#fff", fontSize: 10, fontWeight: "bold" }}
                      angle={-45}
                      textAnchor="end"
                      height={50}
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
        <div className="flex justify-between items-center">
          <div>LAST UPDATED: {streakData.lastUpdated.toLocaleString()}</div>
          <div className="flex items-center">
            {streakData.isSimulated && (
              <span className="mr-2 text-yellow-400">●</span>
            )}
            <Github size={14} className="mr-1" />
            <span>STATS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStreak;