import axios from "axios";
import {useState} from "react";

export default  function CreateArtist(){

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [age, setAge] = useState(0);
    const [headers, setHeaders] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newArtist = {
            name,
            description,
            profileImage,
            headers,
            age
        };

        axios.put('http://localhost:4000/api/artist/create', newArtist)
            .then((res) => {
                console.log(res.data);
            });
    }

    // Adds the header information to the current array using [...]
    const addHeader = () => {
        setHeaders([...headers, { key: "", value: "" }]);
    }

    // Filters through all the headers leaving only those that havent the index being removed
    const removeHeader = (index) => {
        setHeaders(headers.filter((header, i) => i !== index));
    }

    const updateHeader = (index, key, value) => {

        // Finds the header that matches the index
        const head = headers.filter((header, i) => i === index);
        if(key === "key"){
            head[0].key = value
        }
        if(key === "value"){
            head[0].value = value
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="w-50">
                <h1 className="text-center mt-5 mb-5">Create Artist</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="artistName">Name</label>
                        <input
                            type="text"
                            placeholder="Enter here..."
                            id="artistName"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="artistAge">Age</label>
                        <input
                            type="number"
                            placeholder="Enter here..."
                            id="artistAge"
                            className="form-control"
                            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="artistDescription">Description</label>
                        <input
                            type="text"
                            placeholder="Enter here..."
                            id="artistDescription"
                            className="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="artistProfileImage">Profile Image</label>
                        <input
                            type="text"
                            placeholder="Enter here..."
                            id="artistProfileImage"
                            className="form-control"
                            onChange={(e) => setProfileImage(e.target.value)}
                        />
                    </div>
                    {headers.map((header, index) => (
                        <div key={index} className="d-flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Title"
                                className="form-control"
                                onChange={(e) => updateHeader(index, "key", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                className="form-control"
                                onChange={(e) => updateHeader(index, "value", e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeHeader(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary mb-3"
                        onClick={addHeader}
                    >
                        Add Header
                    </button>
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