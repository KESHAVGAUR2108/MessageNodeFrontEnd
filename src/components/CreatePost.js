import React from "react";
import "./css/CreatePost.css";
import Modal from "./Modal";

class CreatePost extends React.Component {
	render() {
		return (
			<div>
				<div className="container text-center">
					<div className="mt-3">
						<button
							className="btn btn-warning create-post"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
						>
							NEW POST
						</button>
					</div>
				</div>
				<Modal />
			</div>
		);
	}
}

export default CreatePost;
