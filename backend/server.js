const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const app = express();
const port = 4000;

mongoose.connect('mongodb+srv://admin:ThisIsMyAdminPassword@cluster0.wha9n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const artistSchema = new Schema({
    name: String,
    age: Number,
    profileImage: String,
    description: String,
    headers: Object
});

const albumSchema = new Schema({
    title: String,
    year: Number,
    coverArt: String,
    description: String,
    artist: String
});

const commentsSchema = new Schema({
    albumId: String,
    author: String,
    rating: Number,
    comment: String
});


const Artist = mongoose.model('Artist', artistSchema);
const Album = mongoose.model('Album', albumSchema);
const Comment = mongoose.model('Comment', commentsSchema);

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

// Returns an array of all the albums
app.get('/api/albums', async (req, res) => {
    const albums = await Album.find({});
    res.json(albums);
});

// Returns the array of information belonging to an album
app.get('/api/album/:id', async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (album) {
        res.json(album);
    } else {
        res.status(404).send('Album not found');
    }
});

app.put('/api/album/create', async (req, res) => {

    const newAlbum = new Album({
        title: req.body.title,
        coverArt: req.body.coverArt,
        year: req.body.year,
        description: req.body.description,
        artist: req.body.artist,
    });
    await newAlbum.save();
});


// Returns all the comments belonging to a certain album
app.get('/api/album/:id/comments', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).send('Album not found');
        }

        // Fetch comments that are linked to this album
        const comments = await Comment.find({ albumId: album._id });

        if (comments.length > 0) {
            res.json(comments);
        } else {
            res.status(204).send('No comments found for this album');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


app.put('/api/album/comment/create', async (req, res) => {
    try {
        const newComment = new Comment({
            albumId: req.body.albumId,
            author: req.body.author,
            rating: req.body.rate,
            comment: req.body.comment
        });

        await newComment.save();
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});


// Returns an array of all the artists
app.get('/api/artists', async (req, res) => {
    const artists = await Artist.find({});
    res.json(artists);
});

// Returns an array of information about an artist
app.get('/api/artist/:id', async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (artist) {
        res.json(artist);
    } else {
        res.status(404).send('Album not found');
    }
});

// Returns an array of albums belonging to an artist
app.get('/api/artist/:id/albums', async (req, res) => {
    try {
        const artistId = req.params.id;
        const artist = await Artist.findById(artistId);

        if (!artist) {
            return res.status(404).send('Artist not found');
        }

        const artistAlbums = await Album.find({ artist: artistId });

        if (artistAlbums.length > 0) {
            res.json(artistAlbums);
        } else {
            res.status(204).send('No albums found for this artist');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


app.put('/api/artist/create', async (req, res) => {
    try {
        const newArtist = new Artist({
            name: req.body.name,
            age: req.body.age,
            description: req.body.description,
            profileImage: req.body.profileImage,
            headers: req.body.headers
        });
        await newArtist.save();
        res.status(201).json({ message: 'Artist created successfully', artist: newArtist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create artist' });
    }
});

app.put('/api/artist/edit/:id', async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body.data, { new: true });
        if (!artist) {
            return res.status(404).send({ message: "Artist not found" });
        }
        res.send(artist);
    } catch (error) {
        console.error("Error updating artist:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.delete('/api/artist/:id', async (req, res) => {
    try {
        await Artist.findByIdAndDelete(req.params.id);
        res.send({ message: "Artist deleted successfully." });
    } catch (error) {
        res.status(500).send({ error: "Failed to delete artist." });
    }
});


app.get('/api/leaderboard', async (req, res) => {
    try {
        // Fetch all albums, comments, and artists from the database
        const allAlbums = await Album.find({});
        const allComments = await Comment.find({});
        const allArtists = await Artist.find({});


        const rankedAlbums = allAlbums.map((album) => {

            const albumComments = allComments.filter(comment =>
                comment.albumId && comment.albumId.toString() === album._id.toString()
            );

            let totalRating = 0;
            albumComments.forEach(comment => {
                totalRating += comment.rating;
            });

            const averageRating = albumComments.length > 0 ? totalRating / albumComments.length : 0;
            const ratingCount = albumComments.length;

            const artistInfo = allArtists.filter(artist => artist._id.toString().includes(album.artist));



            return {
                ...album.toObject(),
                averageRating,
                ratingCount,
                artistInfo
            };
        });

        // Sort albums by average rating, descending
        const leaderboard = rankedAlbums.sort((a, b) => b.averageRating - a.averageRating);

        // Send the leaderboard as the response
        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
