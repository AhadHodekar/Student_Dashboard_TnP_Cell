import express from "express";
import { getStudents } from "../controllers/student.js";
import { authenticateToken, restrictToAdmin, restrictToStudent } from "../controllers/authToken.js";

const router = express.Router()



router.get("/get-students", authenticateToken, restrictToAdmin, getStudents)
router.get("/:id", authenticateToken, restrictToStudent)

export default router