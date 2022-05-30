import React, { useState } from "react";
import styled from "styled-components";

function Day(props) {
    const { day, weekDays, setWeekDays } = props;

    function selectDay() {

        if(!day.selected) {
            setWeekDays([...weekDays], weekDays[day.number].selected = true)
        } else {
            setWeekDays([...weekDays], weekDays[day.number].selected = false);
        }
    }
    
    return(
        <Button selected={day.selected} type="button" onClick={() => selectDay()}>
            {day.name}
        </Button>
    );
}

function Days(props) {
    const { weekDays, setWeekDays } = props;
    function mountDays() {
        return weekDays.map(day => { 
            return(
            <Day 
                key={day.number}
                day={day}
                weekDays={weekDays}
                setWeekDays={setWeekDays}
            />
        );
            });
    }

    const day = mountDays();

    return(
        <ListDays>{day}</ListDays>
    );
}

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

export default Days;