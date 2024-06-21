import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./db.js";
import { adminRouter } from "./routes/admin.js";
import { userRouter } from "./routes/user.js";
import { vendorRouter } from "./routes/vendor.js";
// Setting Environment Config
dotenv.config();

// Initializing Express
const app = express();

// Setting Middlewares
app.use(express.json());
app.use(cors());

// Initializing Environements
const PORT = process.env.PORT;
const MONGO_URL_LOCAL = process.env.MONGO_URL_LOCAL;
// const MONGO_URL_ATLAS = process.env.MONGO_URL_ATLAS;

// Connecting Database
connectDatabase(MONGO_URL_LOCAL);

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/vendor", vendorRouter);

app.get("/test", (req, res) => {
    res.send({message: "Connection Success"});
})

// Activating / Listening to PORT
app.listen(PORT, () => {
    console.log(`
    Server Started at ${PORT},
    Listening to http://localhost:${PORT}
    `)
})


