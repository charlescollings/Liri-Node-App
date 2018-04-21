require("dotenv").config();
var request = require("request");
var keyFile = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keyFile.spotify);
var client = new Twitter(keyFile.twitter);

// get user input from terminal
var inquirer = require('inquirer');

inquirer
  .prompt([
    {
        type: "list",
        message: "Choose a command?",
        choices: [`my-tweets`, `spotify-this-song`, `movie-this`, `do-what-it-says`],
        name: "chooseCommand"
      },
  ])
  .then(function(inquirerResponse) {
      console.log(inquirerResponse.chooseCommand)

    if (inquirerResponse.chooseCommand === `my-tweets`) {
        client.get('statuses/user_timeline', function(error, tweets, response) {
          if(error) {
              console.log(error)
          };
          for (let i=0; i < 20; i++) {
              console.log(tweets[i].text)
          }
        });
    }
    else if (inquirerResponse.chooseCommand === `spotify-this-song`) {
        console.log("Spotify chosen")
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Type song name here:",
                    name: "songName"
                },
            ])
            .then(function(inquirerResponse) {
                console.log(inquirerResponse.songName)

                spotify.search({ type: 'track', query: inquirerResponse.songName, limit: 1}, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }
                    console.log(data.tracks.items[0].artists[0].name); 
                    console.log(data.tracks.items[0].name);
                    console.log(data.tracks.items[0].preview_url);
                    console.log(data.tracks.items[0].album.name);
                    // let artists = data.tracks.items[0].artists;
                    // artists.forEach(el => console.log(el.name));
                });
            });

    }
    else if (inquirerResponse.chooseCommand === `movie-this`) {

    }
    else if (inquirerResponse.chooseCommand === `do-what-it-says`) {

    }
 

  });