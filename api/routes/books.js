import express from "express";
import { getBooks, uploadBooks, getBook, deleteBook, editBook } from "../controllers/books.js";
import { authenticateToken, restrictToStudent } from "../controllers/authToken.js";
import multer from "multer";
import path from "path";
import { normalizedMediaDirectoryPath } from "../index.js";
// import url from "url";
import 'dotenv/config'
// import { dirname } from "path";


// Get the current directory path
// const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// // Set the absolute path to your media folder
// const mediaFolder = path.join(__dirname, '..', 'media');
// console.log(path.join(__dirname))


const mediaFolderPath = process.env.MEDIA_DIRECTORY_PATH;
// console.log(mediaFolderPath);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let subfolder;
        if (file.mimetype.startsWith('image/')) {
            subfolder = path.join('learning', 'books', 'cover');
        } else if (file.mimetype.startsWith('application/pdf')) {
            subfolder = path.join('learning', 'books', 'file');
        } else {
            // Handle other file types if needed
            cb(new Error('Invalid file type'), null);
            return;
        }

        const destinationPath = path.join(mediaFolderPath, subfolder);
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
// const upload = multer({ dest: '../media/posts/' })
const upload = multer({ storage: storage })

const router = express.Router()



router.post("/books", upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }]), uploadBooks)
router.get("/books", getBooks)
router.get("/book/:id", getBook)
router.put("/book/:id", editBook)
router.delete("/book/:id", deleteBook)

export default router