import { db } from "../connect.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import "dotenv/config"




export const getPosts = (req, res) => {
    const q = "SELECT * FROM posts"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json({ "error": err })
        if (!err) return res.status(200).json(data)
    })

}      // res.json(posts.filter(post => post.enrollment_no === req.user.student_id))
// console.log(posts.filter(post => post.enrollment_no))
// console.log(req.user.student_id)
// res.send(posts[2].enrollment_no)
// console.log(posts[1].enrollment_no)