import jwt from "jsonwebtoken";
import "dotenv/config"


let refreshTokens = []

export const generateAccessToken = (user, key) => {
    return jwt.sign(user, key)
    // return jwt.sign(user, key, { expiresIn: "2min" })
}

export const newToken = (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);

    // Check if the refresh token exists in the respective refresh token storage
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    // Verify the refresh token using the student secret key first
    jwt.verify(refreshToken, process.env.STUDENT_REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            // If verification fails with student secret key, try with admin secret key
            jwt.verify(refreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403);
                // Generate a new access token
                const accessToken = generateAccessToken({ admin_id: req.user.admin_id }, process.env.ADMIN_ACCESS_TOKEN_SECRET);
                res.json({ accessToken: accessToken });
            });
        } else {
            // Generate a new access token using the student secret key
            const accessToken = generateAccessToken({ student_id: req.user.student_id }, process.env.STUDENT_ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken });
        }
    });
};


// Middleware to authenticate token
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    // Verify the token using the student secret key
    jwt.verify(token, process.env.STUDENT_ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            // If verification fails, try verifying with the admin secret key
            jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                // Check if the user is an admin
                req.isAdmin = user.role === 'admin';
                next();
            });
        } else {
            // If the token is verified using the student secret key
            req.user = user;
            // Set isAdmin flag to false
            req.isAdmin = false;
            // Set isStudent flag to true
            req.isStudent = true;
            next();
        }
    });
};

// Middleware to restrict access to admin-only routes
export const restrictToAdmin = (req, res, next) => {
    // Check if the user is an admin
    if (!req.isAdmin) {
        return res.status(403).send("Access forbidden. Admin privilege required.");
    }
    next();
};

// Middleware to restrict access to student-only routes
export const restrictToStudent = (req, res, next) => {
    // Check if the user is a student
    if (!req.isStudent) {
        return res.status(403).send("Access forbidden. Student privilege required.");
    }
    next();
};

// Endpoint for student accessing their own data
// app.get('/student/:id', authenticateToken, restrictToStudent, (req, res) => {
//     const studentId = req.params.id;
//     // Check if the user is trying to access their own data or if they are an admin
//     if (req.user.student_id === studentId || req.isAdmin) {
//         // Allow access to student's own data or if the user is an admin
//         // Handle logic for accessing student's data here
//     } else {
//         // If the user is not authorized to access this student's data
//         return res.status(403).send("Access forbidden. You are not authorized to access this student's data.");
//     }
// });

// // Endpoint for admin accessing all students' data
// app.get('/students', authenticateToken, restrictToAdmin, (req, res) => {
//     // Only admins can access this route
//     // Handle logic for accessing all students' data here
// });

