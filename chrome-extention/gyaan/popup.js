// Run our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  getMostPopularSongs("week"); //can be - 24hrs/week/month/alltime
  getHotSongs();
  var d = new Date();
  var n = d.getFullYear();
  document.getElementById("credit").innerHTML="&copy<a href=\"http://hardyhawks.in\">hardyhawks.com</a> " + n + " | powered by <a href=\"http://gaana.com/\">Gaana.com</a>";
});

function getMostPopularSongs(timeFrame) {
    var url="http://api.gaana.com?type=song&subtype=most_popular&format=json&order=" + timeFrame;
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
          reportData="<h3>Popular Songs</h3><hr /><div>";
          var rank=1;
          for (var i=0; i < responseData.tracks.length; i++) {
              reportData=reportData+"<div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"img-thumbnail media-object\" src="+responseData.tracks[i].artwork+"></a>"+ 
              "<div class=\"media-body\"><span class=\"badge\">#"+ rank +"</span> <a href=http://gaana.com/song/" + responseData.tracks[i].seokey
              + " target=_blank>"+responseData.tracks[i].track_title+
              "</a><br /><b>Album:</b> " +responseData.tracks[i].album_title+
              "<br />";
              if (responseData.tracks[i].video_url != "") {
                reportData= reportData + "<b>Youtube:</b> <a href=\"http://"+responseData.tracks[i].video_url+" target=_blank>"+
              responseData.tracks[i].video_url +"\">link</a><br />";
              }
              reportData= reportData + "<b>Artist:</b>";
              for (var j=0; j < responseData.tracks[i].artist.length; j++) {
                reportData= reportData+responseData.tracks[i].artist[j].name;
		if (j != responseData.tracks[i].artist.length -1)
			reportData += ", ";
              }
              reportData = reportData + "<br /><b>Genre:</b>";
              for (var k=0; k < responseData.tracks[i].gener.length; k++) {
                reportData= reportData+responseData.tracks[i].gener[k].name;
		if (k != responseData.tracks[i].gener.length -1)
			reportData += ", ";
              }
              reportData=reportData + "</div></div><hr />";
              rank++;
          }
          reportData=reportData+"</div>";
          document.getElementById("popular").innerHTML=reportData;
        }
      }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();  
}

function getHotSongs() {
    var url="http://api.gaana.com?type=song&subtype=hot_songs";
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
          reportData="<h3>Hot Songs</h3><hr /><div>";
          var rank=1;
          for (var i=0; i < responseData.tracks.length; i++) {
              reportData=reportData+"<div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"img-thumbnail media-object\" src="+responseData.tracks[i].artwork+"></a>"+ 
              "<div class=\"media-body\"><span class=\"badge\">#"+ rank +"</span> <a href=http://gaana.com/song/" + responseData.tracks[i].seokey
              + " target=_blank>"+responseData.tracks[i].track_title+
              "</a><br /><b>Album:</b> " +responseData.tracks[i].album_title+
              "<br />";
              if (responseData.tracks[i].video_url != "") {
                reportData= reportData + "<b>Youtube:</b> <a href=http://"+responseData.tracks[i].video_url+" target=_blank>"+
              responseData.tracks[i].video_url + "</a><br />";
              }
              reportData= reportData + "<b>Artist:</b>";
              for (var j=0; j < responseData.tracks[i].artist.length; j++) {
                reportData= reportData+responseData.tracks[i].artist[j].name;
		if (j != responseData.tracks[i].artist.length -1)
			reportData += ", ";
              }
              reportData = reportData + "<br /><b>Genre:</b>";
              for (var k=0; k < responseData.tracks[i].gener.length; k++) {
                reportData= reportData+responseData.tracks[i].gener[k].name;
		if (k != responseData.tracks[i].gener.length -1)
			reportData += ", ";
              }
              reportData=reportData + "</div></div><hr />";
              rank++;
          }
          reportData=reportData+"</div>";
          document.getElementById("hot").innerHTML=reportData;
        }
      }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();  
}

function restClient(url) {
    
}
