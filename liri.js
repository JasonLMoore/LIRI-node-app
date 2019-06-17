//read and set any enviro vars with 'dotenv' package//
require("dotenv").config();

//requires and imports 'keys.js' and stores it in a var//
var keys = require("./keys.js");

//node api reqs//
  //note the capital first letter for the var//
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

//access keys info//
var spotify = new Spotify(keys.spotify);

//'concert-this'//
  //`node liri.js concert-this <artist/band name here>`//
//

//concertThis = function() {
  //var nodeArgs = process.argv
  var artist = "ZZ Top";

  //for (var i = 2; i < nodeArgs.length; i++) {
    //if (i > 2 && i < nodeArgs.length) {
      //artist = artist + "+" + nodeArgs[i];
    //}
    //else {
      //artist += nodeArgs[i];
    //}
  //}

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  console.log("Query URL is " + queryURL);

  axios.get(queryURL).then(
    function(response) {
      var resData = response.data[0];
      console.log("Next performance for " + artist + " :");
      console.log(
        resData.venue.city + ", " +
        (resData.venue.region || resData.venue.country) +
        " at " + resData.venue.name +
        " on " + moment(resData.datetime).format("MM/DD/YYYY")
      );
    }
  )

//};

//console.log("concert this" + concertThis());

//`spotify-this-song`//
  //`node liri.js spotify-this-song '<song name here>'`//
    //This will show the following information about the song in your terminal/bash window//
      //Artist(s)//
      //The song's name//
      //A preview link of the song from Spotify//
      //The album that the song is from//
      //SEE HW INSTRUCTIONS FOR FURTHER REQS//
//

//`movie-this`//
  //`node liri.js movie-this '<movie name here>'`//
    //This will output the following information to your terminal/bash window://
      //Title of the movie.//
      //Year the movie came out.//
      //IMDB Rating of the movie.//
      //Rotten Tomatoes Rating of the movie.//
      //Country where the movie was produced.//
      //Language of the movie.//
      //Plot of the movie.//
      //Actors in the movie.//
      //SEE HW INSTRUCTIONS FOR FURTHER REQS//
//

//`do-what-it-says`//
  //`node liri.js do-what-it-says`//
    //Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.//
      //It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.//
      //Edit the text in random.txt to test out the feature for movie-this and concert-this.//
//