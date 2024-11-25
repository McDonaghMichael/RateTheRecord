const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

const albums = [{
    id: 1,
    title: 'Elton John',
    cover_art: "https://upload.wikimedia.org/wikipedia/en/b/bd/Elton_John_-_Elton_John.jpg",
    year: 1969,
    description: "Elton John is the second[a] studio album by English singer-songwriter Elton John. It was released on 10 April 1970 through DJM Records. Including John's breakthrough single \"Your Song\", the album helped establish his career during the rise of the singer-songwriter era of popular music.",
    artist: 1
    },
    {
        id: 2,
        title: 'Dawn FM',
        cover_art: "https://upload.wikimedia.org/wikipedia/en/b/b9/The_Weeknd_-_Dawn_FM.png",
        year: 2022,
        description: "Dawn FM is the fifth studio album by Canadian singer-songwriter the Weeknd. It was released on January 7, 2022, through XO and Republic Records. The album features narration by Jim Carrey, guest vocals from Tyler, the Creator and Lil Wayne, and spoken word appearances from Quincy Jones and Josh Safdie. As the album's executive producers, the Weeknd, Max Martin and Oneohtrix Point Never recruited a variety of other producers such as Oscar Holter, Calvin Harris and Swedish House Mafia.",
        artist: 2
    },
    {
        id: 3,
        title: 'A Night At The Opera',
        cover_art: "https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png",
        year: 1975,
        description: "A Night at the Opera is the fourth studio album by the British rock band Queen, released on 28 November 1975,[1] by EMI Records in the United Kingdom and Elektra Records in the United States. Produced by Roy Thomas Baker and Queen, it was reportedly the most expensive album ever recorded at the time of its release.",
        artist: 3
    }
];

const artists = [
    {
        id: 1,
        name: "Elton John",
        age: 75,
        headers: {
            "early life": "hiiii",
            "career": "hiiii",
        }
    },
    {
        id: 2,
        name: "The Weeknd",
        age: 75,
        headers: {
            "early life": "hiiii",
            "career": "hiiii",
        }
    },
    {
        id: 3,
        name: "Queen",
        age: 75,
        headers: {
            "early life": "hiiii",
            "career": "hiiii",
        }
    }
]

const comments = [
    {
        id: 1,
        album_id: 1,
        author: 'Michael',
        rating: 3,
        comment: "bad"
    },
    {
        id: 2,
        album_id: 2,
        author: 'Michael',
        rating: 9,
        comment: "GOOOOD"
    },
    {
        id: 3,
        album_id: 2,
        author: 'Tom',
        rating: 5,
        comment: "its okay"
    }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow specific headers
    next();
});

app.get('/api/albums', (req, res) => {
    res.json(albums);
});
app.get('/api/album/:id', async (req, res) => {
    const albumId = parseInt(req.params.id);
    const album = albums.find(album => album.id === albumId);
    console.log(album);
    if (album) {
        res.json(album);
    } else {
        res.status(404).send('Album not found');
    }
});

app.get('/api/artist/:id', async (req, res) => {
    const artistId = parseInt(req.params.id);
    const artist = artists.find(artist => artist.id === artistId);
    console.log(artist);
    if (artist) {
        res.json(artist);
    } else {
        res.status(404).send('Album not found');
    }
});

app.get('/api/comments/:id', async (req, res) => {
    const albumId = parseInt(req.params.id);
    const matchingComments = comments.filter(comment => comment.album_id === albumId);

    if (matchingComments.length > 0) {
        res.json(matchingComments);
    } else {
        res.status(204).send('No comments found for this album');
    }
});

app.put('/api/comments/:id', async (req, res) => {
  comments.push({
        id: 4,
        album_id: req.body.nId,
        author: req.body.author,
        rating: req.body.nRating,
        comment: req.body.comment
    });

  console.log(comments);
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const allAlbums = albums;

        const rankedAlbums = allAlbums.map((album) => {

            const albumComments = comments.filter(com => com.album_id === album.id);
            let val = 0;
            albumComments.forEach(comment => {
                val += comment.rating;
            })

            const artistInfo = artists.filter(artist => artist.id === album.artist);


            const averageRating = val / albumComments.length;
            const ratingCount = albumComments.length;

            return { ...album, averageRating, ratingCount, artistInfo };
        });

        const leaderboard = rankedAlbums.sort(
            (a, b) => b.averageRating - a.averageRating
        );

        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});