import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		
<nav class="navbar navbar-light bg-light justify-content-between">
	<Link to='/'>
  <span><a class="navbar-brand">Navbar</a></span>
  </Link>
  <form class="form-inline">

    {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/> */}

    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Test</button>
  </form>
</nav>

	);
};
