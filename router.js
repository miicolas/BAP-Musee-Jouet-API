import express from "express";
import LikeRoute from "./routes/like-routes.js";

const router = express.Router();

router.use("/likes", LikeRoute);
router.use("/", (req, res) => {
    res.send("Hello, world!");
});

export default router;