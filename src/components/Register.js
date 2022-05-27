import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

import logo from '../assets/images/Logo.jpg';

function Register({ setShowHeaderAndFooter }) {
    setShowHeaderAndFooter(false);

    return (
        <Container>
            <img src={logo} alt="" />
            <form>
                <input type="email" placeholder="email" required />
                <input type="text" placeholder="senha" required />
                <input type="text" placeholder="nome" required />
                <input type="url" placeholder="foto" required />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to={'/'}>
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Container>
    );
}

const Container = styled.div`    
    width: 100%;
    height: 90vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        width: 180px;
        height: 180px;
        margin-bottom: 32px;
    }

    form {
        display: flex;
        flex-direction: column;

        input {
            outline: none;
            background-color: #FFFFFF;
            border-radius: 5px;
            border: 1px solid #D5D5D5;
            font-size: 20px;

            width: 300px;
            height: 45px;
            padding: 0 10px;
            margin-bottom: 8px;

            &::placeholder {
                color: #DBDBDB;
                font-size: 20px;
            }
        }

        button {
            background-color: #52B6FF;
            border-radius: 5px;
            border: none;

            width: 300px;
            height: 45px;

            color: #FFFFFF;
            font-size: 21px;
        }
    }

    p {
        text-decoration: underline;
        color: #52B6FF;
        
        margin-top: 25px;
    }
`;

export default Register;