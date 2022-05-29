import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "axios";

import UserContext from "../contexts/UserContext";

import Header from "./Header";
import Footer from "./Footer";
import Day from "./Day";

function Habits() {
    const { user } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState({name:"", days:[]});
    const [showNewHabitRegister, setShowNewHabitRegister] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const weekDays = [
        {name:"D", number:0},
        {name:"S", number:1},
        {name:"T", number:2},
        {name:"Q", number:3},
        {name:"Q", number:4},
        {name:"S", number:5},
        {name:"S", number:6}
    ];

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

    function registerNewHabit(e) {
        e.preventDefault();

        setNewHabit({...newHabit, days: [...selectedDays]});
        console.log(newHabit);
    }

    function listHabits() {

    }

    function mountDays() {
        return weekDays.map(day => {
            const selected = selectedDays.some(thisDay => thisDay === day.number); 
            return(
            <Day 
                key={day.number}
                day={day.name}
                number={day.number}
                click={(number) => selectDay(number)}
                selected={selected}
            />
        );
            });
    }

    function selectDay(number) {
        //console.log(number)
        const selected = selectedDays.some(thisDay => thisDay === number);

        if(!selected) {
            setSelectedDays([...selectedDays, number]);
            
            //console.log("selecionou")
            //console.log(selectedDays)
        } else {
            const newSelected = selectedDays.filter(thisDay => thisDay !== number);
            setSelectedDays(newSelected);
            //console.log("desselecionou")
            //console.log(selectedDays)
        }
    }

    const day = mountDays();

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
                            <Days>
                                {day}
                            </Days>
                            <Buttons>
                                <Cancel onClick={() => setShowNewHabitRegister(false)}>Cancelar</Cancel>
                                <Save type="submit">Salvar</Save>
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

const Days = styled.div`
    width: 100%;
    margin-bottom: 18px;

    display: flex;
    justify-content: flex-start;
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