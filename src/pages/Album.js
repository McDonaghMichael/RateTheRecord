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
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albumResponse = await axios.get(`http://localhost:4000/api/album/${id}`);
                setTitle(albumResponse.data.title);
                setArtist(albumResponse.data.artist);
                setYear(albumResponse.data.year);
                setDescription(albumResponse.data.description);
                setCoverArt(albumResponse.data.cover_art);

                const commentsResponse = await axios.get(`http://localhost:4000/api/comments/${id}`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);




    return (
        <div>
            <h1>{title}</h1>
            <h2>{year}</h2>
            <h2>{artist}</h2>
            <img src={coverArt}></img>
            <p>{description}</p>
            {comments.length > 0 && (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            {comment.author} {comment.rating}/10 - {comment.comment}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}