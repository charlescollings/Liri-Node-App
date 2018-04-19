require("dotenv").config();
var request = require("request");
var keyFile = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keyFile.spotify);
var client = new Twitter(keyFile.twitter);
console.log(client)

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

      client.get('statuses/user_timeline', function(error, tweets, response) {
        if(error) {
            console.log(error)
        };
        console.log(tweets);  // The favorites. 
        for (let i=0; i < 20; i++) {
            console.log(tweets[i].text)
        }
        // console.log(response);  // Raw response object. 
      });

    // if (inquirerResponse.chooseCommand === 'my-tweets') {
    // // This will show your last 20 tweets and when they were created at in your terminal/bash window.
// 
    //   // We then run the request module on a URL with a JSON
    //     request("https://api.twitter.com/1.1/search/tweets.json?q=@ccCoder17&count=20", function(error, response, body) {
    //         // If there were no errors and the response code was 200 (i.e. the request was successful)...
    //         if (!error && response.statusCode === 200) {       
    //           // Then we print out the imdbRating
    //           console.log("Last 20 tweets: " + JSON.parse(body));
    //         }
    //       });
    // }


  });

  // if input = "my-tweets" then show last 20 tweets in terminal