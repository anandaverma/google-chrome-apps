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
      document.getElementById("data").innerHTML="Geolocation is not supported by this browser.";
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
            windGuage(responseData.main.pressure);
          }
        }
      }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();  
}

function windGuage(wind) {
  
    $('#container').highcharts({
  
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
      },
      
      title: {
          text: 'Wind'
      },
      
      pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#FFF'],
                      [1, '#333']
                  ]
              },
              borderWidth: 0,
              outerRadius: '109%'
          }, {
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#333'],
                      [1, '#FFF']
                  ]
              },
              borderWidth: 1,
              outerRadius: '107%'
          }, {
              // default background
          }, {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%'
          }]
      },
         
      // the value axis
      yAxis: {
          min: 0,
          max: 2000,
          
          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',
  
          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
              step: 2,
              rotation: 'auto'
          },
          title: {
              text: 'hpa'
          },
          plotBands: [{
              from: 0,
              to: 1000,
              color: '#55BF3B' // green
          }, {
              from: 1000,
              to: 1500,
              color: '#DDDF0D' // yellow
          }, {
              from: 1500,
              to: 2000,
              color: '#DF5353' // red
          }]        
      },
  
      series: [{
          name: 'Wind',
          data: [80],
          tooltip: {
              valueSuffix: 'hpa'
          }
      }]
  
  }, 
  // Add some life
  function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
            newVal = wind;
            point.update(newVal);
        }, 2000);
    }
  });
}