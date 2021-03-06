const net = require('net');
const { exec } = require('child_process');

const port = process.env.PORT ? process.env.PORT - 100 : 3000;
const client = new net.Socket();

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

let startedElectron = false;
const tryConnection = () => {
  client.connect({ port }, () => {
    client.end();
    if (!startedElectron) {
      console.log('starting electron');
      startedElectron = true;
      exec('npm run electron');
    }
  });
};

tryConnection();

client.on('error', () => {
  setTimeout(tryConnection, 1000);
});
