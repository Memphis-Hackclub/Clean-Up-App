const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');




const apiKeys = require('./apikeys.js');
const googleMapsKey = String(apiKeys.googleMap);


app.set('views', './html');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))
app.use('/events', express.static(__dirname + 'public/events'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


let clippy = require('cheerio').load("html/index.html");
genEvents = generateEvents();
clippy('label').replaceWith(genEvents)
console.log(genEvents)

indexHTML =`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<center>
  
<h1>Want to Help the Earth?</h1><br>


  <a href="/postevent">Host a Cleanup Event</a><br>


<a href="events/test.html">Test</a>
  
  <img src="/images/saveTheEarth.jpg" alt="save the earth" width="400" height="283">
  ${genEvents}
<label>
  </label>

`



app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/html/index.html')
  res.send(indexHTML)

});

router.get('/postevent', function(req, res) {
  console.log("Here")
  res.sendFile(__dirname + '/html/postevent.html')

});




app.post('/add', function(req, res, next) {
  getData(req.body, res);
  res.sendFile(__dirname + '/html/index.html')
});




app.use('/', router);

app.listen(process.env.port || 8080);
console.log("Server Started")




function getData(parms, res) {
  let title = String(parms.title);
  let des = String(parms.description);
  let vol = String(parms.volenteers);
  let date = String(parms.date);
  let contact = String(parms.contact);
  let country = String(parms.country);
  let state = String(parms.state);
  let address = String(parms.address);
  let map = String(parms.map);
  let loc = String(parms.loc);


  if (map == 'true') {
    googleMaps = `
      <script>
    function initMap() {
      const uluru = ${loc};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru,
      });
      const marker = new google.maps.Marker({
        position: uluru,
        map: map,
      });
    }
  </script>
  <script async
  src='https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}
  '>
  </script>
    `
  }
  else {
    googleMaps = '';
  }



  htmlCode = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
  <center>
  <h1>${title}</h1><br>
  <p>${date}</p>
  <p>Located At ${address} ${state} ${country}</p>
  <div id='map'></div>
  <p>${des}</p>
  <p>${vol}</p>
  <p>${contact}</p>
  </center>
  ${googleMaps}`;
  console.log(htmlCode)
  title = title.replace(/ +/g, "");


  const directoryPath1 = path.join(__dirname, 'public/events');

  fs.readdir(directoryPath1, function(err, files) {
    
    if (err) {
      return console.log('cannot scan directory: ' + err);
    }
    
    files.forEach(function(file) {
     
      console.log(file);
      while (file == title) {
        title = title+String(Math.floor(Math.random() * 1000000));

      }

    });
  });
  title = title+".html";
try {
  fs.writeFileSync('/'+title+'', htmlCode)
  //file written successfully
} catch (err) {
  console.error(err)
}



}

function generateEvents(){
  html ="";
const directoryPath1 = path.join(__dirname, 'public/events');
let files = fs.readdirSync(directoryPath1)
    
   eventHtml="";
    
  for (file in files){
      console.log(files[file]);
      newEvent = "<a href='/events/"+String(files[file])+"'>New Event</a></div><br>";
      eventHtml = eventHtml+String(newEvent);
      console.log(eventHtml);
      
    }
    console.log('👀'+eventHtml)
    return String(eventHtml);
    

if (html !=""){
  i=0
  while(html !=""){
    i=i+1
    console.log(i)
  }}
  else{
    console.log("done")
  }
  


}





