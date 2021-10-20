const CircularList = require("../dataStructure/CircularList");
const Node = require("../dataStructure/Node");
const axios = require("axios");

let ramLimit = 0;
let cpuLimit = 0;

const send = () => {
  return getRandomInt(10, 100);
}

const processQuery = (req, res) => {
  axios.get('http://127.0.0.1:3306/query?id=' +
    req.query.id).then(function (response) {
      console.log(response.data)
      res.send({ id: response.data.id})
    }).catch(err => {
      console.log('err')
    });
}

const monitorRequest = () => {
  axios.get('http://127.0.0.1:3306/cpuStatus'
  ).then(function (response) {
      console.log(response.data)
    }).catch(err => {
      console.log('err')
    });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  send,
  processQuery,
  monitorRequest
};