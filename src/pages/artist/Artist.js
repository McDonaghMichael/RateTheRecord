import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import './Artist.css';

export default function Artist(){

    let { id } = useParams();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [headers, setHeaders] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/artist/${id}`);
                setName(response.data.name);
                setAge(response.data.age);
                setDescription(response.data.description);
                setProfileImage(response.data.profileImage);
                setHeaders(response.data.headers);

                const albumsResponse = await axios.get(`http://localhost:4000/api/artist/${id}/albums`);
                setAlbums(albumsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <h1 className="display-6 album-title">{name}</h1>
            <br></br>
            <div className="row">
                <div className="col-4 mx-auto text-center">
                    <img src={profileImage} alt="Profile"></img>
                    <p className="lead">Age {age}</p>
                    <p className="lead">{description}</p>
                </div>
            </div>
            {headers && Array.isArray(headers) && headers.length > 0 && (
                headers.map((header, index) => (
                    <div key={index}>
                        <h3 className="display-6 album-title">{header.key}</h3>
                        <p className="lead text-center">{header.value}</p>
                    </div>
                ))
            )}



            <h2 className="display-6 album-title">Albums</h2>

            {albums && Object.keys(albums).length > 0 && (
                <div className="album-container">
                    {Object.entries(albums).map(([key, value]) => (
                        <div key={value.id} className="album-item">
                            <div className="card album-card">
                                <img className="card-img-top" src={value.coverArt} alt="Card cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{value.title}</h5>
                                    <p className="card-text">{value.description}</p>
                                    <Link to={`/album/${value._id}`} className="btn btn-primary">Visit</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );


}