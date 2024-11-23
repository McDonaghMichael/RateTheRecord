import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Album(){
    let { id } = useParams();

    console.log(id);

    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [coverArt, setCoverArt] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get('http://localhost:4000/api/album/' + id)
            .then((response) => {
                setTitle(response.data.title);
                setArtist(response.data.artist);
                setYear(response.data.year);
                setDescription(response.data.description);
                setCoverArt(response.data.cover_art);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <div>
            <h1>{title}</h1>
            <h2>{year}</h2>
            <h2>{artist}</h2>
            <img src={coverArt}></img>
            <p>{description}</p>
        </div>
    );

}