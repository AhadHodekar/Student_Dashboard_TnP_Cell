import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Book = () => {
  const { role } = useAuth();
  const [book, setBook] = useState([]);
  const [editedBookData, setEditedBookData] = useState([]);
  const { id } = useParams();
  // const [editedBookData, setEditedBookData] = useState(book);
  const categoryStyles = {
    technical: { color: "yellow" },
    soft: { color: "yellowgreen" },
    programming: { color: "cyan" },
    // Add more categories and styles as needed
  };
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3939/api/learning/book/${id}`)
      .then((response) => {
        // Assuming the response contains an array of image filenames or paths
        setBook(response.data);
        const { book_title, book_author, book_category, book_description } =
          response.data[0];
        const editFormData = {
          book_title,
          book_author,
          book_category,
          book_description,
        };
        // console.log("FORM", editFormData);
        setEditedBookData(editFormData); // Set the extracted data
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
        `http://localhost:3939/api/learning/book/${id}`,
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
        `http://localhost:3939/api/learning/book/${id}`
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

  const mediaDirPath = import.meta.env.VITE_BASE_MEDIA_URL;
  return (
    <div className="w-full h-full flex items-start justify-center overflow-y-auto lg:justify-center">
      {book.map((image, index) => (
        <div
          className="card lg:card-side lg:flex shadow-xl overflow-y-auto sm:w-full h-full p-4 rounded-none"
          key={image.id}
        >
          <div className="w-full h-full flex justify-center items-start">
            <img
              src={`${mediaDirPath}${image.book_cover_path}`}
              alt={`book${id}`}
              // style={{ objectFit: "cover", width: "80%" }} // Use width: 100% for responsiveness
              className="bg-cover w-[500px] h-auto"
            />
          </div>
          <div className="card-body  w-full h-full">
            <div>
              <h2 className="card-title">{image.book_title}</h2>
              <p>
                by <span className="font-semibold">{image.book_author}</span>
              </p>
            </div>
            <div>
              <p className="font-semibold">
                Category:{" "}
                <span className="font-semibold badge">
                  {image.book_category} skill
                </span>
              </p>
            </div>
            <p className="mb-10">
              <span className="font-semibold">Description: </span>
              {image.book_description} Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Eaque, accusantium. Minima veritatis similique
              numquam. Quam repellat voluptatum praesentium aperiam. Odit
              delectus laborum aliquid nisi doloribus ex, temporibus illo
              aliquam et.
            </p>

            <div className="card-actions justify-end mb-20">
              {" "}
              {role === "admin" ? (
                <>
                  <button
                    className="bookdelete btn btn-error"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    // onClick={() => handleDelete(image.book_file_path)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    // onClick={() => handleEdit(image.book_file_path)}
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Edit
                  </button>
                  <dialog
                    id="my_modal_1"
                    className="bookdelete modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg text-center">
                        Delete Confirmation
                      </h3>
                      <p className="py-4 text-center">
                        ⚠️ Confirming will permenantly delete the resource.
                      </p>
                      <div className="modal-action flex flex-row justify-around items-center">
                        <form method="dialog" className="flex gap-10">
                          <button className="btn">Cancel</button>

                          <button
                            className="btn btn-error"
                            onClick={() => handleDelete(image.book_file_path)}
                          >
                            Confirm
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <dialog id="my_modal_3" className="bookedit modal ">
                    <div className="modal-box w-[900px] h-auto">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 overflow-hidden">
                          ✕
                        </button>
                      </form>
                      <form className="w-full">
                        <div className="flex flex-col items-center justify-center gap-2 w-full">
                          <h3 className="font-bold text-lg">Edit Details</h3>
                          <input
                            type="text"
                            name=""
                            id=""
                            value={editedBookData.book_title} // Use editedBookData or fallback to original title
                            placeholder="Title"
                            className="input input-bordered w-full"
                            // onChange={handleEditConfirm}
                            onChange={(e) => {
                              setEditedBookData({
                                ...editedBookData,
                                book_title: e.target.value,
                              });
                              // console.log(editedBookData);
                            }}
                          />
                          <input
                            type="text"
                            name=""
                            id=""
                            value={editedBookData.book_author} // Use editedBookData or fallback to original author
                            placeholder="Author"
                            className="input input-bordered w-full"
                            onChange={(e) =>
                              setEditedBookData({
                                ...editedBookData,
                                book_author: e.target.value,
                              })
                            }
                          />
                          <select
                            name="book_category"
                            value={editedBookData.book_category} // Use editedBookData or fallback to original category
                            // value={editedBookData.book_category || image.book_category} // Use editedBookData or fallback to original category
                            className="select select-bordered w-full"
                            onChange={(e) => {
                              setEditedBookData({
                                ...editedBookData,
                                book_category: e.target.value,
                              });
                              // console.log(editedBookData);
                            }}
                          >
                            <option value="technical">Technical</option>
                            <option value="soft">Soft</option>
                            <option value="programming">Programming</option>
                          </select>
                          <textarea
                            className="textarea textarea-bordered mb-4 w-full"
                            type="text"
                            height="400px"
                            name="book_description"
                            value={editedBookData.book_description} // Use editedBookData or fallback to original description
                            placeholder="Description"
                            onChange={(e) =>
                              setEditedBookData({
                                ...editedBookData,
                                book_description: e.target.value,
                              })
                            }
                          />
                          <button
                            className="btn"
                            onClick={handleEditConfirm}
                            // onClick={() => {
                            //   console.log(editedBookData);
                            // }}
                          >
                            Confirm
                          </button>
                        </div>
                      </form>
                    </div>
                  </dialog>
                </>
              ) : null}
              <button
                className="btn btn-primary"
                onClick={() => handleDownload(image.book_file_path)}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Book;
