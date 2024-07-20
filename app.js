const express = require("express");
const app = express();
const http = require("http");

const { Server } = require("socket.io");

const path = require("path");
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
    socket.on("disconnect", function(){
        io.emit("user-disconnect", socket.id);
    })
  });
  console.log("connected");
});

app.get("/", function (req, res) {
  res.render("index");
});

server.listen(3000);
