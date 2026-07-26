import app from "./dist/app.js";
import db from "./dist/db.js";
import env from "dotenv";
env.config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});

process.on("SIGINT", () => {
    db.close();
    console.log("🔄 Database closed.");
    process.exit(0);
});

