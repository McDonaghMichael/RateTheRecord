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
    artist: 'Elton John'},
    {
        id: 2,
        title: 'Dawn FM',
        cover_art: "https://upload.wikimedia.org/wikipedia/en/b/b9/The_Weeknd_-_Dawn_FM.png",
        year: 2022,
        description: "Dawn FM is the fifth studio album by Canadian singer-songwriter the Weeknd. It was released on January 7, 2022, through XO and Republic Records. The album features narration by Jim Carrey, guest vocals from Tyler, the Creator and Lil Wayne, and spoken word appearances from Quincy Jones and Josh Safdie. As the album's executive producers, the Weeknd, Max Martin and Oneohtrix Point Never recruited a variety of other producers such as Oscar Holter, Calvin Harris and Swedish House Mafia.",
        artist: 'The Weeknd'}
];

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

app.get('/api/comments/:id', async (req, res) => {
    const albumId = parseInt(req.params.id);
    const matchingComments = comments.filter(comment => comment.album_id === albumId);

    if (matchingComments.length > 0) {
        res.json(matchingComments);
    } else {
        res.status(204).send('No comments found for this album');
    }
});
