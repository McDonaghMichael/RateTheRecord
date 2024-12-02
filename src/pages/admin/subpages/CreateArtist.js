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

    const addHeader = () => {
        setHeaders([...headers, { key: "", value: "" }]);
    }

    const removeHeader = (index) => {
        setHeaders(headers.filter((header, i) => i !== index));
    }

    const updateHeader = (index, key, value) => {
        const head = headers.filter((header, i) => i === index);
        if(key === "key"){
            head[0].key = value
        }
        if(key === "value"){
            head[0].value = value
        }
        console.log(head);
    }

    return (
        <div>
            <h1>Create Artist</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-group row">
                        <label htmlFor="artistName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" placeholder="Enter here..." id="artistName" className="form-control"
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="artistAge" className="col-sm-2 col-form-label">Age</label>
                        <div className="col-sm-10">
                            <input type="text" placeholder="Enter here..." id="artistAge" className="form-control"
                                   onChange={(e) => setAge(parseInt(e.target.value))}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="artistDescription" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <input type="text" placeholder="Enter here..." id="artistDescription"
                                   className="form-control"
                                   onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="artistProfileImage" className="col-sm-2 col-form-label">Profile Image</label>
                        <div className="col-sm-10">
                            <input type="text" placeholder="Enter here..." id="artistProfileImage" className="form-control"
                                   onChange={(e) => setProfileImage(e.target.value)}/>
                        </div>
                    </div>
                    {headers.map((header, index) => (
                        <div key={index} className="form-group row">
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="form-control"
                                    onChange={(e) => updateHeader(index, "key", e.target.value)}
                                />
                            </div>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    className="form-control"
                                    onChange={(e) => updateHeader(index, "value", e.target.value)}
                                />
                            </div>
                            <div className="col-sm-2">
                                <button
                                    type="button"
                                    className="btn btn-danger"  onClick={() => removeHeader(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={addHeader}>
                        Add Header
                    </button>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};