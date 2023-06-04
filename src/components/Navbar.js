import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

const NavBar = ({ authorized, setAuthorize, active, setActive }) => {
	useEffect(() => {
		setActive(window.location.pathname);
	});

	const onClickHandle = (path) => {
		setActive(path);
	};

	const handleLogOut = (e) => {
		localStorage.clear();
		setAuthorize(false);
	};

	const renderLinks = () => {
		const pagePath = window.location.pathname;

		if (authorized) {
			return (
				<>
					<Link
						className={pagePath === "/" ? "nav-link active" : "nav-link"}
						to="/"
					>
						Feed
					</Link>
					<Link className="nav-link" to="/" onClick={handleLogOut}>
						LogOut
					</Link>
				</>
			);
		}
		return (
			<>
				<Link
					className={active === "/" ? "nav-link active" : "nav-link"}
					to="/"
					onClick={() => onClickHandle("/")}
				>
					SignIn
				</Link>
				<Link
					className={active === "/auth/signup" ? "nav-link active" : "nav-link"}
					to="/auth/signup"
					onClick={() => onClickHandle("/auth/signup")}
				>
					SignUp
				</Link>
			</>
		);
	};

	return (
		<nav className="navbar navbar-custom">
			<div className="container-fluid">
				<Link className="brandName" to="/">
					MessageNode
				</Link>
				<div className="d-flex gap-3">{renderLinks()}</div>
			</div>
		</nav>
	);
};

export default NavBar;
