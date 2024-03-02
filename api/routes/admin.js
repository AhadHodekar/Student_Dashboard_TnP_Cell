import express from "express";
import { getAdmin } from "../controllers/admin.js";

const router = express.Router()



router.get("/find/:admin_id", getAdmin)

export default router