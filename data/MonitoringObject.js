const axios = require("axios");
const { spawn } = require('child_process');

class MonitoringObject {

  constructor(index, increment) {
    this.index = index;
    this.data = 'http://127.0.0.1:' + (3000 + index) + '/';
    this.cpu_usage = 0;
    this.ram_usage = 0;
    this.createInstance(increment, index);
  }

  createInstance = (increment, index) => {
    const ls = spawn('bash', ['./scripts/runner.sh', index]);
    ls.stdout.on('data', (data) => {
      const logs = data.toString();
      console.log(logs);
      increment();
    });
    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  cpuRequest() {
    axios.get(this.data + 'cpuStatus')
      .then((response) => {
        if (response.data.cpu != '') {
          this.cpu_usage = response.data.cpu;
        }
      }).catch(err => {
        console.log(err)
      });
  }

  ramRequest() {
    axios.get(this.data + 'ramStatus')
      .then((response) => {
        if (response.data.ram != '') {
          this.ram_usage = response.data.ram;
        }
      }).catch(err => {
        console.log(err)
      })
  }

  startMonitoring() {
    setInterval(() => {
      this.ramRequest();
      this.cpuRequest();
    }, 3000)
  }

  getRAMUsage() {
    return this.ram_usage;
  }

  getCPUUsage() {
    return this.cpu_usage;
  }

  getIndex() {
    return this.index;
  }

}

module.exports = MonitoringObject;