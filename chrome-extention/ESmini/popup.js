// Run our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  var d = new Date();
  var n = d.getFullYear();
  document.getElementById("credit").innerHTML="&copy<a href=\"http://hardyhawks.in\">hardyhawks.com</a> " + n + "<br />powered by <a href=\"http://www.elasticsearch.org/\">google.com</a>";
  document.querySelector('button').addEventListener('click', clickHandler);
});

function clickHandler(e) {
  var url=document.getElementById("url").value;
  if (url=="") {
    document.getElementById("alert").innerHTML="Please enter cluster address!";
  }else {
  checkAndShortURL(url);
  }
}

function checkAndShortURL(url) {
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
          if (responseData.status == 200) {
          var report;
          report=responseData.name;
          document.getElementById("data").innerHTML=report;
        }else {
          document.getElementById("alert").innerHTML="Try again!";
        }
        } else{
          document.getElementById("alert").innerHTML="Connection failed, try again!";
        }
      }
    xmlhttp.open("GET",url,true);
    xmlhttp.send(url);  
}
