const fs = require("fs");
const os = require("os");
const path = require("path");

function updateLiveKey(key) {
  const configFilePath = process.env.OBS_CONFIG_FILE_PATH;
  if (!configFilePath) {
    throw new Error("OBS_CONFIG_FILE_PATH in .env is empty")
  }
  const configPath = path.join(os.homedir(), configFilePath)
  const configObj = {
    "settings": {
      "bwtest": false,
      "key": key,
      "server": "rtmp://live-push.bilivideo.com/live-bvc/",
      "use_auth": false
    },
    "type": "rtmp_custom"
  };
  fs.writeFileSync(configPath, JSON.stringify(configObj));
}

module.exports = {
  updateLiveKey,
}