import { db } from "../connect.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import "dotenv/config"
import { generateAccessToken } from "./authToken.js";


export const getStudent = (req, res) => {
    //
}





export const getStudents = (req, res) => {
    const q = "SELECT * FROM student"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json({ "error": err })
        if (!err) return res.status(200).json(data)




    })
}  