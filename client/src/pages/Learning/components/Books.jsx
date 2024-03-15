import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const [selectedCategory, setSelectedCategory] = useState("All"); // Selected category
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const { role } = useAuth();

  const categoryStyles = {
    technical: { color: "yellow" },
    soft: { color: "yellowgreen" },
    programming: { color: "cyan" },
    // Add more categories and styles as needed
  };

  useEffect(() => {
    axios
      .get("http://localhost:3939/api/learning/books")
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data); // Set initial filtered books
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCat = event.target.value;
    setSelectedCategory(selectedCat);

    const filteredBooks = applyFilters(books, selectedCat, searchTerm);
    setFilteredBooks(filteredBooks);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);

    const filteredBooks = applyFilters(
      books,
      selectedCategory,
      event.target.value
    );
    setFilteredBooks(filteredBooks);
  };

  const applyFilters = (books, category, searchTerm) => {
    return books.filter((book) => {
      // Filter based on category
      let categoryMatch = true;
      if (category !== "All") {
        categoryMatch = book.book_category === category;
      }

      // Filter based on search term (case-insensitive)
      const searchTermLower = searchTerm.toLowerCase();
      const titleLower = book.book_title.toLowerCase();
      const titleMatch = titleLower.includes(searchTermLower);

      // Combine filters (book must match category and title)
      return categoryMatch && titleMatch;
    });
  };

  const mediaDirPath = import.meta.env.VITE_BASE_MEDIA_URL;

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
            <option value="All">All</option>
            <option value="technical">Technical</option>
            <option value="soft">Soft</option>
            <option value="programming">Programming</option>
          </select>
        </div>
        <div className="">
          {role === "admin" ? (
            <Link to={"/book-form"}>
              <button className="btn btn-primary ">UPLOAD BOOK</button>
            </Link>
          ) : null}
        </div>
      </nav>
      <div className="w-full h-auto flex flex-wrap justify-around  px-10">
        {filteredBooks.length > 0 ? (
          <>
            {filteredBooks.map((book, index) => (
              <div
                key={index}
                className="flex flex-col items-center m-4 p-4 gap-3 w-[400px] bg-base-300 rounded-md"
              >
                <h2 className="font-bold">{book.book_title}</h2>
                <Link to={`/book/${book.id}`}>
                  <img
                    src={`${mediaDirPath}${book.book_cover_path}`}
                    alt={`Image ${index}`}
                    style={{ width: "300px", height: "400px" }}
                  />
                </Link>
                <p>Author: {book.book_author}</p>
                <p>
                  Category:{" "}
                  {categoryStyles[book.book_category] ? (
                    <span
                      className="font-semibold"
                      // style={categoryStyles[book.book_category]}
                    >
                      {book.book_category} skill
                    </span>
                  ) : null}
                </p>
              </div>
            ))}
          </>
        ) : (
          <div>No books found</div>
        )}
      </div>
    </div>
  );
};

export default Books;
