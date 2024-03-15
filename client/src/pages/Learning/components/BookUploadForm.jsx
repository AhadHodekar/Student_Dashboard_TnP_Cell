import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookUploadForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coverImage: null,
    pdfFile: null,
    book_title: "",
    book_author: "",
    book_description: "",
    book_category: "technical",
  });

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("coverImage", formData.coverImage);
    formDataToSend.append("pdfFile", formData.pdfFile);
    formDataToSend.append("book_title", formData.book_title);
    formDataToSend.append("book_author", formData.book_author);
    formDataToSend.append("book_description", formData.book_description);
    formDataToSend.append("book_category", formData.book_category);

    try {
      const response = await axios.post(
        "http://localhost:3939/api/learning/books",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        // Handle successful upload
        console.log("Book uploaded successfully!");
        navigate("/books");
        setFormData({
          coverImage: null,
          pdfFile: null,
          book_title: "",
          book_author: "",
          book_description: "",
          book_category: "technical",
        });
      } else {
        console.error("Upload failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center bg-base-100  p-10 rounded-xl"
      >
        <div className="flex justify-between">
          <label htmlFor="pdfFile">PDF File:</label>
          <input
            type="file"
            name="pdfFile"
            className="file-input file-input-bordered w-full max-w-xs bg-base-200"
            onChange={handleInputChange}
            id="pdfFile"
            accept=".pdf"
          />
        </div>
        <div className="flex mb-2">
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            className="file-input file-input-bordered w-full max-w-xs bg-base-200 "
            onChange={handleInputChange}
            id="coverImage"
            accept="image/*"
          />
        </div>
        <div className="flex flex-col gap-2">
          <select
            name="book_category"
            value={formData.book_category}
            onChange={handleInputChange}
            className="select select-bordered w-full bg-base-200"
          >
            <option value="technical">Technical</option>
            <option value="soft">Soft</option>
            <option value="programming">Programming</option>
          </select>
          <input
            type="text"
            name="book_title"
            className="input input-bordered w-full bg-base-200"
            value={formData.book_title}
            onChange={handleInputChange}
            placeholder="Book Title"
          />
          <input
            type="text"
            name="book_author"
            className="input input-bordered w-full bg-base-200"
            value={formData.book_author}
            onChange={handleInputChange}
            placeholder="Author"
          />
          {/* <textarea placeholder="Bio"></textarea> */}
          <textarea
            className="textarea textarea-bordered mb-4 bg-base-200"
            type="text"
            height="400px"
            name="book_description"
            value={formData.book_description}
            onChange={handleInputChange}
            placeholder="Description"
          />

          <button className="btn btn-primary" type="submit">
            Upload Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookUploadForm;
