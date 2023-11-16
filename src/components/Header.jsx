import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<Link to='/'>Home</Link>
			<Link to='/blog'>Blog</Link>
		</header>
	);
};

export default Header;
