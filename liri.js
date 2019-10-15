require('dotenv').config();

// var keys = require('./keys.js');
var inquirer = require('inquirer');
var moment = require('moment');
moment().format();
var fs = require('fs');
var axios = require('axios');
// var Spotify = ('node-spotify-api');
// var spotify = new Spotify(keys.spotify);


inquirer
.prompt([
    {
        type: "input",
        message: "What's your name?",
        name: "username",
    },

    {
        type: "list",
        message: "What are you looking for; movies, concerts or spotify songs?",
        choices: ['movie-this', 'spotify-this', 'concert-this', 'do-what-it-says'],
        name: 'choice',
    }
])
.then(function(user){
    if(user.choice === 'movie-this'){
        console.log(`Hello ${user.username} lets find your cinematic experience!`)
        inquirer
        .prompt([
            {
                type:'input',
                message: 'What movie are you looking for?',
                name: 'movie',
        
            }
        ])
        .then(function(res){
            if(res.movie === "" || res.movie === null){
                console.log('Sorry you did not pick a movie');
            }else{
                var queryURL = "http://www.omdbapi.com/?t=" + res.movie + "&y=&plot=short&apikey=47aab339";
                // console.log(queryURL);
                axios.get(queryURL).then(function(response){
                    // console.log(response)
                    if(response.data.Error){
                        console.log("Movie was not found sorry, look again or for something new.")
                    }else if(response.data){
                        console.log(`Title: ${response.data.Title}`);
                        console.log(`Released: ${response.data.Released}`)
                        console.log(`Rated: ${response.data.Rated}`)
                        console.log(`Runtime: ${response.data.Runtime}`)
                        console.log(`Genre: ${response.data.Genre}`)
                        console.log(`Director: ${response.data.Director}`)
                        console.log(`Plot: ${response.data.Plot}`)
                    }   
            fs.appendFile('log.txt', `\nMovie: ${res.movie}`, function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log(`Movie ${res.movie} has been added to log.txt file`)
                }
            })
        })
    }
    });
}else if(user.choice === 'concert-this'){
    console.log(`Hello ${user.username}`);
inquirer
.prompt([
       {
           type: 'input',
           message: 'What Concert are you interested in?',
           name: 'concert',
       }
    ])
.then(function(res){
    var artist = res.concert
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    if(artist === "" || artist === null){
        console.log('Please put in artist')
    }else{
        axios.get(queryURL).then(function(response){
            console.log(response)
            for(i = 0; i < response.data.length; i++){
                let date = moment(response.data[i].datetime).format('MM/DD/YYYY')
                console.log(`Venue name: ${response.data[i].venue.name}`);
                console.log(`Lineup: ${response.data[i].venue.lineup}`);
                console.log(`Country: ${response.data[i].venue.country}`);
                console.log(`${date}`);
            }
            fs.appendFile('log.txt', `\nConcert: ${artist}`, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log(`Concert ${artist} has been added to log.txt file.`);
                }
            })
        })
    }
})   
}
// Start the next choice here
});
    


