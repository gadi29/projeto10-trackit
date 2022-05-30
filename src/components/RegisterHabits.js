import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { ThreeDots } from "react-loader-spinner";

function Day(props) {
    const { day, weekDays, setWeekDays, newHabit, setNewHabit, loading } = props;

    function selectDay() {

        if(!day.selected) {
            setWeekDays([...weekDays], weekDays[day.number].selected = true)
            
            const onlySelected = weekDays.filter(thisDay => thisDay.selected);
            const onlyNumbers = onlySelected.map(thisDay => thisDay.number);
    
            setNewHabit({...newHabit, days: onlyNumbers});
        } else {
            setWeekDays([...weekDays], weekDays[day.number].selected = false);
            
            const onlySelected = weekDays.filter(thisDay => thisDay.selected);
            const onlyNumbers = onlySelected.map(thisDay => thisDay.number);
    
            setNewHabit({...newHabit, days: onlyNumbers});
        }
    }
    
    return(
        <Button selected={day.selected} type="button" onClick={() => selectDay()} disabled={loading} >
            {day.name}
        </Button>
    );
}

function RegisterHabits(props) {
    const { config, habits, setHabits, setShowNewHabitRegister } = props;

    const [loading, setLoading] = useState(false);
    const [newHabit, setNewHabit] = useState({name:"", days:[]});
    const [weekDays, setWeekDays] = useState([
        {name:"D", number:0, selected: false},
        {name:"S", number:1, selected: false},
        {name:"T", number:2, selected: false},
        {name:"Q", number:3, selected: false},
        {name:"Q", number:4, selected: false},
        {name:"S", number:5, selected: false},
        {name:"S", number:6, selected: false}
    ]);

    function mountDays() {
        return weekDays.map(day => { 
            return(
            <Day 
                key={day.number}
                day={day}
                weekDays={weekDays}
                setWeekDays={setWeekDays}
                newHabit={newHabit}
                setNewHabit={setNewHabit}
                loading={loading}
            />
        );
            });
    }

    function registerNewHabit(e) {
        e.preventDefault();

        if(newHabit.days.length !== 0) {
            setLoading(true);

            const body = newHabit;

            const response = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);

            response.then(r => {
                setHabits([...habits, r.data]);
                setLoading(false);
                alert(`Hábito "${newHabit.name}" criado com sucesso!`);
                setShowNewHabitRegister(false);
                setNewHabit({name:"", days:[]});
                setWeekDays([
                    {name:"D", number:0, selected: false},
                    {name:"S", number:1, selected: false},
                    {name:"T", number:2, selected: false},
                    {name:"Q", number:3, selected: false},
                    {name:"Q", number:4, selected: false},
                    {name:"S", number:5, selected: false},
                    {name:"S", number:6, selected: false}
                ]);
            });

            response.catch(r => {
                alert(`Erro ${r.response.status}`);
                setLoading(false);
            });
        } else alert("Selecione pelo menos um dia para o hábito!");
    }

    const day = mountDays();

    return(
        <Container loading={loading}>
            <form onSubmit={registerNewHabit}>
                <input
                    type="text"
                    value={newHabit.name}
                    onChange={e => setNewHabit({...newHabit, name: e.target.value})}
                    placeholder="nome do hábito"
                    disabled={loading}
                    required
                />
                <ListDays>{day}</ListDays>
                <Buttons>
                    <Cancel onClick={() => setShowNewHabitRegister(false)} disabled={loading} >Cancelar</Cancel>
                    <Save type="submit" disabled={loading}>{loading ? <ThreeDots color="#FFFFFF" width={32} height={32} /> : "Salvar"}</Save>
                </Buttons>
            </form>
        </Container>
    );
}

const Container = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;

    width: 340px;
    margin-bottom: 30px;
    padding: 17px;

    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        outline: none;
        background-color: ${({ loading }) => loading ? "#F2F2F2" : "#FFFFFF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;

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

    display: flex;
    justify-content: center;
    align-items: center;

    color: #FFFFFF;
    font-size: 16px;
`;

const ListDays = styled.div`
    width: 100%;
    margin-bottom: 18px;

    display: flex;
    justify-content: flex-start;
`;

const Button = styled.button`
    background-color: ${({ selected }) => selected ? "#CFCFCF" : "#FFFFFF" };
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    width: 30px;
    height: 30px;
    margin-right: 5px;

    color: ${({ selected }) => selected ? "#FFFFFF" : "#DBDBDB" };
    font-size: 20px;
`;

export default RegisterHabits;