import "./css/CreatePost.css";
import React, { useEffect, useState } from "react";

const Modal = ({ data, editMode, toggleEditMode, editSession, fetchData }) => {
	const [imageUrl, setUrl] = useState("");
	const [imageFile, setImageFile] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMsg] = useState("");

	useEffect(() => {
		if (!editMode) {
			setTitle("");
			setContent("");
		} else {
			setTitle(data.title);
			setContent(data.content);
		}
	}, [data, editMode]);

	const renderImage = () => {
		if (imageUrl) {
			return <img src={imageUrl} alt={imageUrl.name} width="25%" />;
		}
	};

	const renderMsg = () => {
		if (editSession) {
			return (
				<div id="alert" className="alert alert-danger">
					{editSession}
				</div>
			);
		}
		if (error && message) {
			return (
				<div id="alert" className="alert alert-danger" role="alert">
					{message}
				</div>
			);
		} else if (success) {
			return (
				<div id="alert" className="alert alert-success" role="alert">
					{message}
				</div>
			);
		}
	};

	const removeAlertBox = () => {
		setTimeout(() => {
			setError(false);
			setSuccess(false);
			setMsg("");
		}, 4000);
	};

	const onSubmitHandle = () => {
		const fd = new FormData();

		fd.append("title", title);
		fd.append("image", imageFile);
		fd.append("content", content);
		fd.append("creator", localStorage.getItem("userId"));

		let url, _method;

		if (editMode) {
			url = "https://messagenode.onrender.com/feed/post/" + data._id.toString();
			_method = "PUT";
		} else {
			url = "https://messagenode.onrender.com/feed/posts";
			_method = "POST";
		}

		fetch(url, {
			method: _method,
			body: fd,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		})
			.then((result) => result.json())
			.then((response) => {
				if (response.status !== 200 && response.status !== 201) {
					setError(true);
				} else if (response.status === 201) {
					setSuccess(true);
					fetchData();
				} else if (editMode && response.status === 200) {
					setSuccess(true);
					toggleEditMode();
					fetchData();
				}
				setMsg(response.message);
				removeAlertBox();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const unmount = () => {
		if (editMode) {
			toggleEditMode();
		}
		setTitle("");
		setImageFile("");
		setContent("");
		setUrl("");
		setMsg("");
		document.getElementById("image").value = null;
	};

	return (
		<div
			className="mt-4 modal fade"
			id="exampleModal"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-body">
						<div>
							<div>
								<h3 className="float-start modal-title">New Post</h3>
								<button
									type="button"
									className="btn-close float-end"
									data-bs-dismiss="modal"
									aria-label="Close"
									onClick={unmount}
								></button>
							</div>
							<br />
							<hr />
							{renderMsg()}
							<div className="mb-3">
								<label htmlFor="title" className="form-label">
									TITLE
								</label>
								<input
									type="text"
									name="title"
									className="form-control"
									id="title"
									required
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="imageUrl" className="d-block form-label m-0">
									IMAGE
								</label>
								<label className="sub-title mb-1">
									Please upload an image (jpg/jpeg/png)
								</label>
								<input
									type="file"
									name="image"
									className="form-control mb-2"
									id="image"
									accept="image/*"
									onChange={(e) => {
										setImageFile(e.target.files[0]);
										setUrl(URL.createObjectURL(e.target.files[0]));
									}}
									required={editMode ? false : true}
								/>
								{renderImage()}
							</div>

							<div className="mb-3">
								<label htmlFor="content" className="form-label">
									CONTENT
								</label>
								<textarea
									type="text"
									name="content"
									className="form-control"
									id="content"
									rows="4"
									value={content}
									onChange={(e) => setContent(e.target.value)}
									required
								/>
							</div>
							<div className="float-end">
								<span
									className="cancel-link px-3"
									data-bs-dismiss="modal"
									onClick={unmount}
								>
									CANCEL
								</span>
								<button
									className="btn btn-outline-success"
									onClick={onSubmitHandle}
								>
									{editMode ? "UPDATE" : "CREATE"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
