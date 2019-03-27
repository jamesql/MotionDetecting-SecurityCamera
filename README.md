# MotionDetecting-SecurityCamera
Uses a RTMP Server and asynchronous screenshotting to detect motion from a iPhone camera!

# RTMP Server
- Creates RTMP Server to stream iPhone camera feed through the server to use as camera.
- Uses node-media-server

# Connecting iPhone to RTMP Server
- Portforward port 1935
- Tested using manycam (iOS) 
- livestream to rtmp server

# Motion Detecting in NodeJS (Jimp & PixelMatch API's)
