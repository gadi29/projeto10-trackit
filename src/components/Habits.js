import React, { useContext } from "react";
import styled from 'styled-components';

import UserContext from "../contexts/UserContext";
import Header from "./Header";
import Footer from "./Footer";

function Habits() {
    const { user } = useContext(UserContext);

    return(
        <>
            <Header image={user.image} />
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