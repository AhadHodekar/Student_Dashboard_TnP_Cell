import express from "express";
import { newToken } from "../controllers/authToken.js";
import { authenticateToken, restrictToStudent } from "../controllers/authToken.js";

const router = express.Router()



router.post("/new-token", newToken)

export default router