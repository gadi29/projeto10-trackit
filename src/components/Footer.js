import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import ProgressContext from "../contexts/ProgressContext";

import 'react-circular-progressbar/dist/styles.css';

function Footer() {
    const { progress } = useContext(ProgressContext);
    const [barProgress, setBarProgress] = useState(progress*100);
    
    useEffect((() => {
        setBarProgress(progress*100);
    }), [progress])

    return(
        <Container>
            <Link to="/habitos">
                <h2>Hábitos</h2>
            </Link>
            <Link to="/hoje">
                <Div>
                    <CircularProgressbar
                        value={barProgress}
                        text={'Hoje'} 
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#FFFFFF",
                            pathColor: "#FFFFFF",
                            trailColor: "transparent"
                        })}
                    />
                </Div>
            </Link>
            <Link to="/historico">
                <h2>Histórico</h2>
            </Link>
        </Container>
    );
}

const Container = styled.div`
    background-color: #FFFFFF;
    
    width: 100%;
    height: 70px;
    padding: 0 35px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;

    h2 {
        font-size: 18px;
        color: #52B6FF;
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }
`;

const Div = styled.div`
    cursor: pointer;
    
    width: 91px;
    height: 91px;

    position: absolute;
    bottom: 8px;
    left: 38%;
`;

export default Footer;