import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './Album.css';

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

    const [reportModelOpen, setReportModelOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [reportReason, setReportReason] = useState(null);


    const navigate = useNavigate();

    const handleReportOpenModal = (comment) => {
        setSelectedComment(comment);
        setReportModelOpen(true);
    };

    const handleReportCloseModal = () => {
        setReportModelOpen(false);
        setSelectedComment(null);
    };

    const handleModalSubmit = async () => {
        const newCommentReport = {
            commentId: selectedComment._id,
            reason: reportReason,
            commentAuthor: selectedComment.author,
            commentContent: selectedComment.comment,
        };

        try {

            const response = await axios.get(`http://localhost:4000/api/report/comment/check/${selectedComment._id}`);

            if (response.data.reported) {
                alert("This comment has already been reported.");
                return;
            }

            const res = await axios.put('http://localhost:4000/api/report/comment', newCommentReport);
            console.log(res.data);
            handleReportCloseModal();
            alert("Report has been submitted. Our admins will review it shortly.");
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("There was an error submitting the report. Please try again.");
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const albumResponse = await axios.get(`http://localhost:4000/api/album/${id}`);
                setTitle(albumResponse.data.title);
                setArtist(albumResponse.data.artist);
                setYear(albumResponse.data.year);
                setDescription(albumResponse.data.description);
                setCoverArt(albumResponse.data.coverArt);

                const commentsResponse = await axios.get(`http://localhost:4000/api/album/${id}/comments`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let albumId = id;
        let rate = parseInt(rating);
        const newComment = {
            albumId,
            author,
            comment,
            rate
        };

        axios.put('http://localhost:4000/api/album/comment/create', newComment)
            .then((res) => {
                console.log(res.data);
                navigate(`#`);
            });

        const commentsResponse = await axios.get(`http://localhost:4000/api/album/${id}/comments`);
        setComments(commentsResponse.data);

        setAuthor('');
        setComment('');
        setRating(0);

    }
    return (
        <div>
            <h1 className="display-6 album-title">{title}</h1>
            <br></br>
            <div className="row">
                <div className="col-4 mx-auto text-center">
                    <img src={coverArt}></img>
                    <p className="lead">{description}</p>
                </div>
            </div>
            <form className="album-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Leave a review</label>
                    <input type="text" className="form-control" onChange={(e) => setComment(e.target.value)}/>
                    <label>Rating</label>
                    <input type="number" max={10} min={0} className="form-control"
                           onChange={(e) => setRating(e.target.value)}/>
                    <label>Your name</label>
                    <input type="text" className="form-control" onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>


            {comments.length > 0 && (
                <ul>
                    {comments.map((comment) => (
                        <div className="card mb-4 comment-card" key={comment._id}>
                            <div className="card-body">
                                <p>{comment.comment}</p>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <img
                                            src="https://static-00.iconduck.com/assets.00/profile-default-icon-1024x1023-4u5mrj2v.png"
                                            alt="avatar"
                                            width="25"
                                            height="25"
                                        />
                                        <p className="small mb-0 ms-2">{comment.author}</p>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                        <p className="small text-muted mb-0">Rating {comment.rating}/10</p>
                                    </div>
                                    <button type="button" className="btn btn-primary"
                                            onClick={() => handleReportOpenModal(comment)}>Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
            
            {reportModelOpen && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Report Comment</h5>
                                <button type="button" className="close" onClick={handleReportCloseModal}
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <h5 className="modal-header">Author: {selectedComment.author}</h5>
                            <p className="modal-header">Content: {selectedComment.comment}</p>

                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Report
                                            Reasoning:</label>
                                        <textarea onChange={(e) => setReportReason(e.target.value)} className="form-control" id="message-text"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        onClick={handleReportCloseModal}>Close
                                </button>
                                <button type="button" className="btn btn-primary"  onClick={() => handleModalSubmit()}>Submit Report</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}