import React from "react";
import { Link } from "react-router-dom";
import "./css/StatusForm.css";

const StatusForm = () => {
	return (
		<div className="container text-center mt-5">
			<div className="container input-group text-center">
				<input
					type="text"
					name="searchText"
					className="form-control searchText"
					placeholder="search text"
				/>
				<span className="input-group-text update-container px-2">
					<Link to="/" className="pt-1 search_link">
						SEARCH
					</Link>
				</span>
			</div>
		</div>
	);
};

export default StatusForm;
