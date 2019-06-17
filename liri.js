//read and set any enviro vars with 'dotenv' package//
require("dotenv").config();

//requires and imports 'keys.js' and stores it in a var//
const keys = require("./keys.js");

//node api reqs//
  //note the capital first letter for the var//
const Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');

//access keys info//
const spotify = new Spotify(keys.spotify);

////////////////////////////////////////////////////////////////

//'concert-this'//

//`node liri.js concert-this <artist/band name here>`//

let concertThis = function() {
  let nodeArgs = process.argv
  let artist = "";

  for (let i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
      artist = artist + "+" + nodeArgs[i];
    }
    else {
      artist += nodeArgs[i];
    }
  }

  let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  console.log("Query URL is " + queryURL);

  axios.get(queryURL).then(
    function(response) {
      let resData = response.data[0];
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
/////////////////////////////////////////////////////////////////

//'movie-this'//

//`node liri.js movie-this '<movie name here>'`//

let movieThis = function(movie) {
  if (movie === undefined) {
    movie = "Mr Nobody";
  }

  let fullURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
  axios.get(fullURL).then(
    function(response) {
      let resDotData = response.data;
      
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
////////////////////////////////////////////////////////////////////////////

//`spotify-this-song`//

//`node liri.js spotify-this-song '<song name here>'`//

//Function gets artist name//
let getArtist = function(artist) {
  return artist.name;
};

//runs Spotify Search//
let spotifySearch = function(songName) {
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

      let songs = data.tracks.items;

      for (let i = 0; i < songs.length; i++) {
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
//////////////////////////////////////////////////////

//do-what-it-says//

//`node liri.js do-what-it-says`//

//runs command based on txt file//
let doTxt = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log("Txt data: " + data);

    let dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};
/////////////////////////////////////////////////////////////

//determins which command is used//
let pick = function(caseData, functionData) {
  switch (caseData) {
  case "concert-this":
    concertThis(functionData);
    break;
  case "spotify-this-song":
    spotifySearch(functionData);
    break;
  case "movie-this":
    movieThis(functionData);
    break;
  case "do-what-it-says":
    doTxt();
    break;
  default:
    console.log("I'm affraid I can't do that friend.");
  }
};
/////////////////////////////////////////////////////////////

//takes in command line arg -> execute coresponding function//
let runThatBack = function(argOne, argTwo) {
  pick(argOne, argTwo);
};
/////////////////////////////////////////////////////////////////

//main process//
runThatBack(process.argv[2], process.argv.slice(3).join(" "));