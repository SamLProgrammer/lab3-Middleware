const express = require("express");
const cors = require("cors");
const {send} = require("../controllers/monitor")
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
      }, 5000)
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server on ! PORT ${this.port}`);
    });
  }
}

module.exports = Server;