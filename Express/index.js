import express from "express";
import mongoose from "mongoose";
import router from "./routes/gameRoutes.js";

const app = express();

try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Middleware voor JSON-gegevens
    app.use(express.json());

    // Middleware voor www-urlencoded-gegevens
    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        const acceptHeader = req.headers.accept;

        res.header("Access-Control-Allow-Origin", "*");

        if (acceptHeader?.includes("application/json")) {
            next();
        } else {
            if (req.method === "OPTIONS") {
                next();
            } else {
                res.status(400).send("Illegal format");
            }
        }
    });

    app.use("/games", router);
} catch (e) {
    app.use((req, res) => {
        res.status(500).json({
            message: "Database is down, oopsie woopsie :("
        })
    })
    console.log(`Database connection failed: ${e.message}`);
}

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});

