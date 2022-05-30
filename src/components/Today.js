import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";

import UserContext from "../contexts/UserContext";
import ProgressContext from "../contexts/ProgressContext";

function Habit(props) {
    const { habit, config, state, setState } = props;
    const [check, setCheck] = useState(habit.done);

    function changeDone() {

        if (!check) {
            const response = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`, [], config);
            
            response.then(r => {
                setState(state + 1);
                setCheck(true);
            });
            response.catch(r => alert(`Erro ${r.response.status}`));
        } else {
            const response = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`, [], config);
        
            response.then(r => {
                setState(state + 1);
                setCheck(false);
            });
            response.catch(r => alert(`Erro ${r.response.status}`));
        }
    }

    return(
        <DivHabit key={habit.id} check={check}>
            <Text currentSequence={habit.currentSequence} highestSequence={habit.highestSequence}>
                <h3>{habit.name}</h3>
                <Atual check={check}>
                    <h4>Sequência atual</h4>
                    <p>: {habit.currentSequence} dias</p>
                </Atual>
                <Highest highestSequence={habit.highestSequence} currentSequence={habit.currentSequence}>
                    <h4>Seu recorde</h4>
                    <p>: {habit.highestSequence} dias</p>
                </Highest>
            </Text>
            <button onClick={() => changeDone()}>✓</button>
        </DivHabit>
    )
}

function Today() {
    const { user } = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState([]);
    const [state, setState] = useState(0);
    const { progress, setProgress } = useContext(ProgressContext);
    const doneHabits = todayHabits.filter((habit) => habit.done);
    const date = new Date();
    let month = String(date.getMonth() + 1);
    const day = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    if (month.length === 1) {
        month = "0"+month;
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    useEffect((() => {
        setProgress((doneHabits.length/todayHabits.length).toFixed(1));
    }), [doneHabits])

    useEffect((() => {
        const response = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

        response.then(r => {
            setTodayHabits([...r.data]);
        });
        response.catch(r => alert(`Erro ${r.response.status}`));
    }), [state])

    function listHabits() {
        return todayHabits.map(habit => {
            return(
                <Habit key={habit.id} habit={habit} config={config} state={state} setState={setState} />
            );
        });
    }

    const userHabits = listHabits();

    return(
        <Body>
            <Header />
            <Container>
                <Div>
                    <h2>{day[date.getDay()]}, {date.getDate()}/{month}</h2>
                    {doneHabits.length === 0 ? <p>Nenhum hábito concluído ainda</p>:<h3>{progress*100}% dos hábitos concluídos</h3> }
                </Div>
                {userHabits}
            </Container>
            <Footer progress={progress} />
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
`;

const Div = styled.div`
    width: 100%;
    margin-bottom: 30px;
    padding: 0 20px;
    
    display: flex;
    flex-direction: column;

    p {
        color: #BABABA;
        font-size: 18px;

        margin-top: 8px;
    }

    h2 {
        color: #126BA5;
        font-size: 23px;
    }

    h3 {
        color: #8FC549;
        font-size: 18px;

        margin-top: 8px;
    }
`;

const DivHabit = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;

    width: 340px;
    padding: 13px;
    margin-bottom: 15px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        background-color: ${({ check }) => check ? "#8FC549" : "#EBEBEB"};
        border: 1px solid #E7E7E7;
        border-radius: 5px;
        cursor: pointer;

        width: 69px;
        height: 69px;

        font-size: 50px;
        color: #FFFFFF;
    }
`;

const Atual = styled.div`
    margin-bottom: 2px;
    display: flex;
    font-size: 13px;

    p {
        color: ${({ check }) => check ? "#8FC549" : "#666666"};
    }
`;

const Highest = styled.div`
    margin-bottom: 2px;
    display: flex;
    font-size: 13px;

    p {
        color: ${({ currentSequence, highestSequence }) => highestSequence === 0 ? "#666666" : currentSequence === highestSequence ? "#8FC549" : "#666666" };
    }
`;

const Text = styled.div`
    color: #666666;

    display: flex;
    flex-direction: column;

    h3 {
        font-size: 20px;
        margin-bottom: 8px;
    }
`;

export default Today;