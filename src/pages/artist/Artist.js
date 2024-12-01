import {useParams} from "react-router-dom";
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
                setProfileImage(response.data.profile_image);
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
                    <img src={profileImage}></img>
                    <p className="lead">{description}</p>
                </div>
            </div>
            {headers && Object.keys(headers).length > 0 && (
                Object.entries(headers).map(([key, value], index) => (
                    <div key={index}>
                        <h3 className="display-6 album-title">{key}</h3>

                        <p className="lead text-center">{value}</p>
                    </div>
                ))
            )}

            <h2 className="display-6 album-title">Albums</h2>

            {albums && Object.keys(albums).length > 0 && (
                <div className="album-container">
                    {Object.entries(albums).map(([key, value]) => (
                        <div key={value.id} className="album-item">
                            <div className="card album-card">
                                <img className="card-img-top" src={value.cover_art} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{value.title}</h5>
                                    <p className="card-text">{value.description}</p>
                                    <a href={`/album/${value.id}`} className="btn btn-primary">Visit</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );


}