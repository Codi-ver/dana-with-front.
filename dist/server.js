import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import db from "./db.js";
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port} `);
});
process.on("SIGINT", () => {
    db.close();
    console.log("🔄 Database closed.");
    process.exit(0);
});
