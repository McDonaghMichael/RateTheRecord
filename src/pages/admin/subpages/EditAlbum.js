import axios from "axios";
import {useEffect, useState} from "react";

export default  function EditAlbum(){

    const [title, setTitle] = useState("");
    const [selectedArtist, setSelectedArtist] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [coverArt, setCoverArt] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState(0);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/artists");
                setArtists(response.data);
            } catch (error) {
                console.error("Error fetching artists:", error);
            }
        };


        fetchArtists();
    }, []);

    const loadArtist = async (artist) => {
        setSelectedArtist(artist)

        try {
            const response = await axios.get("http://localhost:4000/api/artist/" + artist + "/albums");
            setAlbums(response.data);
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    }

    const loadAlbum = (album) => {

        setAlbum(album);
        const selectedAlbum = albums.filter(a => a._id === album);

        setTitle(selectedAlbum[0].title);
        setArtist(selectedAlbum[0].artist);
        setCoverArt(selectedAlbum[0].coverArt);
        setDescription(selectedAlbum[0].description);
        setYear(selectedAlbum[0].year);

        console.log(selectedAlbum);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!album) {
            alert("Please select an artist to update.");
            return;
        }

        const updatedAlbum = {
            title,
            coverArt,
            year,
            description,
            artist
        };

        axios.put(`http://localhost:4000/api/album/edit/${album}`, { data: updatedAlbum })
            .then((res) => {
                console.log("Album updated successfully:", res.data);
                alert("Album updated successfully.");

            })
            .catch((error) => {
                console.error("Error updating album:", error);
                alert("Failed to update album.");
            });
    }

    const deleteAlbum = async () => {
        if (!album) {
            alert("Please select an album to delete.");
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete?`);
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:4000/api/album/${album}`);
            alert("Album deleted successfully.");

            const response = await axios.get("http://localhost:4000/api/artist/" + selectedArtist + "/albums");
            setAlbums(response.data);

            setTitle("");
            setCoverArt("");
            setDescription("");
            setArtist("");
            setYear(0);
        } catch (error) {
            console.error("Error deleting album:", error);
            alert("Failed to delete album.");
        }
    };

    return (
        <div>
            <h1>Edit Album</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-group row">
                        <label htmlFor="artistDropdown" className="col-sm-2 col-form-label">
                            Select Artist
                        </label>
                        <div className="col-sm-10">
                            <select
                                id="artistDropdown"
                                className="form-control"
                                value={selectedArtist}
                                onChange={(e) => loadArtist(e.target.value)}
                            >
                                <option value="">Select an artist</option>
                                {artists.map((artist) => (
                                    <option key={artist._id} value={artist._id}>
                                        {artist.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {selectedArtist && (
                        <>
                            <div className="form-group row">
                                <label htmlFor="albumsDropdown" className="col-sm-2 col-form-label">
                                    Select Album
                                </label>
                                <div className="col-sm-10">
                                    {Array.isArray(albums) && albums.length > 0 ? (
                                        <select
                                            id="albumsDropdown"
                                            className="form-control"
                                            value={album}
                                            onChange={(e) => loadAlbum(e.target.value)}
                                        >
                                            <option value="">Select an album</option>
                                            {albums.map((album) => (
                                                <option key={album._id} value={album._id}>
                                                    {album.title}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p>Artist has no albums.</p>
                                    )}
                                </div>
                            </div>

                        </>
                    )}
                    {album && (
                        <>
                            <h3>Album Data</h3>
                            <div className="form-group row">
                                <label htmlFor="albumTitle" className="col-sm-2 col-form-label">
                                    Title
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        placeholder="Enter here..."
                                        id="albumTitle"
                                        value={title}
                                        className="form-control"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="albumDescription" className="col-sm-2 col-form-label">
                                    Description
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        placeholder="Enter here..."
                                        id="albumDescription"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="albumCoverArt" className="col-sm-2 col-form-label">
                                    Cover Art
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        placeholder="Enter here..."
                                        id="albumCoverArt"
                                        className="form-control"
                                        value={coverArt}
                                        onChange={(e) => setCoverArt(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="albumYear" className="col-sm-2 col-form-label">
                                    Year
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="number"
                                        placeholder="Enter here..."
                                        id="albumYear"
                                        className="form-control"
                                        value={year}
                                        onChange={(e) => setYear(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="artistDropdown" className="col-sm-2 col-form-label">
                                    Artist
                                </label>
                                <div className="col-sm-10">
                                    <select
                                        id="artistDropdown"
                                        className="form-control"
                                        value={artist}
                                        onChange={(e) => setArtist(e.target.value)}
                                    >
                                        <option value="">Select an artist</option>
                                        {artists.map((artist) => (
                                            <option key={artist._id} value={artist._id}>
                                                {artist.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                            <button type="button" className="btn btn-warning" onClick={deleteAlbum}>
                                Delete
                            </button>
                        </>
                    )}
                </div>

            </form>
        </div>
    );
};