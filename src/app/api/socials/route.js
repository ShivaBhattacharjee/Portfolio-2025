import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [githubRes, twitterRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/shivabhattacharjee`, {
        next: { revalidate: 3600 },
      }).then((res) => res.json()),
      fetch(`https://api.fxtwitter.com/sh17va`, {
        next: { revalidate: 3600 },
      }).then((res) => res.json()),
    ]);

    const githubData = githubRes.status === "fulfilled" ? githubRes.value : {};
    const twitterData =
      twitterRes.status === "fulfilled" ? twitterRes.value?.user || {} : {};

    return NextResponse.json({
      github: {
        name: githubData.name || githubData.login || "Shiva Bhattacharjee",
        username: githubData.login || "shivabhattacharjee",
        avatar:
          githubData.avatar_url || "https://github.com/shivabhattacharjee.png",
        bio:
          githubData.bio ||
          "I work on AI, LLMs, and building developer tools on top of them",
        location: githubData.location || "Delhi, India",
        stats: [
          { label: "Repositories", value: githubData.public_repos || 60 },
          { label: "Followers", value: githubData.followers || 180 },
        ],
      },
      twitter: {
        name: twitterData.name || "Shiva",
        username: twitterData.screen_name || "sh17va",
        avatar:
          twitterData.avatar_url?.replace("_normal", "") ||
          "https://github.com/shivabhattacharjee.png",
        banner:
          twitterData.banner_url ||
          "https://pbs.twimg.com/profile_banners/1186556526917324800/1757151975/1500x500",
        bio: twitterData.description || "I write system prompts for a living",
        location: twitterData.location || "San Francisco, CA (Mentally)",
        stats: [
          { label: "Following", value: twitterData.following || 177 },
          { label: "Followers", value: twitterData.followers || 3620 },
        ],
      },
      linkedin: {
        name: "Shiva Bhattacharjee",
        username: "Building AI Agents",
        avatar:
          "https://pbs.twimg.com/profile_images/2081013051483152385/9e6q10_G_400x400.jpg",
        banner:
          "https://pbs.twimg.com/profile_banners/1186556526917324800/1757151975/1500x500",
        bio: "",
        location: "Guwahati, Assam, India",
        stats: [{ label: "connections", value: "500+" }],
      },
      discord: {
        name: "Shiva",
        username: "sh1xva",
        avatar: "https://github.com/shivabhattacharjee.png",
        bio: "My brain no longer brains",
        location: "Mental Hospital",
        stats: [],
      },
      email: {
        name: "Drop an Email",
        username: "hello@theshiva.xyz",
        avatar: "https://github.com/shivabhattacharjee.png",
        bio: "Whether you have a question, a project idea, or just want to say hi, feel free to reach out!",
        location: "Inbox",
        stats: [],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
