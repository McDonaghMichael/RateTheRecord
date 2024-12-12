import axios from "axios";
import { useEffect, useState } from "react";

export default function CreateAlbum() {

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [coverArt, setCoverArt] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState(0);
    const [artists, setArtists] = useState([]);

    // Fetches the artists we have in our database so we can assign an album to one
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

    // Handles the form submission when submitting an album
    const handleSubmit = (event) => {
        event.preventDefault();

        const newAlbum = {
            title,
            coverArt,
            year,
            description,
            artist,
        };

        axios.put("http://localhost:4000/api/album/create", newAlbum)
            .then((res) => {
                console.log(res.data);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="w-50">
            <h1 className="text-center mt-5 mb-5">Create Artist</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-group row">
                        <label htmlFor="albumTitle" className="col-sm-2 col-form-label">
                            Title
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                placeholder="Enter here..."
                                id="albumTitle"
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
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
}
