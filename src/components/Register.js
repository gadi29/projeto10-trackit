import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";

import logo from '../assets/images/Logo.jpg';

function Register() {
	const navigate = useNavigate();

    const [user, setUser] = useState({
        email:'',
        name:'',
        image:'',
		password:''
    });

    function registerUser(e) {
        e.preventDefault();
        
		const response = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', {...user});

		response.then(() => {
			navigate('/');
		});
    }

	function handleInputChange(e) {
		setUser({...user, [e.target.name]: e.target.value})
	}

    return (
        <Container>
            <img src={logo} alt="" />
            <form onSubmit={registerUser}>
                <input
					type="email"
					value={user.email}
					onChange={handleInputChange}
					name="email"
					placeholder="email"
					required
				/>
                <input 
					type="text"
					value={user.password}
					onChange={handleInputChange}
					name="password"
					placeholder="senha"
					minLength={6}
                    maxLength={20}
					required
				/>
                <input
					type="text"
					value={user.name}
					onChange={handleInputChange}
					name="name"
					placeholder="nome"
					minLength={2}
                    maxLength={25}
					required
				/>
                <input
					type="url"
					value={user.image}
					onChange={handleInputChange}
					name="image"
					placeholder="foto"
					required
				/>
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