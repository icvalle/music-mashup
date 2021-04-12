var searchFormEl = document.getElementById("startSearchBtn");

function searchFormSubmit(event) {
	event.preventDefault();
	$('#searchLabel').append("");
	var artistInputVal = document.getElementById("artistInput").value;
	var songInputVal = document.getElementById("songInput").value;
  
	if (!artistInputVal && !songInputVal && !lyricsInputVal) {
		function alertErrorMsg() {
			$('#searchLabel').append(' <span class="errorMsg">* You need an artist or song to start the search!</span>');
		}
		alertErrorMsg();
		setTimeout(function(){ $('#searchLabel').text("Search:"); }, 5000);
	  return;
	}
  
	var queryString = './search-results.html?q=' + artistInputVal + '&' + songInputVal;

	console.log(queryString);
  
	location.assign(queryString);
  }

  searchFormEl.addEventListener('click', searchFormSubmit);
