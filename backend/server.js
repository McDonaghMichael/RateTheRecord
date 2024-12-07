import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Schemas are imported into the API
import AlbumSchema from './schemas/AlbumSchema.js';
import ArtistSchema from './schemas/ArtistSchema.js';
import CommentsSchema from './schemas/CommentsSchema.js';
import ReportedCommentsSchema from './schemas/ReportedCommentsSchema.js';

const app = express();
const port = 4000;

mongoose.connect('mongodb+srv://admin:ThisIsMyAdminPassword@cluster0.wha9n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Models are created for each of our schemas so we can interact with them directly
const Artist = mongoose.model('Artist', ArtistSchema);
const Album = mongoose.model('Album', AlbumSchema);
const Comment = mongoose.model('Comment', CommentsSchema);
const ReportedComments = mongoose.model('Reported Comments', ReportedCommentsSchema);

app.use(bodyParser.urlencoded({
    extended: true
}));
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

// Returns the array of information belonging to an album given the album ID
app.get('/api/album/:id', async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (album) {
        res.json(album);
    } else {
        res.status(404).send('Album not found');
    }
});

// Creates an album and pushes it to the database
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

// Edits to an album are pushed to this method based on the album id
app.put('/api/album/edit/:id', async (req, res) => {
    try {
        const album = await Album.findByIdAndUpdate(req.params.id, req.body.data, {
            new: true
        });
        if (!album) {
            return res.status(404).send({
                message: "Album not found"
            });
        }
        res.send(album);
    } catch (error) {
        console.error("Error updating album:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});

// Returns all the comments belonging to a certain album
app.get('/api/album/:id/comments', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).send('Album not found');
        }

        // Fetch comments that are linked to this album
        const comments = await Comment.find({
            albumId: album._id
        });

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

// Creates a comment for an album
app.put('/api/album/comment/create', async (req, res) => {
    try {
        const newComment = new Comment({
            albumId: req.body.albumId,
            author: req.body.author,
            rating: req.body.rate,
            comment: req.body.comment
        });

        await newComment.save();
        res.status(201).json({
            message: 'Comment added successfully',
            comment: newComment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to add comment'
        });
    }
});

// Deletes a comment based on its id
app.delete('/api/album/comment/:id', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.send({
            message: "Comment deleted successfully."
        });
    } catch (error) {
        res.status(500).send({
            error: "Failed to delete artist."
        });
    }
});

// Returns the array of reports from the database
app.get('/api/reports', async (req, res) => {
    const reports = await ReportedComments.find({});
    res.json(reports);
});

// Pushes a new comment report to the database
app.put('/api/report/comment', async (req, res) => {
    try {
        const {
            reason,
            commentId,
            commentAuthor,
            commentContent
        } = req.body;

        const existingReport = await ReportedComments.findOne({
            commentId: commentId
        });

        if (existingReport) {
            return res.status(400).json({
                message: 'This comment has already been reported.'
            });
        }

        const newCommentReport = new ReportedComments({
            reason,
            commentAuthor,
            commentContent,
            commentId
        });

        await newCommentReport.save();
        res.status(201).json({
            message: 'Report added successfully',
            report: newCommentReport
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to add Report'
        });
    }
});

// Deletes a report from the database based on its id
app.delete('/api/report/:id', async (req, res) => {
    try {
        await ReportedComments.findByIdAndDelete(req.params.id);
        res.send({
            message: "Reported Comment deleted successfully."
        });
    } catch (error) {
        res.status(500).send({
            error: "Failed to delete report."
        });
    }
});

// Checks whether or not a comment has already been reported
app.get('/api/report/comment/check/:commentId', async (req, res) => {
    try {
        const {
            commentId
        } = req.params;

        const existingReport = await ReportedComments.findOne({
            commentId
        });

        if (existingReport) {
            return res.json({
                reported: true
            });
        }

        res.json({
            reported: false
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to check if comment is reported.'
        });
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

        const artistAlbums = await Album.find({
            artist: artistId
        });

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

// Creates a new artist on the database
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
        res.status(201).json({
            message: 'Artist created successfully',
            artist: newArtist
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to create artist'
        });
    }
});

// Pushes the new edits of an artist to the database
app.put('/api/artist/edit/:id', async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body.data, {
            new: true
        });
        if (!artist) {
            return res.status(404).send({
                message: "Artist not found"
            });
        }
        res.send(artist);
    } catch (error) {
        console.error("Error updating artist:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});

// Deletes an artist from the database
app.delete('/api/artist/:id', async (req, res) => {
    try {
        await Artist.findByIdAndDelete(req.params.id);
        res.send({
            message: "Artist deleted successfully."
        });
    } catch (error) {
        res.status(500).send({
            error: "Failed to delete artist."
        });
    }
});

// Deletes an album from the database
app.delete('/api/album/:id', async (req, res) => {
    try {
        await Album.findByIdAndDelete(req.params.id);
        res.send({
            message: "Album deleted successfully."
        });
    } catch (error) {
        res.status(500).send({
            error: "Failed to delete album."
        });
    }
});

// Returns all the albums on the leaderboard and their rankings
app.get('/api/leaderboard', async (req, res) => {
    try {
        // Fetch all albums, comments, and artists from the database
        const allAlbums = await Album.find({});
        const allComments = await Comment.find({});
        const allArtists = await Artist.find({});

        // Loops through all of the albums we have
        const rankedAlbums = allAlbums.map((album) => {

            // This will filter out all of the comments in our database so that only those comments that belong to the album are returned
            const albumComments = allComments.filter(comment =>
                comment.albumId && comment.albumId.toString() === album._id.toString()
            );

            // The total rating is basically all of the ratings added up from the comments
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

        /**
         * Now that all the albums have been given their information such as average ratings, artist info, etc, we will then
         * sort the album and using a callback function to sort them in order, such as if the consecutive elements a and b, if the result
         * is positive, element b is placed before a, and vice versa, this will sort the albums based on their ratings
         */
        const leaderboard = rankedAlbums.sort((a, b) => b.averageRating - a.averageRating);

        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Returns artist and album information based on search query
app.get('/api/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const keywords = query.split(' ');

        // Using regex we will map through all keywords and using 'i' it will match both upper and lower cases
        const searchRegex = keywords.map(keyword => new RegExp(keyword, 'i'));

        const artists = await Artist.find({
            name: searchRegex
        });
        const albums = await Album.find({
            title: searchRegex
        });

        res.json({
            artists,
            albums
        });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).send('Error searching for artists or albums.');
    }
});