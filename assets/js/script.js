
var apiKey = "60ad462c9bff52e81700f57b3ba8db73";

var searchResultEl = document.getElementById('search-results');

var artistInputEL = document.getElementById("artistInput");
var songInputEL = document.getElementById("songInput");

function getParams() {
	var searchParamArr = document.location.search.split('&');

	var singer = searchParamArr[0].split('=').pop();
	var title = searchParamArr[1];

	console.log(singer);
	console.log(title);

	searchMusicMatch(singer, title);

}

function searchMusicMatch(singer, title) {
	var queryUrl = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=";

	if (singer || title) {
		queryUrl = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=" + title + "&q_artist=" + singer + "&quorum_factor=1&apikey=" + apiKey;

		console.log(queryUrl);

		fetch(queryUrl)
	.then(response => response.text())
	.then(data => (artists(data)));
	}
}

function lyric(file) {
	let startIndex = file.search("lyrics_body") + 14;
	let endIndex = file.search("script_tracking_url") - 3;
	file = file.slice(startIndex, endIndex);
	file = file.split("\\n");
	while (file.length != 0) {
		let lyrics = file.shift();
		printLyrics(lyrics);
	}
}
	

var title = "";
var singer = "";

function artists(file) {
	var startIndex = file.search("artist_name") + 14;
	var endIndex = file.search("track_share_url") - 3;
	singer = file.slice(startIndex, endIndex);
	startIndex = file.search("track_name") + 13;
	endIndex = file.search("track_name_translation_list") - 3;
	title = file.slice(startIndex, endIndex);
	startIndex = file.search("album_name") + 13;
	endIndex = file.search("artist_id") - 3;
	var album = file.slice(startIndex, endIndex);
	startIndex = file.search("track_id") + 10;
	endIndex = file.search("track_name") - 2;
	var trackid = file.slice(startIndex, endIndex);
	console.log(title + " by " + singer + " in " + album);
	printResults(singer, title, album);
	var lyricsurl = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + trackid + "&apikey=" + apiKey;
	fetch(lyricsurl)
		.then(response => response.text())
		.then(data => (lyric(data)));

}

// $('#startSearchBtn').click(function(event){
//   fetch(url)
//     .then(response => response.text())
//     .then(data => (artists(data)));
// });

    
// var youTubeApiKey = 'AIzaSyAMgCp_vfENiw84ymkpYJyxJrT8pY1BuPI';


var searchResultEl = document.getElementById('search-results');

var searchBtn = document.getElementById("searchBtn");

var searchFormEl = document.querySelector(".search-form");

//var api_key = "4b67acae62e7e4fd972ec37a8881242b";

// var url = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=" + track + "&q_artist=" + artist + "&f_has_lyrics=" + lyrics + "&quorum_factor=1&apikey=4b67acae62e7e4fd972ec37a8881242b";

searchBtn.addEventListener("click", searchCriteria);

function searchCriteria() {

    var track = document.getElementById("title-input").value;
    var artist = document.getElementById("artist-input").value;
    var lyrics = document.getElementById("lyrics-input").value;
	lyrics = lyrics.replace(" ", "%20");
	
	if (!track && !artist && !lyrics) {
		alert("enter search criteria")
		return;
	}

    var url = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=" + track + "&q_artist=" + artist + "&f_has_lyrics=" + lyrics + "&quorum_factor=1&apikey=" + apiKey;

    fetch(url)
	.then(response => response.text())
	.then(data => (artists(data)));

	console.log(artist);
	console.log(track);
	console.log(lyrics);
}


function searchLyrics() {

	var lyrics = document.getElementById("lyrics-input").value;
	lyrics = lyrics.replace(" ", "%20");
	
	console.log(lyrics);


	fetch(lyricsurl)
			.then(response => response.text())
			.then(data => (lyric(data)));
}

function printResults(singer, title, album) {

var resultCard = document.createElement("div");
resultCard.classList.add("resultCards");

var titleResultEl = document.createElement('h2');
titleResultEl.textContent = title;
resultCard.append(titleResultEl);

var bandNameEl = document.createElement('h3');
bandNameEl.textContent = singer
resultCard.append(bandNameEl);

var albumNameEl = document.createElement('p');
albumNameEl.textContent = album
resultCard.append(albumNameEl);

searchResultEl.append(resultCard);

}

function printLyrics(lyrics) {
	var resultCard = document.createElement("div");
	resultCard.classList.add("resultCards");

	var lyricsResultEl = document.createElement('p');
	lyricsResultEl.textContent = lyrics;
	resultCard.append(lyricsResultEl);

	searchResultEl.append(resultCard);

}

getParams();

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function loadClient() {
gapi.client.setApiKey("AIzaSyCca8rQR8QxV61lfFtVgZNzTRnVP-uG3E0");
return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function() { console.log("GAPI client loaded for API"); },
          function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute(query) {
return gapi.client.youtube.search.list({
  "part": [
    "snippet"
  ],
  "q": title + " by " + singer
})
    .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            Youtubeplayer(response.result.items[0].id.videoId);
          },
          function(err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function() {
gapi.auth2.init({client_id: "373154855588-0drfdp07910ghlo83pthgc9ovh7bskpp.apps.googleusercontent.com"});
});

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function Youtubeplayer(video) {
player = new YT.Player('ytplayer', {
  height: '360',
  width: '439',
  videoId: video
});
}





