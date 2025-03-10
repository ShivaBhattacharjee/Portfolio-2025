"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { FaUsers, FaRegStar } from "react-icons/fa6";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [profileDetails, setProfileDetails] = useState({ followers: 0, totalStars: 0 });

  useEffect(() => {
    setYear(new Date().getFullYear());

    const fetchProfileDetails = async () => {
      try {
        // First get basic profile info
        const { data: profileData } = await axios.get(
          "https://api.github.com/users/shivabhattacharjee",
        );
        
        // Then get all repositories to calculate total stars
        const { data: reposData } = await axios.get(
          "https://api.github.com/users/shivabhattacharjee/repos?per_page=100",
        );
        
        // Calculate total stars across all repositories
        const totalStars = reposData.reduce((total, repo) => total + repo.stargazers_count, 0);
        
        setProfileDetails({
          followers: profileData.followers,
          totalStars: totalStars,
        });
      } catch (error) {
        console.error("Error fetching GitHub profile details:", error);
        setProfileDetails({ followers: 0, totalStars: 0 });
      }
    };
    fetchProfileDetails();
  }, []);

  return (
    <footer className="container mb-6 flex w-full flex-col-reverse items-center justify-center gap-y-4 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col gap-y-1 text-center md:text-start">
        <span className="font-cera text-xs">&copy; {year} Shiva Bhattacharjee</span>
      </div>
    </footer>
  );
};

export default Footer;