// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('dataTranfer', data => {
    io.emit('dataTranfer', data);
  });
});

io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});


httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});