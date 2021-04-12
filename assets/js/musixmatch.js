var track = prompt("Enter track. Leave blank if unknown.");
var artist = prompt("Enter artist. Leave blank if unknown.");
var lyrics = prompt("Enter lyrics. Leave blank if unknown.");
lyrics = lyrics.replace(" ", "%20");

//var api_key = "4b67acae62e7e4fd972ec37a8881242b";

var searchurl = "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=" + track + "&q_artist=" + artist + "&f_has_lyrics=" + lyrics + "&quorum_factor=1&apikey=4b67acae62e7e4fd972ec37a8881242b";

function lyric(file) {
	let startIndex = file.search("lyrics_body") + 14;
	let endIndex = startIndex + 250;
	file = file.slice(startIndex, endIndex) + "...";
	console.log(file);
}

function artists(file) {
	var cond = file.search("track_name");
	while (cond != -1){
		let startIndex = file.search("artist_name") + 14;
		let endIndex = file.search("track_share_url") - 3;
		var singer = file.slice(startIndex, endIndex);
		startIndex = file.search("track_name") + 13;
		endIndex = file.search("track_name_translation_list") - 3;
		var title = file.slice(startIndex, endIndex);
		startIndex = file.search("album_name") + 13;
		endIndex = file.search("artist_id") - 3;
		var album = file.slice(startIndex, endIndex);
		startIndex = file.search("track_id") + 10;
		endIndex = file.search("track_name") - 2;
		var trackid = file.slice(startIndex, endIndex);
		console.log(title + " by " + singer + " in " + album + " (track id = " + trackid + ")");
		var lyricsurl = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + trackid + "&apikey=4b67acae62e7e4fd972ec37a8881242b"
		fetch(lyricsurl)
			.then(response => response.text())
			.then(data => (lyric(data)));
		file = file.replace("artist_name", "done");
		file = file.replace("track_share_url", "done");
		file = file.replace("track_name", "done");
		file = file.replace("track_name_translation_list", "done");
		file = file.replace("album_name", "done");
		file = file.replace("artist_id", "done");
		cond = file.search("track_name");
	}
}

fetch(searchurl)
	.then(response => response.text())
	.then(data => (artists(data)));

/* js for lyric page
function lyric(file) {
	let startIndex = file.search("lyrics_body") + 14;
	let endIndex = file.search("script_tracking_url") - 3;
	file = file.slice(startIndex, endIndex);
	console.log(file);
}

var lyricsurl = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + trackid + "&apikey=4b67acae62e7e4fd972ec37a8881242b"

fetch(lyricsurl)
	.then(response => response.text())
	.then(data => (lyric(data)));
*/


