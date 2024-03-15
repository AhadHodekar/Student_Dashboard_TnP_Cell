import { db } from "../connect.js"
import "dotenv/config"

export const getVideoUrls = (req, res) => {
    const q = req.query.videos_query ? "SELECT * FROM videos WHERE video_category=?" : "SELECT * FROM videos"
    db.query(q, [req.query.videos_query], (err, data) => {
        if (err) return res.status(500).json({ error: { message: "Database Error" } })
        if (!err) return res.status(200).json(data)
    })

}

export const uploadVideoUrl = (req, res) => {
    const q = 'INSERT INTO videos ( url, category) VALUES (?, ?)';
    const { url, category } = req.body;
    db.query(q, [url, category], (err, result) => {
        if (err) throw err;
        res.json("video added successfully");
    });
}

export const deleteVideoUrl = (req, res) => {
    // Extract video ID from request parameter
    const { id } = req.params; // Assuming the ID is passed in the URL params

    // Validate video ID (optional)
    // You can add checks to ensure the ID is a valid number

    // Construct the delete query
    const q = 'DELETE FROM videos WHERE id = ?';

    // Execute the query with prepared statement
    db.query(q, [id], (err, result) => {
        if (err) {
            // Handle errors appropriately (e.g., check for non-existent ID)
            return res.status(500).json({ error: { message: "Database Error" } });
        }

        // Check if any rows were affected (indicates successful deletion)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Success response
        return res.json({ message: "Video deleted successfully" });
    });
};
