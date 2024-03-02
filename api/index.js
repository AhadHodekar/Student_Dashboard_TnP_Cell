import express from "express";
import 'dotenv/config'
const app = express()
const PORT = process.env.PORT || 3939
import session from "express-session";
import studentRoutes from "./routes/student.js"
import adminRoutes from "./routes/admin.js"
import postRoutes from "./routes/posts.js"
import authStudentRoutes from "./routes/authStudent.js"
import authAdminRoutes from "./routes/authAdmin.js"
import authTokenRoutes from "./routes/authToken.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";


//Middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(cors({
    origin: ["http://localhost:5173"], credentials: true
}))
app.use(session({
    resave: false,
    secret: "keythatwillsigncookie",
    saveUninitialized: false
}))
app.use(express.json())
app.use(cookieParser())

//Routes
app.use("/api/student", studentRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/blog", postRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/comments", commentRoutes)
app.use("api/auth/token", authTokenRoutes)
app.use("/api/auth/student", authStudentRoutes)
app.use("/api/auth/admin", authAdminRoutes)





app.get('/', (req, res) => {
    // console.log(req.session)
    res.send("KEEP UP BROTHER")
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))