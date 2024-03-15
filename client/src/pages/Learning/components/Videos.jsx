import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Videos = () => {
  const { role } = useAuth();
  const [videoUrls, setVideoUrls] = useState([]);
  const [processedVideos, setProcessedVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3939/api/learning/videos"
        );
        setVideoUrls(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching video URLs:", error);
      }
    };

    fetchVideoUrls();
  }, []);

  useEffect(() => {
    const processVideos = async () => {
      const processed = await Promise.all(
        videoUrls.map(async (videoUrl) => {
          const videoDetails = await fetchVideoDetails(videoUrl.url);
          return { ...videoUrl, ...videoDetails };
        })
      );
      setProcessedVideos(processed);
      console.log(processed);
    };

    if (videoUrls.length > 0) {
      processVideos();
    }
  }, [videoUrls]);

  const fetchVideoDetails = async (videoUrl) => {
    try {
      const isValidUrl = videoUrl.includes("youtube.com/watch");
      if (!isValidUrl) return;
      const videoId = videoUrl.split("v=")[1].split("&")[0];
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      const data = await response.json();
      return { thumbnailUrl: data.thumbnail_url, title: data.title };
    } catch (error) {
      console.error("Error fetching video details:", error);
      return null;
    }
  };

  const handleDeleteVideo = async (e) => {
    const id = e.currentTarget.dataset.videoId;
    const url = `http://localhost:3939/api/learning/video/${id}`;
    console.log(url);
    try {
      const response = await axios.delete(url);
      if (response.status === 200) {
        console.log("Video deleted successfully!");
        // Optionally, refetch videos after deletion for real-time updates
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value.toLowerCase());
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredVideos = processedVideos.filter(
    (processedVideo) =>
      processedVideo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory.toLowerCase() === "all" ||
        processedVideo.category.toLowerCase() ===
          selectedCategory.toLowerCase())
  );
  return (
    <div className="w-full h-full flex flex-col items-center  gap-4 overflow-y-auto px-4">
      <nav className=" w-full flex justify-between items-start p-4">
        <div className="join">
          <div>
            <div>
              <input
                className="input input-bordered join-item"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchTermChange} // Update search term on change
              />
            </div>
          </div>
          <select
            className="select select-bordered join-item"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="aptitude">Aptitude</option>
            <option value="soft">Soft</option>
            <option value="programming">Programming</option>
          </select>
        </div>
        <div className="">
          {role === "admin" ? (
            <Link to={"/video-form"}>
              <button className="btn btn-primary ">ADD VIDEO</button>
            </Link>
          ) : null}
        </div>
      </nav>
      <div className="w-full h-auto flex flex-wrap justify-around  px-10">
        {filteredVideos.length > 0 ? (
          <div className="w-full h-full flex flex-wrap justify-around items-center px-10">
            {filteredVideos
              .slice()
              .reverse()
              .map((processedVideo) => (
                <div
                  className="flex flex-col items-center m-4 p-4 gap-3 w-[400px] bg-base-300 rounded-md"
                  key={processedVideo.id}
                >
                  {processedVideo.thumbnailUrl ? (
                    <a href={processedVideo.url}>
                      <img
                        src={processedVideo.thumbnailUrl}
                        alt="Video Thumbnail"
                      />
                      <h3>{processedVideo.title}</h3>
                      <p>Category: {processedVideo.category}</p>
                    </a>
                  ) : (
                    <p>Error fetching video details</p>
                  )}
                  {/* Optionally, display other video details from processedVideo */}
                  <div className="flex gap-4">
                    {role === "admin" ? (
                      <button
                        onClick={handleDeleteVideo}
                        data-video-id={processedVideo.id}
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
};

export default Videos;
