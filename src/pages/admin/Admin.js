import './Admin.css';
import {Link} from "react-router-dom";

const Admin = () => {
    return (
        <div className="container">
            <h1 className="text-center mt-5 mb-5">Admin Dashboard</h1>
            <div className="row d-flex flex-wrap justify-content-center">
                <div className="card custom-card mb-4">
                    <img className="card-img-top" src="/assets/plus.png" alt="Create Artist"/>
                    <div className="card-body">
                        <h5 className="card-title">Create Artist</h5>
                        <p className="card-text">Add a new artist to the database by providing their details and bio.</p>
                        <Link to="/admin/create-artist" className="btn btn-primary">Create Artist</Link>
                    </div>
                </div>

                <div className="card custom-card mb-4">
                    <img className="card-img-top" src="/assets/plus.png" alt="Create Album"/>
                    <div className="card-body">
                        <h5 className="card-title">Create Album</h5>
                        <p className="card-text">Add a new album, including album title, cover art, and description.</p>
                        <Link to="/admin/create-album" className="btn btn-primary">Create Album</Link>
                    </div>
                </div>

                <div className="card custom-card mb-4">
                    <img className="card-img-top" src="/assets/neutral.png" alt="Edit Artist"/>
                    <div className="card-body">
                        <h5 className="card-title">Edit Artist</h5>
                        <p className="card-text">Modify an existing artist’s information, including their bio and image.</p>
                        <Link to="/admin/edit-artist" className="btn btn-primary">Edit Artist</Link>
                    </div>
                </div>

                <div className="card custom-card mb-4">
                    <img className="card-img-top" src="/assets/neutral.png" alt="Edit Album"/>
                    <div className="card-body">
                        <h5 className="card-title">Edit Album</h5>
                        <p className="card-text">Edit details of an existing album, such as artist, cover, and description.</p>
                        <Link to="/admin/edit-album" className="btn btn-primary">Edit Album</Link>
                    </div>
                </div>

                <div className="card custom-card mb-4">
                    <img className="card-img-top" src="/assets/report.png" alt="Review Reports"/>
                    <div className="card-body">
                        <h5 className="card-title">Review Reports</h5>
                        <p className="card-text">Review any of the comments that have been reported.</p>
                        <Link to="/admin/review-reports" className="btn btn-primary">Review Reports</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
