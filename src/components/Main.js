import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";

import { ThreeDots } from "react-loader-spinner";

import UserContext from "../contexts/UserContext";

import logo from '../assets/images/Logo.jpg';

function Main() {
    const [userLogin, setUserLogin] = useState({ email:"", password:"" })
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    let userStorage = localStorage.getItem("user");

    if (userStorage !== null) {
        userStorage = JSON.parse(userStorage);
        setUser(userStorage);
        navigate('/hoje');
    }


    function handleLogin(e) {
        e.preventDefault();
        setLoading(true);

        const response = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {...userLogin});

        response.then(r => {
            localStorage.setItem("user", JSON.stringify(r.data));
            setUser(r.data);
            setLoading(false);
            navigate('/hoje');
        });
        response.catch(r => {
            alert('Erro! Tente novamente...');
            setLoading(false);
        });
    }

    return(
        <Body>
            <Container loading={loading} >
                <img src={logo} alt="" />
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={userLogin.email}
                        onChange={(e) => setUserLogin({...userLogin, email:e.target.value})}
                        placeholder="email"
                        disabled={loading}
                        required
                    />
                    <input
                        type="password"
                        value={userLogin.password}
                        onChange={(e) => setUserLogin({...userLogin, password:e.target.value})}
                        placeholder="senha"
                        disabled={loading}
                        required
                    />
                    <button type="submit" disabled={loading}>{loading ? <ThreeDots color="#FFFFFF" width={64} height={64} /> : "Entrar"}</button>
                </form>
                <Link to={'/register'}>
                    <p>Não tem uma conta? Cadastre-se!</p>
                </Link>
            </Container>
        </Body>
    );
}

const Body = styled.body`
    width: 100%;
    height: 100vh;
`;

const Container = styled.div`    
    width: 100%;
    height: 100%;
    
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
            background-color: ${({ loading }) => loading ? "#F2F2F2" : "#FFFFFF"};
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
            opacity: ${({ loading }) => loading ? '0.7' : '1'};
            border-radius: 5px;
            border: none;
            cursor: pointer;

            width: 300px;
            height: 45px;

            display: flex;
            justify-content: center;
            align-items: center;

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

export default Main;