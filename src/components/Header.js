import React from "react";
import { useLocation } from "react-router-dom";
import styled from 'styled-components';

function Header() {
	const user = JSON.parse(localStorage.getItem("user"));
	let location = useLocation();
	let path = location.pathname;

	return(
		<>
		{path !== "/" && path !== "/register" ? 
			<Container>
				<h1>TrackIt</h1>
				<img src={user.image} alt={user.name} />
			</Container>
		: 
			<></>
		}
		</>
    );
}

export default Header;

const Container = styled.div`
	background-color: #126BA5;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
	
	width: 100%;
	height: 70px;
	padding: 0 20px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;

	h1 {
		font-family: 'Playball', cursive !important;
		font-size: 39px;
		color: #FFFFFF;
	}

	img {
		background-color: #FFFFFF;
		border-radius: 98.5px;
		object-fit: cover;
		
		width: 48px;
		height: 48px;
	}
`;