# Bilibili OBS helper on Linux (only)

Start a live stream and dump stream key into OBS automatically.

## Usage

1. npm install

2. Add plugin script `./obs_scripts/streamcmd.lua` to OBS scripts(Tools -> Scripts), 
![image](https://user-images.githubusercontent.com/666724/176977457-7306aa69-6e2c-42c3-839e-a1ff55e873a9.png)

Click `Browse` button and select `./run.sh` in this project.

3. Dump cookie string from bilibili.com to `.env` at project root dir.
![image](https://user-images.githubusercontent.com/666724/176977430-e94dcf02-fcf6-4fdb-9ad8-e5178bf5cf4c.png)

With format like:

```bash
COOKIE='SESSDATA=xxxxxx; bili_jct=xxxxxx; DedeUserID=xxxxxx; DedeUserID__ckMd5=xxxxxx'
```

4. Hit `Start streaming` button in OBS, and you will see a chromium window popup.
