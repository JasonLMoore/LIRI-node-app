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

////////////////////////////////////////////////////////////////

//'concert-this'//
  //`node liri.js concert-this <artist/band name here>`//
var concertThis = function() {
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

};
console.log(concertThis());
/////////////////////////////////////////////////////////////////



//'movie-this'//
var movieThis = function(movie) {
  if (movie === undefined) {
    movie = "Mr Nobody";
  }

  var fullURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
  axios.get(fullURL).then(
    function(response) {
      var resDotData = response.data;
      
      console.log("Title: " + resDotData.Title);
      console.log("Year: " + resDotData.Year);
      console.log("Rated: " + resDotData.Rated);
      console.log("IMDB Rating: " + resDotData.imdbRating);
      console.log("Country: " + resDotData.Country);
      console.log("Language: " + resDotData.Language);
      console.log("Plot: " + resDotData.Plot);
      console.log("Actors: " + resDotData.Actors);
      console.log("Rotten Tomatoes Rating: " + resDotData.Ratings[0].Value);
    }
  );
};
console.log(movieThis());
////////////////////////////////////////////////////////////////////////////



//`spotify-this-song`//

//Function gets artist name//
var getArtist = function(artist) {
  return artist.name;
};

//runs Spotify Search//
var spotifySearch = function(songName) {
  if (songName === undefined) {
    songName = "The Sign";
  }

  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtist));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );
};
console.log(spotifySearch());
//////////////////////////////////////////////////////
//`do-what-it-says`//
  //`node liri.js do-what-it-says`//
  //Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.//
  //It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.//
  //Edit the text in random.txt to test out the feature for movie-this and concert-this.//
//