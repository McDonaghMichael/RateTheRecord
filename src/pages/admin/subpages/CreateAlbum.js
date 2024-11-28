import axios from "axios";
import {useEffect, useState} from "react";

export default  function CreateAlbum(){

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState(0);
    const [coverArt, setCoverArt] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState(0);

    const [artists, setArtists] = useState([]);

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

    const handleSubmit = (event) => {
        event.preventDefault();

        const newAlbum = {
            title,
            coverArt,
            year,
            description,
            artist
        };

        axios.put('http://localhost:4000/api/album/create', newAlbum)
            .then((res) => {
                console.log(res.data);
            });
    }

    return (
        <div>
            <h1>Create Album</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-group row">
                        <label htmlFor="albumTitle" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" placeholder="Enter here..." id="albumTitle" className="form-control"
                                   onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="albumDescription" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <input type="text" placeholder="Enter here..." id="albumDescription"
                                   className="form-control"
                                   onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="albumCoverArt" className="col-sm-2 col-form-label">Cover Art</label>
                        <div className="col-sm-10">
                            <input type="text" placeholder="Enter here..." id="albumCoverArt"
                                   className="form-control"
                                   onChange={(e) => setCoverArt(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="albumYear" className="col-sm-2 col-form-label">Year</label>
                        <div className="col-sm-10">
                            <input type="text" placeholder="Enter here..." id="albumYear"
                                   className="form-control"
                                   onChange={(e) => setYear(parseInt(e.target.value))}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="artistDropdown" className="col-sm-2 col-form-label">Artist</label>
                        <div className="col-sm-10">
                            <select
                                id="artistDropdown"
                                className="form-control"
                                value={artist}
                                onChange={(e) => setArtist(parseInt(e.target.value))}
                            >
                                <option value="">Select an artist</option>
                                {artists.map((artist) => (
                                    <option key={artist.id} value={artist.id}>
                                        {artist.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};