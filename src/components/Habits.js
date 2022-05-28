import React, { useContext, useEffect, useState, useSyncExternalStore } from "react";
import styled from 'styled-components';
import axios from "axios";

import UserContext from "../contexts/UserContext";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";

function Habits() {
    const { user } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState({name:"", days:[]});
    const [showNewHabitRegister, setShowNewHabitRegister] = useState(false);
    const selectedDays = [];
    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    useEffect((() => {
        const response = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        response.then(r => setHabits([...r.data]));
        response.catch(r => alert(`Erro ${r.status}`))
    }), []);

    function listHabits() {

    }

    function registerNewHabit() {
        setNewHabit({...newHabit, days: selectedDays});
        console.log(newHabit);
    }

    function handleInputChange(e) {
		setNewHabit({...newHabit, name: e.target.value})
	}

    return(
        <Body>
            <Header />
                <Container>
                    <Div>
                        <h2>Meus hábitos</h2>
                        <button onClick={() => setShowNewHabitRegister(true)}>+</button>
                    </Div>
                    {showNewHabitRegister ? 
                        <RegisterHabit>
                            <input
                                type="text"
                                value={newHabit.name}
                                onChange={handleInputChange}
                                placeholder="nome do hábito"
                                required
                            />
                            <Days>
                                {weekDays.map((day, index) => 
                                    <button
                                        key={index}
                                        value={index}
                                        onClick={() => selectedDays.push(index)}>{day}
                                    </button>
                                )}
                            </Days>
                            <Buttons>
                                <Cancel onClick={() => setShowNewHabitRegister(false)}>Cancelar</Cancel>
                                <Save onClick={registerNewHabit}>Salvar</Save>
                            </Buttons>
                        </RegisterHabit>
                    : 
                        <></>
                    }
                    <p>
                        {habits.length === 0 ? `Você não tem nenhum hábito cadastrado ainda.
                        Adicione um hábito para começar a trackear!` : {listHabits}}
                    </p>
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

    button {
        background-color: #52B6FF;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        width: 40px;
        height: 35px;

        font-size: 27px;
        color: #FFFFFF;
    }
`;

const RegisterHabit = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;

    width: 340px;
    height: 180px;
    margin-bottom: 30px;
    padding: 17px;

    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        background-color: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        outline: none;

        width: 303px;
        height: 45px;
        padding: 0 10px;
        margin-bottom: 8px;

        color: #666666;
        font-size: 20px;

        &::placeholder {
            color: #DBDBDB;
            font-size: 20px;
        }
    }
`;

const Days = styled.div`
    width: 100%;
    margin-bottom: 18px;

    display: flex;
    justify-content: flex-start;

    button {
        background-color: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;

        width: 30px;
        height: 30px;
        margin-right: 5px;

        color: #DBDBDB;
        font-size: 20px;
    }
`;

const Buttons = styled.div`
    width: 100%;
    margin-right: 16px;

    display: flex;
    justify-content: flex-end;
`;

const Cancel = styled.button`
    background-color: #FFFFFF;
    border: none;

    width: 84px;
    height: 35px;
    margin-right: 15px;

    color: #52B6FF;
    font-size: 16px;
`;

const Save = styled.button`
    background-color: #52B6FF;
    border: none;
    border-radius: 5px;

    width: 84px;
    height: 35px;

    color: #FFFFFF;
    font-size: 16px;
`;

export default Habits;