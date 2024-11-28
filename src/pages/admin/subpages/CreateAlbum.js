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
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)}/>
                    <label>Description</label>
                    <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)}/>
                    <label>Cover Art</label>
                    <input type="text" className="form-control" onChange={(e) => setCoverArt(e.target.value)}/>
                    <label>Year</label>
                    <input type="number" className="form-control" onChange={(e) => setYear(parseInt(e.target.value))}/>
                    <label>Artist</label>
                    <select
                        id="artistDropdown"
                        className="form-control"
                        value={artist}
                        onChange={(e) => setArtist(parseInt(e.target.value))}
                    >
                        <option value="">-- Select an Artist --</option>
                        {artists.map((artist) => (
                            <option key={artist.id} value={artist.id}>
                                {artist.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};