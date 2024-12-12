import axios from "axios";
import { useEffect, useState } from "react";

export default function EditArtist(props) {

    const [artist, setArtist] = useState("");
    const [artists, setArtists] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [age, setAge] = useState(0);
    const [headers, setHeaders] = useState([]);

    // Fetches all of the artists in our database
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
        setArtist(artist)

        try {
            const response = await axios.get("http://localhost:4000/api/artist/" + artist);
            setDescription(response.data.description);
            setProfileImage(response.data.profileImage);
            setAge(response.data.age);
            setName(response.data.name);
            setHeaders(response.data.headers);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!artist) {
            alert("Please select an artist to update.");
            return;
        }

        const updatedArtist = {
            name,
            description,
            profileImage,
            headers,
            age
        };

        console.log(headers);

        axios.put(`http://localhost:4000/api/artist/edit/${artist}`, { data: updatedArtist })
            .then((res) => {
                console.log("Artist updated successfully:", res.data);
                alert("Artist updated successfully.");

            })
            .catch((error) => {
                console.error("Error updating artist:", error);
                alert("Failed to update artist.");
            });
    };

    const addHeader = () => {
        setHeaders([...headers, { key: "", value: "" }]);
    }

    const removeHeader = (index) => {
        setHeaders(headers.filter((header, i) => i !== index));
    }

    const updateHeader = (index, field, value) => {
        const updatedHeaders = [...headers];
        updatedHeaders[index][field] = value;
        setHeaders(updatedHeaders);
    };

    const deleteArtist = async () => {
        if (!artist) {
            alert("Please select an artist to delete.");
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:4000/api/artist/${artist}`);
            alert("Artist deleted successfully.");

            const response = await axios.get("http://localhost:4000/api/artists");
            setArtists(response.data);

            setArtist("");
            setName("");
            setDescription("");
            setProfileImage("");
            setAge(0);
            setHeaders([]);
        } catch (error) {
            console.error("Error deleting artist:", error);
            alert("Failed to delete artist.");
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center">
        <div className="w-50">
        <h1 className="text-center mt-5 mb-5">Edit Artist</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-group row">
                        <label htmlFor="artistDropdown" className="col-sm-2 col-form-label">
                            Artist
                        </label>
                        <div className="col-sm-10">
                            <select
                                id="artistDropdown"
                                className="form-control"
                                value={artist}
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
                    {artist && (
                        <>
                        <div className="form-group row">
                            <label htmlFor="artistName" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    placeholder="Enter here..."
                                    id="artistName"
                                    value={name}
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="artistAge" className="col-sm-2 col-form-label">Age</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    placeholder="Enter here..."
                                    id="artistAge"
                                    value={age}
                                    className="form-control"
                                    onChange={(e) => setAge(parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="artistDescription" className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    placeholder="Enter here..."
                                    id="artistDescription"
                                    value={description}
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="artistProfileImage" className="col-sm-2 col-form-label">Profile
                                Image</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    placeholder="Enter here..."
                                    id="artistProfileImage"
                                    value={profileImage}
                                    className="form-control"
                                    onChange={(e) => setProfileImage(e.target.value)}
                                />
                            </div>
                        </div>
                        {headers.map((header, index) => (
                            <div key={index} className="form-group row">
                                <div className="col-sm-4">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="form-control"
                                        value={header.key}
                                        onChange={(e) => updateHeader(index, "key", e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        className="form-control"
                                        value={header.value}
                                        onChange={(e) => updateHeader(index, "value", e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => removeHeader(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="text-center mt-5 mb-5">
                            <button type="button" className="btn btn-secondary" onClick={addHeader}>
                                Add Header
                            </button>
                            <button type="submit" className="btn btn-primary ms-5 me-5">
                                Submit
                            </button>
                            <button type="button" className="btn btn-warning" onClick={deleteArtist}>
                                Delete
                            </button>
                        </div>
                        </>
                        )}
                        </div>
                        </form>
                        </div>
        </div>
    );

}
