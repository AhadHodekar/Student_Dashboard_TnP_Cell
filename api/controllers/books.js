import { db } from "../connect.js"
import { normalizedMediaDirectoryPath } from "../index.js";
import path from "path";
import fs from 'fs'
import "dotenv/config"
// import { executeQuery } from "../connect.js";
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken";
// import multer from "multer";
// const upload = multer({ dest: '../../media/learning/books/' })




export const getBook = (req, res) => {
    const { id } = req.params
    const q = "SELECT * FROM books WHERE id=?"
    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json({ error: { message: "Database Error" } })
        if (!err) return res.status(200).json(data)
    })

}
export const getBooks = (req, res) => {
    const q = req.query.books_query ? "SELECT * FROM books WHERE book_category=?" : "SELECT * FROM books"
    db.query(q, [req.query.books_query], (err, data) => {
        if (err) return res.status(500).json({ error: { message: "Database Error" } })
        if (!err) return res.status(200).json(data)
    })

}

export const uploadBooks = (req, res) => {
    const q = 'INSERT INTO books (book_title, book_cover_path, book_file_path, book_author, book_description, book_category) VALUES (?, ?, ?, ?, ?, ?)';
    const { book_title, book_author, book_description, book_category } = req.body;
    const coverImagePath = req.files.coverImage ? `/${path.posix.join(path.relative(normalizedMediaDirectoryPath, req.files.coverImage[0].path))}` : null;
    const pdfFilePath = req.files.pdfFile ? `/${path.posix.join(path.relative(normalizedMediaDirectoryPath, req.files.pdfFile[0].path))}` : null;
    db.query(q, [book_title, coverImagePath, pdfFilePath, book_author, book_description, book_category], (err, result) => {
        if (err) throw err;
        res.json("books uploaded successfully");
    });
}

export const deleteBook = (req, res) => {
    // Extract book ID from request parameters
    const { id } = req.params;

    // 1. Fetch Book Details (optional, but useful for file paths)
    const qGetBook = "SELECT book_cover_path, book_file_path FROM books WHERE id=?";
    db.query(qGetBook, [id], (err, bookToDelete) => {
        if (err) {
            console.error("Error fetching book details:", err);
            return res.status(500).json({ error: { message: "Failed to delete book" } });
        }

        // 2. Construct Delete Query
        const qDeleteBook = "DELETE FROM books WHERE id=?";

        // 3. Delete Book Record
        db.query(qDeleteBook, [id], (err, deleteResult) => {
            if (err) {
                console.error("Error deleting book:", err);
                return res.status(500).json({ error: { message: "Failed to delete book" } });
            }

            // 4. Delete Book Files (if bookToDelete exists)
            if (bookToDelete && bookToDelete.length > 0) {
                const coverImagePathToDelete = path.join(normalizedMediaDirectoryPath, bookToDelete[0].book_cover_path);
                const pdfFilePathToDelete = path.join(normalizedMediaDirectoryPath, bookToDelete[0].book_file_path);

                try {
                    fs.unlinkSync(coverImagePathToDelete); // Delete cover image
                    fs.unlinkSync(pdfFilePathToDelete); // Delete PDF file
                } catch (err) {
                    console.error("Error deleting book files:", err);
                    // Handle file deletion errors (e.g., log the error)
                }
            }

            return res.status(200).json({ message: "Book deleted successfully" });
        });
    });
};


export const editBook = async (req, res) => {
    // Extract book ID and updated data from request body
    const { book_title, book_author, book_description, book_category } = req.body;
    const { id } = req.params;
    // 1. Validate ID (optional, depending on your validation logic)
    if (!id) {
        return res.status(400).json({ error: { message: "Missing book ID" } });
    }

    // 2. Construct Update Query for specific fields
    const qUpdateBook = "UPDATE books SET book_title = ?,book_author = ?,book_description = ?,book_category = ?WHERE id = ?;";
    const values = [book_title, book_author, book_description, book_category, id];

    try {
        // 3. Execute Update Query with prepared statement
        db.query(qUpdateBook, values);

        return res.status(200).json({ message: "Book updated successfully" });
    } catch (err) {
        console.error("Error updating book:", err);
        return res.status(500).json({ error: { message: "Failed to update book" } });
    }
};