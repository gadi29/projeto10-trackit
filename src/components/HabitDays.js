import React from "react";
import styled from "styled-components";

function Day(props) {
    const { day } = props;
    
    return(
        <DivDay selected={day.selected}>
            {day.name}
        </DivDay>
    );
}

function HabitDays(props) {
    const { habit } = props;
    
    const newWeek = [
        {name:"D", number:0, selected: false},
        {name:"S", number:1, selected: false},
        {name:"T", number:2, selected: false},
        {name:"Q", number:3, selected: false},
        {name:"Q", number:4, selected: false},
        {name:"S", number:5, selected: false},
        {name:"S", number:6, selected: false}
    ];

    function mountDays() {
        for(let i = 0; i < newWeek.length; i++) {
            for(let j = 0; j < habit.days.length; j++) {
                if (newWeek[i].number === habit.days[j]) newWeek[i].selected = true;
            }
        }

        return newWeek.map(day => { 
            return(
            <Day 
                key={day.number}
                day={day}
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

const DivDay = styled.div`
    background-color: ${({ selected }) => selected ? "#CFCFCF" : "#FFFFFF" };
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    width: 30px;
    height: 30px;
    margin-right: 5px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ selected }) => selected ? "#FFFFFF" : "#DBDBDB" };
    font-size: 20px;
`;

export default HabitDays;