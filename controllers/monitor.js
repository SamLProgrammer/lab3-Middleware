const CircularList = require("../dataStructure/CircularList");
const Node = require("../dataStructure/Node");
const axios = require("axios");

const send = () => {
  return getRandomInt(1,10);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  send
  };