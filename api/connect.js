import mysql from "mysql2";
import "dotenv/config"

export const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "tnp",
        password: process.env.PASSWORD,

})