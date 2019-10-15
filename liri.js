require('dotenv').config();

var keys = require('./keys.js');
var inquirer = require('inquirer');
var moment = require('moment');
moment().format();
var fs = require('fs');
var axios = require('axios');
var Spotify = require('node-spotify-api');
var spotifyObject = new Spotify(keys.spotify);


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
                        console.log("Movie was not found sorry, look again or look for something new.")
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
                console.log(`Lineup: ${response.data[i].lineup}`);
                console.log(`Country: ${response.data[i].venue.country}`);
                console.log(`${date}`);
                console.log("----------------------------------------------------------")
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
}else if(user.choice === 'spotify-this'){
    console.log(`Hello ${user.username} lets get to rockin' out.`)
    inquirer
    .prompt([
        {
            type:"input",
            message: "What song would you like to listen to?",
            name: "track"
        }
    ])
.then(function(result){
    if(result.track=== ""){
        console.log('No song was entered, please go back and enter a valid song.')
    } else{
        spotifyObject
        .search({type: 'track', query: result.track})
        .then(function(response){
            console.log(response.tracks.items);
            for(i = 0; i < response.tracks.items.length; i++){
                console.log("\n===================================")
                console.log(`Song:  ${response.tracks.items[i].name}`);
                console.log(`Artist: ${response.tracks.items[i].album.artists[0].name}`);
                console.log(`Spotify Preview: ${response.tracks.items[i].album.external_urls.spotify}`);
                console.log(`Album: ${response.tracks.items[i].album.name}`);
                console.log(`Release Year: ${response.tracks.items[i].album.release_date}`);
                console.log(`Preview: ${response.tracks.items[i].preview_url}`);
            }
        })
    }
})    
}
});
    


