import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "axios";

import UserContext from "../contexts/UserContext";

import Header from "./Header";
import Footer from "./Footer";
import RegisterHabits from "./RegisterHabits";
import HabitDays from "./HabitDays";

function Habits() {
    const { user } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [showNewHabitRegister, setShowNewHabitRegister] = useState(false);
    const [state, setState] = useState(0);
    
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    useEffect((() => {
        const response = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        response.then(r => setHabits([...r.data]));
        response.catch(r => alert(`Erro ${r.response.status}`));
    }), [state]);

    function listHabits() {
        return habits.map(habit => {
            return(
                <ContainerHabit key={habit.id}>
                    <Habit>
                        <h3>{habit.name}</h3>
                        <HabitDays habit={habit} />
                    </Habit>
                    <ion-icon onClick={() => deleteHabit(habit)} name="trash-outline"></ion-icon>
                </ContainerHabit>
            );
        });
    }

    function deleteHabit(habit) {
        
        if(window.confirm(`Você deseja apagar o hábito "${habit.name}"?`)) {
            const response = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`, config);
            
            response.then(() => {
                setState(state + 1);
            });
            response.catch(r => alert(`Erro ${r.response.status}`));
        }
    }

    const userHabits = listHabits();

    return(
        <Body>
            <Header />
                <Container>
                    <Div>
                        <h2>Meus hábitos</h2>
                        <button onClick={() => setShowNewHabitRegister(true)}>+</button>
                    </Div>
                    {showNewHabitRegister ? 
                        <RegisterHabits config={config} habits={habits} setHabits={setHabits} setShowNewHabitRegister={setShowNewHabitRegister} />
                    : 
                        <></>
                    }
                    {habits.length === 0 ? <p>Você não tem nenhum hábito cadastrado ainda.
                    Adicione um hábito para começar a trackear!</p> : userHabits}
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
    background-color: #F2F2F2;
    
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

const ContainerHabit = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;

    width: 340px;
    padding-left: 15px;
    margin-bottom: 10px;

    position: relative;
    
    ion-icon {
        color: #666666;
        font-size: 18px;
        cursor: pointer;

        position: absolute;
        right: 10px;
        top: 13px;
    }
`;

const Habit = styled.div`

    h3 {
        font-size: 20px;
        color: #666666;

        margin-top: 13px;
        margin-bottom: 8px;
    }
`;

export default Habits;