import React from "react";
import styled from "styled-components";

function Day(props) {
    const { day, number, click, selected } = props;
    
    return(
        <Button selected={selected} type="button" onClick={() => click(number)}>
            {day}
        </Button>
    );
}

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

export default Day;