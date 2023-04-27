const path = require("path")

function parseCookieString(cookieString) {
  const arr = cookieString.split("; ").filter(_ => _);
  return arr.map(s => {
    const [name, value] = s.split("=");
    return {
      name,
      value: value.trim(),
      path: "/",
      domain: ".bilibili.com",
      secure: true,
    }
  })
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, Math.ceil(time)));
}

module.exports = {
  parseCookieString,
  sleep,
}