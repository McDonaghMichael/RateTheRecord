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
    artist: 'Elton John' }];

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
    const album = albums.find(album => album.id == req.params.id);
    console.log(album);
    if (album) {
        res.json(album);
    } else {
        res.status(404).send('Album not found');
    }
});
