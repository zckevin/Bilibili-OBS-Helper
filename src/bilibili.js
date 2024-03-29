const { chromium } = require('playwright');
const { parseCookieString, sleep } = require("./utils");

async function fetchLiveKey() {
  const browser = await chromium.launch({
    // in case the control script is out of control
    headless: false,
  });
  const context = await browser.newContext();
  const cookieString = process.env.BILIBILI_COOKIE;
  if (!cookieString) {
    throw new Error("cookie string in .env is empty")
  }
  const cookies = parseCookieString(cookieString)
  context.addCookies(cookies);

  const page = await context.newPage();
  await page.goto('https://link.bilibili.com/p/center/index#/my-room/start-live');

  let keyPromiseResoveFn;
  const liveKeyPromise = new Promise((resolve, reject) => {
    keyPromiseResoveFn = resolve;
  });

  let first = true;
  let firstPromiseResolve;
  let firstPromise = new Promise((resolve, reject) => {
    firstPromiseResolve = resolve;
  });

  const doneCb = async () => {
    if (first === true) {
      first = false;
      // click refresh button in case input value is not set yet
      // await page.locator('div.refresh img').click();
      await sleep(500);
      liveKey = await page.inputValue("div.live-code input");
      keyPromiseResoveFn(liveKey);
      firstPromiseResolve();
    } else {
      await firstPromise;
    }
  }

  async function liveIsOn() {
    await page.locator('button:has-text("关闭直播")').waitFor();
    await doneCb();
  }

  async function liveIsOff() {
    await page.locator(`a:has-text("选择分类")`).click();
    await page.getByText("校园学习").click();
    await page.locator('button:has-text("开始直播")').click();
    await doneCb();
  }

  try {
    await Promise.any([
      liveIsOn(),
      liveIsOff(),
    ])
  } catch (err) {
    console.log(err)
  }
  await context.close();
  await browser.close();
  return liveKeyPromise;
}

module.exports = {
  fetchLiveKey,
}
