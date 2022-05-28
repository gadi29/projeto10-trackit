import React from "react";
import styled from 'styled-components';

import Header from "./Header";
import Footer from "./Footer";

function Habits() {
    return(
        <>
            <Header />
                <Container></Container>
            <Footer />
        </>
        
    );
}

const Container = styled.div`
    background-color: #E5E5E5;

    width: 100%;
    height: 100vh;
`;

export default Habits;