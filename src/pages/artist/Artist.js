import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


export default function Artist(){

    let { id } = useParams();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [headers, setHeaders] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/artist/${id}`);
                setName(response.data.name);
                setAge(response.data.age);
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
            <h1>{name}</h1>
            <h1>{age}</h1>
            {headers && Object.keys(headers).length > 0 && (
                Object.entries(headers).map(([key, value], index) => (
                    <div key={index}>
                        <h2>{key}</h2>
                        <p>{value}</p>
                    </div>
                ))
            )}

            {albums && Object.keys(albums).length > 0 && (
                Object.entries(albums).map(([key, value], index) => (
                    <div key={value.id}>
                        <h2>{value.title}</h2>
                        <img src={value.cover_art}></img>
                        <p>{value.id}</p>
                        <a href={`/album/${value.id}`}>
                            <button>View Album</button>
                        </a>
                    </div>
                ))
            )}
        </>
    );



}