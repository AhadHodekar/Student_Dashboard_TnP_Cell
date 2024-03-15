import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
const Post = () => {
  const { role } = useAuth();
  const [data, setData] = useState([]);
  const { id } = useParams();

  const categoryStyles = {
    technical: { color: "yellow" },
    soft: { color: "yellowgreen" },
    programming: { color: "cyan" },
    // Add more categories and styles as needed
  };
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3939/api/blog/post/${id}`)
      .then((response) => {
        // Assuming the response contains an array of image filenames or paths
        setData(response.data);
        // const { book_title, book_author, book_category, book_description } =
        //   response.data[0];
        // const editFormData = {
        //   book_title,
        //   book_author,
        //   book_category,
        //   book_description,
        // };
        // console.log("FORM", editFormData);
        // setEditedBookData(editFormData); // Set the extracted data
        // setEditedBookData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  //   console.log(book);

  const handleDownload = (filePath) => {
    // Create an anchor element
    const link = document.createElement("a");
    link.href = `${mediaDirPath}${filePath}`;
    link.download = true;

    // Simulate a click on the anchor element to trigger the download
    link.click();
  };

  const handleEditConfirm = async () => {
    try {
      console.log("Edited book data:", editedBookData);
      const response = await axios.put(
        `http://localhost:3939/api/blog/post/${id}`,
        editedBookData
      );
      console.log("Book updated successfully:", response.data);
      // Refresh the book data (e.g., fetch it again using useEffect)
      // Navigate back to the "Books" page (using navigate from 'react-router-dom')
    } catch (error) {
      console.error("Error updating book:", error);
      // Display an error message to the user
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedBookData({ ...editedBookData, [name]: value });
    console.log(`Field changed: ${name}, New value: ${value}`); // Log change details
  };

  const handleDelete = async (bookFilePath) => {
    try {
      const response = await axios.delete(
        `http://localhost:3939/api/blog/post/${id}`
      ); // Delete book by ID
      if (response.status === 200) {
        console.log("Book deleted successfully");
        navigate("/books");
        // Remove book from local state (optional)
        setBook([]); // Assuming you only display the book details on this page
      } else {
        console.error("Error deleting book:", response.data);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (/* edit logic */) => {
    // ... handle edit functionality (implementation omitted for brevity)
  };

  const mediaDirPath = import.meta.env.VITE_BASE_MEDIA_URL;
  return (
    <div className="w-full h-full flex items-center justify-center overflow-y-auto lg:justify-center">
      {data.map((post, index) => (
        <div className=" card w-96 bg-base-100 shadow-xl" key={post.id}>
          <div className=" card-body">
            <h1 className="font-bold">{post.post_title}</h1>
            <p>{post.post_description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
