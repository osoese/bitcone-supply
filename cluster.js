const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();
}

cluster.on('exit', (worker, code, signal) => {
    console.log('worker %d died (%s). restarting...',
    worker.process.pid, signal || code);
    cluster.fork();
}); 

function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < 2; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork();
  }

  //process.exit();
}

function childProcess() {
  console.log(`Worker ${process.pid} started and finished`);
  require('./server.js')

  //process.exit();
}
