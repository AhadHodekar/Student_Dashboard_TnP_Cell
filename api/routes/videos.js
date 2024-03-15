import express from "express";
import { authenticateToken, restrictToStudent } from "../controllers/authToken.js";
import multer from "multer";
import 'dotenv/config'
import { getVideoUrls, uploadVideoUrl, deleteVideoUrl } from "../controllers/videos.js";

const mediaFolderPath = process.env.MEDIA_DIRECTORY_PATH;


const router = express.Router()



router.post("/videos", uploadVideoUrl)
router.get("/videos", getVideoUrls)
router.delete("/video/:id", deleteVideoUrl)

export default router