const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

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
    res.json([{ id: 1, title: 'Album 1', artist: 'Artist 1' },
        { id: 2, title: 'Album 2', artist: 'Artist 2' },]);
});
