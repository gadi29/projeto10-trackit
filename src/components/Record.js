import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

function Record() {
    return(
        <Body>
            <Header />
                <Container>
                    <Div>
                        <h2>Histórico</h2>
                    </Div>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                </Container>
            <Footer />
        </Body>
        
    );
}

const Body = styled.div`
    background-color: #F2F2F2;

    width: 100%;
    height: 100vh;
`;

const Container = styled.div`
    width: 100%;
    padding: 92px 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        color: #666666;
        font-size: 18px;

        padding: 0 20px;
    }
`;

const Div = styled.div`
    width: 100%;
    margin-bottom: 30px;
    padding: 0 20px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h2 {
        color: #126BA5;
        font-size: 23px;
    }
`

export default Record;