// Our Twitter library
var Twit = require('twit');


var dataTwit = '';

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
var mediaArtsSearch = {q: "#parametric", count: 2, result_type: "recent"}; 

// This function finds the latest tweet with the provided hashtag, and retweets it.
function retweetLatest() {
	T.get('search/tweets', mediaArtsSearch, function (error, data) {
	  // log out any errors and responses
	  //console.log(data);
	  statuses = data.statuses;

	  for(var i in statuses) {
	  	var status = statuses[i];
	  	
	  }

	/*  for(var i in dataTwit){
	var d = dataTwit[i];
	console.log(i + '>> ' + d.text);
}*/
	});
}

// Try to retweet something as soon as we run the program...
retweetLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 60);


