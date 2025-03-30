const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("🟢 Player connected:", socket.id);

  socket.on("joinShow", (horseData) => {
    console.log(`${socket.id} is joining a show with horse:`, horseData.name);
    const place = Math.floor(Math.random() * 10) + 1;
    socket.emit("showResult", {
      place,
      message: `Your horse ${horseData.name} placed ${place}th!`
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Player disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
