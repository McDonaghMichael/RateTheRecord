import axios from "axios";
import {useState} from "react";

export default  function CreateArtist(){

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newArtist = {
            name,
            age
        };

        axios.put('http://localhost:4000/api/artist/create', newArtist)
            .then((res) => {
                console.log(res.data);
            });
    }

    return (
        <div>
            <h1>Create Artist</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)}/>
                    <label>Age</label>
                    <input type="number" className="form-control" onChange={(e) => setAge(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};