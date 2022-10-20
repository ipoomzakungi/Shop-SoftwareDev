import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { createConversations, checkConversations, getUserByUsername } from '../redux/apiCalls';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom/cjs/react-router-dom.min";


const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`


const testMessage = () => {

    //const location = useLocation()
    //const dispatch = useDispatch();
    let testNum = 0;

    const sendInfo = async () => {
        const a = await getUserByUsername("realAdmin");
        console.log("a",a)
    }
    const handleClick = () => {


        window.location = '/';

        

    };


    return (
        <div>
            testMessage
            {/* {!testNumber && sendInfo()} */}
            <Button onClick={sendInfo}>
                sendInfo
            </Button>
            
            <Button onClick={handleClick}>
                backHome
            </Button>

        </div>
    )
}

export default testMessage