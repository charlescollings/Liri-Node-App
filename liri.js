require("dotenv").config();
var fs = require('fs');
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
            inquirer
            .prompt([
                {
                    type: "input",
                    message: "Type song name here:",
                    name: "songName"
                },
            ])
            .then(function(inquirerResponse) {
                spotify.search({type: 'track', query: inquirerResponse.songName, limit: 1}, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }
                    console.log(data.tracks.items[0].artists[0].name); 
                    console.log(data.tracks.items[0].name);
                    console.log(data.tracks.items[0].preview_url);
                    console.log(data.tracks.items[0].album.name);
                });
            });
        }
        else if (inquirerResponse.chooseCommand === `movie-this`) {
            inquirer
            .prompt([
                {
                    type: "input",
                    message: "Type movie name here:",
                    name: "movieName"
                },
            ])
            .then(function(inquirerResponse) {
                console.log(inquirerResponse.movieName)
                request("http://www.omdbapi.com/?t=" + inquirerResponse.movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
                    if (!error && response.statusCode === 200) {
                       console.log("The movie's title is: " + JSON.parse(body).Title);
                       console.log("The movie came out in: " + JSON.parse(body).Year);
                       console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
                       console.log("The Rotten Tomatos rating is: " + JSON.parse(body).Ratings[1].Value);
                       console.log("The movie was produced in: " + JSON.parse(body).Country);
                       console.log("The movie is in: " + JSON.parse(body).Language);
                       console.log("Plot: " + JSON.parse(body).Plot);
                       console.log("Starring: " + JSON.parse(body).Actors);
                    }
                });
            })
        }
        else if (inquirerResponse.chooseCommand === `do-what-it-says`) {
            fs.readFile("random.txt", "utf8", function(error, data) {
                if (error) {
                  return console.log(error);
                }
                var dataArr = data.split(",");

                if (dataArr[0] === "spotify-this-song") {
                    spotify.search({type: 'track', query: dataArr[1], limit: 1}, function(err, data) {
                        if (err) {
                          return console.log('Error occurred: ' + err);
                        }
                        console.log(data.tracks.items[0].artists[0].name); 
                        console.log(data.tracks.items[0].name);
                        console.log(data.tracks.items[0].preview_url);
                        console.log(data.tracks.items[0].album.name);
                    });
                }
            
            });
        }
    });