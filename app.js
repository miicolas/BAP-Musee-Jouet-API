import express from "express";
import cors from "cors";
import { Server as socketIO } from "socket.io";
import http from "http";
import router from "./router.js";
import bodyParser from "body-parser";


const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.use(cors());

const server = http.createServer(app);

const io = new socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("avatar", (avatarId)=>{
    console.log("Receveid avatarID:", avatarId);
    io.emit("avatar", avatarId)
  })

  socket.on("question", (questionId) => {
    console.log("Received question ID:", questionId);
    io.emit("question", questionId);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/api", router);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});