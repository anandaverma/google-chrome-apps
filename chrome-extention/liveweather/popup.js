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
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&mode=json";
    restClient(url);
  }
}
function getLocationAndWeather() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      document.getElementById("result").innerHTML="Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&mode=json";
  restClient(url);
}

function restClient(url) {
    var xmlhttp;
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
          responseData=JSON.parse(xmlhttp.responseText);
          if (responseData.cod==404) {
            document.getElementById("data").innerHTML="Location Unknown";
          } else {
            document.getElementById("data").innerHTML="Location: " + responseData.name + "<br />" + 
            responseData.weather[0].main + ", " + responseData.weather[0].description + "<br />Temerature: " + responseData.main.temp + "&deg;C" + 
            "<br />Cloud: " + responseData.clouds.all + "%<br />Humidity: " + responseData.main.humidity + "%<br />Wind: " + responseData.wind.speed +
             "m/s<br />Pressure: " + responseData.main.pressure + "hpa";
          }
        }
      }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();  
}