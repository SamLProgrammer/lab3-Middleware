const express = require("express");
const cors = require("cors");
const {send, monitorRequest} = require("../controllers/monitor")
const axios = require("axios");
const PORT = 8000;

class Server {
  constructor() {
    this.app = express();
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);
    this.port = PORT;
    this.middleware();
    this.routes();
    this.sockets();
    this.monitor();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/", require("../routes/routes"));
  }

  sockets() {
    this.io.on("connection", (socket) => {
      console.log("Client connect!");
      setInterval(() => {
        this.io.emit('message', {ram: send(), cpu: send()})
        console.log('aja')
      }, 5000)
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server on ! PORT ${this.port}`);
    });
  }

  monitor() {
    setInterval(() => {
      monitorRequest();
    }, 5000);
  }
}

module.exports = Server;