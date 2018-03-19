const { exec } = require('child_process');

const port = process.env.PORT ? process.env.PORT : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const setup = () => {
  console.log('Starting Minotaur ...');
  exec('npm run electron');
};

setup();

