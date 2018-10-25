var readline = require('readline');
var Twit = require('twit');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Settings
var queries = ['#arquitectura #design',
			   '#architecture',
			   '#diseño #parametrico',
			   '#parametric #design',
			   '#art',
			   '#drawing',
			   '#apps',
			   '#developers',
			   '#app #ios',
			   '#augmentedreality',
			   '#código #arquitectura',
			   '#programación',
			   '#desarrolladores',
			   '#aplicaciones #ios',
			   '#diseñadores',
			   '#ingenieros',
			   '#desarrolladores #swift',
			   '#swift developers',
			   '#urbandesign',
			   '#entrepreneurship',
			   '#writing #longform'];
var idx = 0;

rl.question("What to Favorite on Twitter? > ", function(answer) {

// We need to include our configuration file
var T = new Twit(require('./config.js'));
//queries = answer.split(',');

// This function finds the latest tweet with the provided hashtag, and retweets it.
function favoriteLatest() {

	var query = queries[idx];
	console.log('\r\n\r\n-------------' + query + '['+idx + ']');

	// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
	var mediaSearch = {q: query, count: 6, result_type: "recent"}; 

	T.get('search/tweets', mediaSearch, function (error, data) {
	  // log out any errors and responses
	  //console.log(data);
	  let statuses = data.statuses;

	  if (statuses.length > 0) {

	  for(var i in statuses) {
	  	var status = statuses[i];
	  	console.log(i + ') ' + status.text + '\r\n');
	  }

	  //----------------
		
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		//T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
		T.post('favorites/create', { id: retweetId }, function (error, response) {			
			if (response) {
				console.log('Success! Check your bot, it should have favorited something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	  
	  //----------------

		}
	});

	idx++;
	if(idx > queries.length-1)
	{
		idx = 0;
	}
}

// Try to retweet something as soon as we run the program...
favoriteLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
//setInterval(retweetLatest, 1000 * 60 * 60);
var minutesToMilliseconds = 1000 * 60;
var secondsToMilliseconds = 1000;
var minutes = 5 * minutesToMilliseconds;
var seconds = 15 * secondsToMilliseconds;
setInterval(favoriteLatest, seconds);

  rl.close();
});
