const path = require("path");
const { fetchLiveKey } = require("./bilibili");
const { updateLiveKey } = require("./update-obs-config");

require('dotenv').config({ path: path.join(__dirname, '../.env') });

(async function run() {
  const key = await fetchLiveKey();
  // print fetched key to stdout for lua plugin to read
  console.log(key);

  // Do we really need to save live key into config?
  // if (key) {
  //   updateLiveKey(key);
  // }
})();
