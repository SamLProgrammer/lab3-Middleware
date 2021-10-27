const CircularList = require("../dataStructure/CircularList");
const MonitoringObject = require("../data/MonitoringObject");
const Node = require("../dataStructure/Node");
const axios = require("axios");
const PATH = process.cwd();
let monitoring = false;
let data = require('../data/MonitoringObject');

let instances = [];

let instances_index = 2;
let instances_amount = 0;

let ramLimit = 0;
let cpuLimit = 0;

const send = () => {
  return getRandomInt(10, 100);
}

const notifyExistence = (req, res) => {
  instances.forEach(instance => {
    if(req.body.index == instance.getIndex()) {
      instance.startMonitoring();
    }
    if(instances.length == 1) {
      monitoring = true;
      console.log('yep')
    }
  });
}

const newInstance = (req, res) => {
  const instance = new MonitoringObject(instances_index, increment);
  instances.push(instance);
}

const increment = () => {
  instances_index++;
  instances_amount++;
  console.log('amount: ' + instances_amount + ' index: ' + instances_index)
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const isMonitoring = () => {
  return monitoring;
}

const getInstances = () => {
  return instances;
}

module.exports = {
  send,
  processQuery,
  newInstance,
  notifyExistence, 
  getInstances,
  isMonitoring
};