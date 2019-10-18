require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");
var SpotifyAPI = require("node-spotify-api");
var spotify = new SpotifyAPI(keys.spotify);


var eventChoice = process.argv[2]
var userChoice = process.argv.slice(3).join(" ");

function liriStart(eventChoice, userChoice){
    switch(eventChoice){
        case "movie-this":
            movieThis(userChoice);
            break;
        case "concert-this":
            concertThis(userChoice);
            break;
        case "spotify-this-song":
            spotifyThis(userChoice);
            break;
        case "do-what-it-says":
            doWhatISay();
            break;
        default:
            console.log("Please pick from movie-this, concert-this, spotify-this-song and do-what-it-says")
            

    }
}
liriStart(eventChoice, userChoice);

function movieThis(userChoice){
    // console.log(`Searching for ${userChoice}`)
    if(userChoice === ""){
        userChoice = "Mr. Nobody"
        axios.get("http://www.omdbapi.com/?t="+ userChoice +"&y=&plot=short&apikey=47aab339").then(function(response){
            // console(response)
    });
    }
    var queryURL = "http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=47aab339";
    // console.log(queryURL)
    axios.get(queryURL).then(function(response){
        console.log(response)
    if(response.data.Response !== 'False'){
            console.log('\n==========================================================================')
            console.log(`Title: ${response.data.Title}`);
            console.log(`Year: ${response.data.Year}`)
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[0].Value}`);
            console.log(`IMDB Rating: ${response.data.imdbRating}`);
            console.log(`Country: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);
    fs.appendFile('log.txt', `\nMovie: ${userChoice}`, function(err){
        if(err){
            console.log(err)
        }else{
            console.log(`Movie ${userChoice} has been added to your search`)
        }
    })
    }else{
        console.log(`Sorry movie was not found`)
    }
    })
}

function concertThis(userChoice){
    var queryURL = "https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(response){
        // console.log(response)
        if(response.data.length !== 0){
            for(i =0; i < response.data.length; i++){
                var date = moment(response.data[i].datetime).format('MM/DD/YYYY')
                console.log(`Artist: ${userChoice}`)
                console.log(`Venue: ${response.data[i].venue.name} `)
                console.log(`City ${response.data[i].venue.city}`)
                console.log(`Date: ${date}`)
            }
            fs.appendFile('log.txt', `\nConcert: ${userChoice}`, function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log(`Concert ${userChoice} has been added to your search`)
                }
            })
        }else{
            console.log(`Sorry concert was not found`)
        }
    })
}

function spotifyThis(userChoice){
    if(userChoice === "")
    userChoice= "The Sign Ace of Base"
    spotify.search({type: 'track', query: userChoice, limit: 1})
    .then(function(response){
        // console.log(response)
    for(i = 0; i < response.tracks.items.length; i++){
    }
    })
        spotify
        .search({type: 'track', query: userChoice, limit: 3})
        .then(function(response){
            // console.log(response)
        if(response.tracks.items.length !== 0){
        for( i = 0; i < response.tracks.items.length; i++){
            console.log("\n===============================================")
            console.log(`Song: ${response.tracks.items[i].name}`)
            console.log(`Artist: ${response.tracks.items[i].album.artists[0].name}`);
            console.log(`Spotify Preview: ${response.tracks.items[i].album.external_urls.spotify}`);
            console.log(`Album: ${response.tracks.items[i].album.name}`);
            console.log(`Release Year: ${response.tracks.items[i].album.release_date}`);
            console.log(`Preview: ${response.tracks.items[i].preview_url}`);
            console.log("\n===============================================")
        }
        fs.appendFile('log.txt', `\nSong: ${userChoice}`, function(err){
            if(err){
                console.log(err)
            }else{
                console.log(`Song ${userChoice} has been added to your search`)
            }
        })
    }else{
        console.log('Sorry no song')
    }
    })
    
}

