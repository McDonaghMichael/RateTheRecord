import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

export default function Album(){
    let { id } = useParams();

    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [coverArt, setCoverArt] = useState("");
    const [description, setDescription] = useState("");
    const [comments, setComments] = useState([]);


    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);


    const navigate = useNavigate();

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

    const handleSubmit = (event) => {
        event.preventDefault();
        let nId = parseInt(id);
        let nRating = parseInt(rating);
        const newComment = {
            nId,
            author,
            comment,
            nRating
        };

        axios.put('http://localhost:4000/api/comments/' + id, newComment)
            .then((res) => {
                console.log(res.data);
                navigate(`#`);
            });
    }
    return (
        <div>
            <div className="jumbotron">
                <h1 className="display-6">{title}</h1>
                <img src={coverArt}></img>
                <p className="lead">{description}</p>
            </div>
            {comments.length > 0 && (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            {comment.author} {comment.rating}/10 - {comment.comment}
                        </li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Leave a review</label>
                    <input type="text" className="form-control" onChange={(e) => setComment(e.target.value)} />
                    <label>Rating</label>
                    <input type="number" max={10} min={0} className="form-control" onChange={(e) => setRating(e.target.value)} />
                    <label>Your name</label>
                    <input type="text" className="form-control" onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );

}