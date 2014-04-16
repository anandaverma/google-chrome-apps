// Run our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  getMostPopularSongs("week"); //can be - 24hrs/week/month/alltime
  document.querySelector('button').addEventListener('click', clickHandler);
});

function clickHandler(e) {

}

function getMostPopularSongs(timeFrame) {
    var url="http://api.gaana.com?type=song&subtype=most_popular&format=json&order=" + timeFrame;
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
    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
          responseData=JSON.parse(xmlhttp.responseText);
          reportData="<table>";
          for (var i=0; i < responseData.tracks.length; i++) {
              reportData=reportData+"<tr><td><img src="+responseData.tracks[i].artwork+"></td><td>"+ 
              "<b>Title:</b> " +responseData.tracks[i].track_title+
              "<br /><b>Album:</b> " +responseData.tracks[i].album_title+
              "</td></tr>";
          }
          reportData=reportData+"</table>";
          document.getElementById("data").innerHTML=reportData;
        }
      }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();  
}
