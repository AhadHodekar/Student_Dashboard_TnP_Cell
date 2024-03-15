import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VideoUploadForm = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("aptitude");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3939/api/learning/videos",
        { url, category }
      );
      setSuccessMessage("Video uploaded successfully!");
      setUrl(""); // Clear form after successful upload
      setCategory("");
      navigate("/videos");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error uploading video");
    }
  };

  return (
    <div className="w-full h-full flex flex-col  items-center justify-center ">
      <h2 className="text-center font-bold mb-4">Add Video</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center bg-base-100 w-[500px] p-10 rounded-xl"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="url">Video URL:</label>
          <textarea
            type="text"
            className="input input-bordered w-full bg-base-200 h-20"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <label htmlFor="category">Category:</label>
          <select
            name="book_category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered w-full bg-base-200 mb-10"
          >
            <option value="aptitude">Aptitude</option>
            <option value="soft">Soft</option>
            <option value="programming">Programming</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
