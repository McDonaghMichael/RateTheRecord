import {useEffect, useState} from "react";
import axios from "axios";

export default function ReviewReports() {

    const [reports, setReports] = useState([]);

    const [reportModelOpen, setReportModelOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    const handleReportOpenModal = (comment) => {
        setSelectedComment(comment);
        setReportModelOpen(true);
    };

    const handleReportCloseModal = () => {
        setReportModelOpen(false);
        setSelectedComment(null);
    };

    useEffect(() => {
        axios.get("http://localhost:4000/api/reports")
            .then((response) => {
                setReports(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const cancelReport = async () => {

        try {
            await axios.delete(`http://localhost:4000/api/report/${selectedComment._id}`);
            alert("Report deleted successfully.");

            axios.get("http://localhost:4000/api/reports")
                .then((response) => {
                    setReports(response.data);
                })

        } catch (error) {
            console.error("Error deleting report:", error);
            alert("Failed to delete report.");
        }
    };

    const deleteComment = async () => {

        try {
            await axios.delete(`http://localhost:4000/api/report/${selectedComment._id}`);
            await axios.delete(`http://localhost:4000/api/album/comment/${selectedComment.commentId}`);
            alert("Report deleted successfully.");

            axios.get("http://localhost:4000/api/reports")
                .then((response) => {
                    setReports(response.data);
                })

        } catch (error) {
            console.error("Error deleting report:", error);
            alert("Failed to delete report.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                {reports.map((report) => (
                    <div className="col-md-4 mb-4" key={report._id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{report.commentAuthor}</h5>
                                <p className="card-text">{report.commentContent}</p>
                                <a className="btn btn-primary" onClick={() => handleReportOpenModal(report)}>Examine Report</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {reportModelOpen && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Report Review</h5>
                            </div>

                            <div className="modal-body">
                                <h4>Report Reasoning:</h4>
                                <p>{selectedComment.reason}</p>
                                <h4>Comment Author:</h4>
                                <p>{selectedComment.commentAuthor}</p>
                                <h4>Comment Content:</h4>
                                <p>{selectedComment.commentContent}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={cancelReport}>Cancel Report
                                </button>
                                <button type="button" className="btn btn-warning" onClick={deleteComment}>Delete Comment
                                </button>
                                <button type="button" className="btn btn-secondary"
                                        onClick={handleReportCloseModal}>Close
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
