function locationSuccess(position) {
    latitude = String(position.coords.latitude);
    longitude = String(position.coords.longitude);
    display(latitude,longitude)
    
  
    
        
        
}

function locationError(error) {
    const code = error.code;
    const message = error.message;

    
}

navigator.geolocation.getCurrentPosition(locationSuccess, locationError);

function display(lat, long){
  urlu = "{ lat: "+lat+", lng: "+long+" }";
document.getElementById('loc').innerHTML = urlu;//String(urlu);
//<input type="checkbox" id ="map" name="map" value="'+urlu+'" checked>';

}
