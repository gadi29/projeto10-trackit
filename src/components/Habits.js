import React from "react";
import styled from 'styled-components';

function Habits({ setShowHeaderAndFooter }) {
    setShowHeaderAndFooter(true);
    
    return(
        <Container></Container>
    );
}

const Container = styled.div`
    background-color: #E5E5E5;

    width: 100%;
    height: 100vh;
`;

export default Habits;