import React from "react";
import styled from 'styled-components';

import smilinguido from '../assets/images/smilinguido.jpg';

function Header({ showHeader }) {
		return(
			showHeader ?
				<Container>
					<h1>TrackIt</h1>
					<img src={smilinguido} alt="Foto do usuário" />
				</Container> : <></>
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

	h1 {
		font-family: 'Playball', cursive;
		font-size: 39px;
		color: #FFFFFF;
	}

	img {
		border-radius: 98.5px;
		
		width: 48px;
		height: 48px;
	}
`;