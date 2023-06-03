import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/single-post.css";

const SinglePost = () => {
	const postId = useParams().id.toString();
	const [post, setPost] = useState({});

	useEffect(() => {
		const URL = `https://messagenode.onrender.com/feed/post/${postId}`;
		fetch(URL, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		})
			.then((res) => {
				if (res.status !== 200) {
					throw new Error("Post Not Found!!");
				}
				return res.json();
			})
			.then(({ post }) => setPost(post))
			.catch((err) => {
				console.log(err);
			});
	}, [postId]);

	const renderPost = () => {
		if (!post) {
			return (
				<div className="container text-center">
					<h6>Loading...</h6>
				</div>
			);
		} else if (post.creator) {
			return (
				<div className="container mt-3 text-center">
					<h1 className="post-title">{post.title}</h1>
					<p className="card-subtitle">
						Created by {post.creator.name} on {post.createdAt}
					</p>
					<hr />
					<img
						className="shadow-lg post-img"
						src={`https://messagenode.onrender.com/${post.image}`}
						alt={post.title}
					/>
					<h5 className="description mt-4">{post.content}</h5>
				</div>
			);
		}
	};

	return renderPost();
};

export default SinglePost;
