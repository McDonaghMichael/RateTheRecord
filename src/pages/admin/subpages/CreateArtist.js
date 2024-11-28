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
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};