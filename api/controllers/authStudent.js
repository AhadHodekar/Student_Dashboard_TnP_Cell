import { db } from "../connect.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import "dotenv/config"
import { generateAccessToken } from "./authToken.js";


export const register = (req, res) => {
    //check user if exists
    const q = "SELECT * FROM users WHERE username = ? ";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json({ "error": err })
        if (data.length) return res.status(409).json("User Already Exists!")
        //create new user


        //password hashing
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const q = "INSERT INTO users  (username,email,password,name) VALUE(?, ?, ?, ?)"
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name]
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json({ "error": err })
            return res.status(200).json("User Has Been Created!")
        })
    })

}


export const login = (req, res) => {
    try {
        const { enrollmentNo, password } = req.body
        const studentQuery = "SELECT * FROM student where enrollment_no = ?"
        db.query(studentQuery, [enrollmentNo], (err, data) => {
            if (err) return res.status(500).json({ error: { message: "Database Error" } })
            if (data.length === 0) return res.status(404).json({ error: { message: "Student Not Found" } })
            const student = data[0]
            const checkPassword = bcrypt.compareSync(password, student.hashed_password)
            if (!checkPassword) return res.status(401).json({ error: { message: "Invalid Credentials" } })
            const user = { id: student.id, student_id: student.enrollment_no, role: student.role }
            const accessToken = generateAccessToken(user, process.env.STUDENT_ACCESS_TOKEN_SECRET)
            const refreshToken = jwt.sign(user, process.env.STUDENT_REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
            const { hashed_password, role, ...studentData } = student
            res.json({ accessToken: accessToken, studentData: studentData })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none",

    }).status(200).json("User has been logged out.")
}

// export const authenticateStudentToken = (req, res, next) => {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.STUDENT_ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })

// }

