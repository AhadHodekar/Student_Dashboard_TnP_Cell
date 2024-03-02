import { db } from "../connect.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import "dotenv/config"
import { generateAccessToken } from "./authToken.js";

export const register = (req, res) => {
    //check user if exists
    const q = "SELECT * FROM admin WHERE admin_name = ? ";
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
        const { adminName, password } = req.body;
        const adminQuery = 'SELECT * FROM admin WHERE admin_id = ?'
        db.query(adminQuery, [adminName], (err, data) => {
            if (err) return res.status(500).json({ error: { message: "Database Error" } })
            if (data.length === 0) return res.status(404).json({ error: { message: "Admin Not Found" } })
            const admin = data[0]
            const checkPassword = bcrypt.compareSync(password, admin.hashed_password)
            if (!checkPassword) return res.status(401).json({ error: { message: "Invalid Credentials" } })
            const user = { id: admin.id, admin_id: admin.admin_id, role: admin.role }
            const accessToken = generateAccessToken(user, process.env.ADMIN_ACCESS_TOKEN_SECRET)
            const refreshToken = jwt.sign(user, process.env.ADMIN_REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
            const { hashed_password, role, ...adminData } = admin
            // res.cookie("accessToken", accessToken).json({ accessToken: accessToken, adminData: adminData })
            res.json({ accessToken: accessToken, adminData: adminData })
            // res.json({ accessToken: accessToken, refreshToken: refreshToken, studentData: studentData })
            // res.cookie("token", accessToken).status(200).json({ status: "SUCCESS", accessToken, studentData })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

export const logout = (req, res) => {
    res.clearCookie('adminToken');
    res.status(200).send('SUCCESS');
}  