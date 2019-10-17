# liri-node-app
Siri, who needs Siri????? Liri will solve all your entertainment needs!

--Liri will search Spotify for your favorite songs. Liri will provide you with the following information;
o	The Song-(that you searched)
o	The Artist
o	Spotify preview –(A link where you can listen to the song)
o	The Album
o	Year the song was released.
o	Three searches will be provided to make sure it’s the correct song you are looking for.
Liri will look just for an artist too. Liri will provide all the same information, with just the song choice changing for every search found.

--Liri will search Bands in Town for concerts. Looking for a great evening out on the town or a great vacation,  Liri will provide you with the following information.
o	Artist that you Search
o	Venue name 
o	Venue Location using longitude and latitude 
o	Lineup for that night
o	Country where the venue/concert is located

--Want to stay in for the night???? Liri can help you with that too, Liri will search
OMDB for movies. Liri will provide you with the following information.
o	Title 
o	Year it was released
o	Rating of the movie
o	Genre of the movie
o	Director of the movie
o	Plot of the movie
Last option that Liri will give you is, Liri’s option. With this Liri will provide you with a wonderful musical choice.

Getting Started:

In your command line run: node liri.js,

A prompt will pop up asking for your name
o	Enter your name
After entering your name, another prompt will ask you to choose from movie-this, Spotify-this, concert-this and do-what-it-says.

Once you have made a choice and depending on your choice, liri will ask what
you are looking for. Once liri finds that information using an API call, liri
will provide you with the information for your choice.

Liri will also keep a list of all your searched on the log.txt file.


API’s

Node-Spotify-Api
OMBD API
Bands In Town API

Dependencies:
o	dotenv 
o	inquirer  
o	moment
o	axios
o	fs
o	node-spotify-apt
o	spotify

Author

Richard J Nulanz
