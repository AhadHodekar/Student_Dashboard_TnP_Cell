import express from "express";
import { getPosts } from "../controllers/posts.js";
import { authenticateToken, restrictToStudent } from "../controllers/authToken.js";

const router = express.Router()



router.get("/posts", authenticateToken, getPosts)

export default router