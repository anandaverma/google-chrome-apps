// Run our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  getLocationAndWeather();
  document.querySelector('button').addEventListener('click', clickHandler);
});

function clickHandler(e) {
  getWeatherByLocation();
}

function getWeatherByLocation() {
  var location=document.getElementById("location").value;
  if (location=="") {
    document.getElementById("data").innerHTML="please specify a valid location";
  }
  else {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&mode=html";
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {
      // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
      {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
        document.getElementById("data").innerHTML=xmlhttp.responseText;
        }
      }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();  
  }
}
function getLocationAndWeather()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{document.getElementById("result").innerHTML="Geolocation is not supported by this browser.";}
  }
function showPosition(position)
  {
var xmlhttp;
var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&mode=html";
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("data").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET",url,true);
xmlhttp.send();  
}