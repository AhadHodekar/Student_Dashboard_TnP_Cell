import React, { useState } from "react";

const YoutubeThumbnailPreview = () => {
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [url, setUrl] = useState("");

  const fetchVideoDetails = async (searchUrl) => {
    try {
      const videoUrl = searchUrl || url; // Use provided searchUrl or existing url

      // Validate the input as a YouTube URL
      const isValidUrl = videoUrl.includes("youtube.com/watch");
      if (!isValidUrl) return;

      // Extract the video ID from the URL
      const videoId = videoUrl.split("v=")[1].split("&")[0];

      // Fetch the video thumbnail and title
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      const data = await response.json();

      // Update the state with the video thumbnail and title
      setVideoThumbnail(data.thumbnail_url);
      setVideoTitle(data.title);
      setUrl(videoUrl); // Update url state even if searchUrl was used
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const handleSearch = (event) => {
    const searchUrl = event.target.value;
    fetchVideoDetails(searchUrl); // Call fetchVideoDetails with search URL
  };

  React.useEffect(() => {
    fetchVideoDetails(); // Fetch initial video details (optional, remove if not needed)
  }, []);

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={handleSearch} // Attach onChange handler for search
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      {videoThumbnail && (
        <div>
          <img src={videoThumbnail} alt="Video Thumbnail" />
          <h3>{videoTitle}</h3>
          <a href={url}>Visit</a>
        </div>
      )}
    </div>
  );
};

export default YoutubeThumbnailPreview;
