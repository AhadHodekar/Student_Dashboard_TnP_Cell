import express from "express";
import { getPosts, getPost } from "../controllers/posts.js";
import { authenticateToken, restrictToStudent } from "../controllers/authToken.js";

const router = express.Router()



router.get("/posts", getPosts)
router.get("/post/:id", getPost)

export default router