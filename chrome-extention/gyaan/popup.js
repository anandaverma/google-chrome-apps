// Run our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  var d = new Date();
  var n = d.getFullYear();
  document.getElementById("credit").innerHTML="&copy<a href=\"http://hardyhawks.in\">hardyhawks.com</a> " + n + " | powered by <a href=\"http://gaana.com/\">Gaana.com</a>";
document.querySelector('button').addEventListener('click', clickHandler);
});

function clickHandler(e) {
  var topic=document.getElementById("item").value;
  if (topic=="") {
    document.getElementById("data").innerHTML="Please enter something to search on!";
  }else {
    getData(topic);
  }
}

function getData(topic) {
    var lang="en"; // tbd
    var filter="/people"; /tbd
    var API_KEY="";

    var url="https://www.googleapis.com/freebase/v1/topic/"+lang+"/"+topic+"?filter="+filter+"&key="+API_KEY
    console.log(url);
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {
      // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
          //responseData=JSON.parse(xmlhttp.responseText);
          var reportData="<div>";
          reportData=reportData+"coming";
          reportData=reportData+"</div>";
          document.getElementById("data").innerHTML=reportData;
        }
      }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();  
}