# MotionDetecting-SecurityCamera
Uses a RTMP Server and asynchronous screenshotting to detect motion from a iPhone camera!
- Saves .jpg images that are detected to have motion in timelapse style.

# RTMP Server
- Creates RTMP Server to stream iPhone camera feed through the server to use as camera.
- Uses node-media-server

# Connecting iPhone to RTMP Server
- Portforward port 1935
- Tested using manycam (iOS) 
- livestream to rtmp server

# Motion Detecting in NodeJS (Jimp & PixelMatch API's)

# Dependencies
- `npm install node-media-server` (RTMP Server)
- `npm install --safe jimp` (Image Proccessing & Detection)
- `npm install express` (Live Feed Hosting), can be disabled with removal of code
- `npm install cookieParser` (Not Needed)
- `npm install cookieSession` (Not Needed)
- `npm install screenshot-desktop` (Screenshotting)
- `npm install morgan` (Logging)
- `VLC Media Player` (Used to capture RTMP Stream to take screenshots of) Can be swaped with /viewstream, etc...
