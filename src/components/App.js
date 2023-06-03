import React, { useEffect } from "react";
import NavBar from "./Navbar";
import StatusForm from "./StatusForm";
import PostsList from "./PostsList";
import SinglePost from "./SinglePost";
import SignIn from "./util/SignIn";
import SignUp from "./util/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

const App = () => {
	const [authorized, setAuthorize] = useState(false);
	const [active, setActive] = useState(null);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setAuthorize(true);
		}
	}, []);

	const routes = () => {
		if (authorized) {
			return (
				<Route
					path="/"
					element={
						<>
							<StatusForm />,
							<PostsList setAuthorize={setAuthorize} setActive={setActive} />,
						</>
					}
				/>
			);
		} else {
			return (
				<Route
					path="/"
					element={<SignIn setAuthorize={setAuthorize} setActive={setActive} />}
				/>
			);
		}
	};

	return (
		<BrowserRouter>
			<NavBar
				authorized={authorized}
				setAuthorize={setAuthorize}
				active={active}
				setActive={setActive}
			/>
			<Routes>
				<Route path="/single-post/:id" element={<SinglePost />} />
				<Route path="/auth/signup" element={<SignUp setActive={setActive} />} />
				{routes()}
			</Routes>
		</BrowserRouter>
	);
};

export default App;
