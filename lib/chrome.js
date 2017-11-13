const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const TMP_DIR = '/tmp';
const UUID_PREFIX = 'differo-';

const genUUID = () => (Math.random().toString() + (new Date()).getTime().toString()).slice(2);

const Chrome = function () {
  let child;

  const start = ({
    executable = 'google-chrome',
    userDataDir = true,
    headless = true,
    hideScrollbars = true,
    disableGPU = true,
    remoteDebuggingPort = 9222,
  }) => {
    const args = [];

    if (userDataDir) {
      if (userDataDir === true) {
        const uuid = UUID_PREFIX + genUUID();
        userDataDir = path.join(TMP_DIR, uuid);
      }
      fs.mkdirSync(userDataDir);
      args.push('--user-data-dir=' + userDataDir);
    }

    if (headless) {
      args.push('--headless');
    }

    if (hideScrollbars) {
      args.push('--hide-scrollbars');
    }

    args.push('--remote-debugging-port=' + remoteDebuggingPort);

    if (disableGPU) {
      args.push('--disable-gpu');
    }

    child = spawn(executable, args);
  };

  const stop = () => {
    if (child) {
      child.kill();
    }
  }

  this.start = start;

  this.stop = stop;
};

module.exports = { Chrome };
