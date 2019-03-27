// Time (ms) between frame captures
var timeLapse = 2000;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const screenshot = require('screenshot-desktop')
const fs = require('fs')
const app = express();
const http = require('http');
const server = http.createServer(app);
const Jimp = require('jimp');

// view engine setup
app.set('trust proxy', true)
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.set('view options', {pretty: true})
.locals.pretty = app.get('env') === 'development';

app.use(logger('dev'))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use(cookieParser())
.use(express.static(path.join(__dirname, 'public')))
.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})

var frame = 0;
var img1,img2;

function resolver() {
    return new Promise(resolve => {
        frame++;
      setTimeout(() => {
        
        screenshot.listDisplays().then((displays) => {
        // Takes screenshot of second screen (using vlc)
            screenshot({ screen: displays[displays.length - 2].id })
              .then((img) => {
                fs.writeFile('screenshot'+ frame +'.jpg', img, function (err) {
                    if (err) {
                      throw err
                }
            })
              });
          })
                console.log('Frame #' + frame + " Captured!");
                if (frame > 1) {
                    getChangedPixels(frame,frame-1);
                }
            
        resolve('Resolved!');
      }, timeLapse);
    });
  }
  
  async function startMotionDetection() {
    var result = await resolver();
    startMotionDetection();
  }

function getChangedPixels(iNum1,INum2) {
    return new Promise(resolve => {
      setTimeout(() => {
    Jimp.read('screenshot'+iNum1+".jpg")
    .then(image1 => {
        Jimp.read('screenshot'+INum2+".jpg")
        .then(image2 => {
         var difff = Jimp.diff(image1,image2,0.2);
         console.log(difff.percent);
         if (difff.percent > 0.03) {
            console.log("Detected Motion on Camera");
         }else{
             console.log("No Motion Detected")
             fs.unlink("screenshot"+iNum1+".jpg", (err) => {
                if (err) throw err;
              });
              fs.unlink("screenshot"+INum2+".jpg", (err) => {
                if (err) throw err;
              });
         }
        })
        .catch(err1 => { }); })
    .catch(err => { });
    resolve("Calct!")
        });
    });
}



app.use('/', require('./routes/index'))
app.use('/viewstream', require('./routes/viewstream'))

server.listen(process.env.PORT || 80);

startMotionDetection();
