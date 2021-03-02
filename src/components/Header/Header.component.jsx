import React from 'react';
import { Navbar } from 'react-bootstrap';
// import './header.styles.scss';

function Header() {
	// const classes = useStyles();
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="#home">Obie</Navbar.Brand>
		</Navbar>
	);
}

export default Header;
