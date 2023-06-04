import React from "react";
import "./css/PostsList.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";

class PostsList extends React.Component {
	constructor() {
		super();

		this.state = {
			data: [],
			users: {},
			editMode: false,
			selectedPost: {},
			editSessionExp: "",
			updated: false,
			error: null,
		};
	}

	fetchData = () => {
		fetch("https://messagenode.onrender.com/feed/posts", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		})
			.then((response) => response.json())
			.then((result) => {
				if (
					result.error &&
					(result.error.statusCode === 500 || result.error.tokenExpire === true)
				) {
					this.props.setAuthorize(false);
					localStorage.clear();
					this.setState({ error: true });
				} else {
					this.setState({ data: result.posts });
					this.setState({ users: result.users });
					this.setState({ error: false });
				}
			})
			.catch((err) => console.log(err));
	};

	componentDidMount() {
		this.props.setActive(window.location.pathname);
		this.fetchData();
	}

	editPost = (post) => {
		this.setState({ editMode: true, selectedPost: post });
		setTimeout(() => {
			if (this.state.editMode) {
				this.setState({ editSessionExp: "Edit session expired!" });
				this.setEditPostFalse();
				setTimeout(() => {
					this.setState({ editSessionExp: "" });
				}, 3000);
			}
		}, 60000);
	};

	renderMsg = () => {
		if (this.state.error) {
			setTimeout(() => {
				this.setState({ error: null });
			}, 2500);
			return <div className="alert alert-danger my-4">{this.state.error}</div>;
		}
	};

	deletePost = (post) => {
		fetch(
			`https://messagenode.onrender.com/feed/delete-post/${post._id.toString()}`,
			{
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			}
		)
			.then((response) => response.json())
			.then((result) => {
				if (result.status === 200) {
					this.fetchData();
				} else if (result.error) {
					this.setState({ error: result.message });
				}
			})
			.catch((error) => console.log(error));
	};

	setEditPostFalse = () => {
		if (this.state.editMode)
			this.setState({ editMode: false, selectedPost: {} });
	};

	renderModal = () => {
		return (
			<Modal
				data={this.state.selectedPost}
				editMode={this.state.editMode}
				toggleEditMode={this.setEditPostFalse}
				editSession={this.state.editSessionExp}
				fetchData={this.fetchData}
			/>
		);
	};

	renderButtons = (post) => {
		const creatorId = post.creator.toString();

		if (creatorId === localStorage.getItem("userId")) {
			return (
				<>
					<span
						onClick={() => this.editPost(post)}
						className="card-link edit"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
					>
						EDIT
					</span>
					<span
						onClick={() => this.deletePost(post)}
						className="card-link delete"
					>
						DELETE
					</span>
				</>
			);
		}
	};

	renderList() {
		if (this.state.error === null && this.state.data.length === 0) {
			return (
				<div className="spinner-border post-list mt-5" role="status"></div>
			);
		}

		if (this.state.data.length === 0) {
			return (
				<div className="text-center mt-5" role="status">
					<h4>No posts found to display! :(</h4>
					<h5>Create a post :)</h5>
				</div>
			);
		}
		return this.state.data.map((post) => {
			return (
				<div key={post._id.toString()} className="card mb-2">
					<div className="card-body">
						<p className="card-subtitle mb-2 text-body-secondary">
							Posted by {this.state.users[post.creator].name} on{" "}
							{post.createdAt}
						</p>
						<h4 className="card-title">{post.title}</h4>
						<p className="card-text">{post.content}</p>
						<div className="overflowed-buttons float-end">
							<Link to={`single-post/${post._id}`} className="card-link view">
								VIEW
							</Link>
							{this.renderButtons(post)}
						</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<>
				<div className="container text-center">
					<div className="mt-2">
						<button
							className="btn btn-warning create-post"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
						>
							NEW POST
						</button>
					</div>
					{this.renderMsg()}
				</div>
				<div className="container d-flex justify-content-center posts-list mt-3">
					{this.renderList()}
				</div>
				;{this.renderModal()}
			</>
		);
	}
}

export default PostsList;
