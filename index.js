const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');


app.set('views', './html');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))
app.use('/events', express.static(__dirname + 'public/events'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html')
});

router.get('/postevent',function(req,res){
  console.log("Here")
  res.sendFile(__dirname + '/html/postevent.html')
  
});




app.post('/add', function (req, res, next) {
  getData(req.body, res);
});


// app.post('/fileupload',function (req, res) {
//   if (req.url == '/fileupload') {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       var oldpath = files.filetoupload.filepath;
//       var newpath = 'public/images' + files.filetoupload.originalFilename;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//         res.end();
//       });
//  });
//   } else {
//     console.log("This does not work")
//   }
// });



app.use('/', router);

app.listen(process.env.port || 8080);
console.log("Server Started")




function getData(parms, res){
  let title = String(parms.title);
  let des = String(parms.description);
  let vol = String(parms.volenteers);
  let date = String(parms.date);
  let contact = String(parms.contact);
  let country = String(parms.country);
  let state = String(parms.state);
  let address = String(parms.address);
  let map = String(parms.map);

  if (map == 'true'){
    getLocation()

  }
  


  htmlCode = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>`+title+`</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
  <h1>`+title+`</h1><br>
  <p>`+des+`</p>
  `;
  console.log(htmlCode)

}

function getLocation(){
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);

}

function locationSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log(latitude)
    console.log(longitude)

        
        getWeather(latitude,longitude) 
        document.querySelector('.main-weather').style.display = "block";
}

function locationError(error) {
    const code = error.code;
    const message = error.message;

    
}


