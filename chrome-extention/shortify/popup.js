// Run our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabAndUrl();
  var d = new Date();
  var n = d.getFullYear();
  document.getElementById("credit").innerHTML="&copy<a href=\"http://hardyhawks.in\">hardyhawks.com</a> " + n + "<br />powered by <a href=\"http://www.google.com/\">google.com</a>";
  document.querySelector('button').addEventListener('click', clickHandler);
});

function getCurrentTabAndUrl() {
  chrome.tabs.getSelected(null, function(tab) {
        var tabId = tab.id;
        var tabUrl = tab.url;
        if (tabUrl=="chrome://newtab/") {
          document.getElementById("data").innerHTML="Looks like you opened a new tab, please open a web page and click again to shortify.";
        }else {
        checkAndShortURL(tabUrl);
        }
    });
}
function clickHandler(e) {
  var userUrl=document.getElementById("userUrl").value;
  if (userUrl=="") {
    document.getElementById("data").innerHTML="Please enter url to shortify";
  }else {
  checkAndShortURL(userUrl);
  }
}

function checkAndShortURL(userUrl) {
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
          if (responseData.id != null) {
          var report;
          report="<span class=\"badge badge-primary\">Short url</span><br /><br /><a href=\""+responseData.id+"\"target=\"_blank\">" + responseData.id + "</a>";
          var sharelink="<br /><a href=\"http://www.facebook.com/sharer.php?u=" + responseData.id +"\" target=\"_blank\"><img src=\"http://www.simplesharebuttons.com/images/somacro/facebook.png\" alt=\"Facebook\" /></a>" + 
          "<a href=\"http://twitter.com/share?url=" + responseData.id +"&text=via chrome shortify\" target=\"_blank\"><img src=\"http://www.simplesharebuttons.com/images/somacro/twitter.png\" alt=\"Twitter\" /></a>" +
          "<a href=\"https://plus.google.com/share?url=" + responseData.id +"\" target=\"_blank\"><img src=\"http://www.simplesharebuttons.com/images/somacro/google.png\" alt=\"Google\" /></a>" +
          "<a href=\"http://www.digg.com/submit?url=" + responseData.id +"&text=via chrome shortify\" target=\"_blank\"><img src=\"http://www.simplesharebuttons.com/images/somacro/diggit.png\" alt=\"Digg\" /></a>" +
          "<a href=\"http://www.linkedin.com/shareArticle?mini=true&url=" + responseData.id +"\" target=\"_blank\"><img src=\"http://www.simplesharebuttons.com/images/somacro/linkedin.png\" alt=\"LinkedIn\" /></a>" +
          "<a href=\"mailto:?Subject=Via Chrome Shortify&Body=I%20saw%20this%20and%20thought%20of%20you!%20 "+ responseData.id +"\" target=\"_blank\"><img src=\"http://www.simplesharebuttons.com/images/somacro/email.png\" alt=\"Email\" /></a>";

          document.getElementById("data").innerHTML=report;
          document.getElementById("sharelink").innerHTML=sharelink;
        }else{
          document.getElementById("data").innerHTML="Try again!";
        }
        } else if (xmlhttp.status==400){
          document.getElementById("data").innerHTML="Oops! we know what went wrong, we will fix it soon.";
        }
      }
    var APIKEY="YOUR_KEY";
    var apiURL="https://www.googleapis.com/urlshortener/v1/url?key=" + APIKEY;
    xmlhttp.open("POST",apiURL,true);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.send(JSON.stringify({longUrl:userUrl}));  
}