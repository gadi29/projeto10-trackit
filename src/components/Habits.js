import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "axios";

import UserContext from "../contexts/UserContext";

import Header from "./Header";
import Footer from "./Footer";
import Days from "./Days";

function Habits() {
    const { user } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState({name:"", days:[]});
    const [showNewHabitRegister, setShowNewHabitRegister] = useState(false);
    const [weekDays, setWeekDays] = useState([
        {name:"D", number:0, selected: false},
        {name:"S", number:1, selected: false},
        {name:"T", number:2, selected: false},
        {name:"Q", number:3, selected: false},
        {name:"Q", number:4, selected: false},
        {name:"S", number:5, selected: false},
        {name:"S", number:6, selected: false}
    ]);

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    useEffect((() => {
        const response = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        response.then(r => setHabits([...r.data]));
        response.catch(r => alert(`Erro ${r.status}`));
    }), []);

    function registerNewHabit(e) {
        e.preventDefault();

        const onlySelected = weekDays.filter(thisDay => thisDay.selected);
        const onlyNumbers = onlySelected.map(thisDay => thisDay.number);

        setNewHabit({...newHabit, days: onlyNumbers});
        const body = newHabit;
        console.log(body);

        //const response = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);

        //response.then(r => setHabits([...habits, r.data]));
        //response.catch(r => alert(`Erro ${r.status}`));
    }

    function listHabits() {
        //console.log(habits);
        return habits.map(habit => {
            return(
                <Habit key={habit.id}>
                    <h3>{habit.name}</h3>
                    <Days 
                    weekDays={weekDays}
                    setWeekDays={setWeekDays}
                    />
                </Habit>
            );
        });
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
                        <RegisterHabit onSubmit={registerNewHabit}>
                            <input
                                type="text"
                                value={newHabit.name}
                                onChange={e => setNewHabit({...newHabit, name: e.target.value})}
                                placeholder="nome do hábito"
                                required
                            />
                            <Days 
                                weekDays={weekDays}
                                setWeekDays={setWeekDays}
                            />
                            <Buttons>
                                <Cancel onClick={() => setShowNewHabitRegister(false)}>Cancelar</Cancel>
                                <Save type="submit">Salvar</Save>
                            </Buttons>
                        </RegisterHabit>
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

const Habit = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;

    width: 340px;
    padding-left: 15px;

    h3 {
        font-size: 20px;
        color: #666666;

        margin-top: 13px;
        margin-bottom: 8px;
    }
`;

const RegisterHabit = styled.form`
    background-color: #FFFFFF;
    border-radius: 5px;

    width: 340px;
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