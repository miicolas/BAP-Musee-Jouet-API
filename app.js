import express from "express";
import cors from "cors";
import { Server as socketIO } from "socket.io";
import http from "http";

const app = express();
const PORT = 4000;

app.use(cors());

const server = http.createServer(app);

const io = new socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("question", (questionId) => {
    console.log("Received question ID:", questionId);
    io.emit("question", questionId);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
