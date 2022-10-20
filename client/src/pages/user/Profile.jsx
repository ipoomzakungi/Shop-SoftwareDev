import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom/cjs/react-router-dom.min";
import { updateUser } from '../../redux/apiCalls';


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


const Profile = () => {

  const location = useLocation()
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.currentUser)
  const sendInfo = () => {
  }
  const handleClick = () => {

    console.log(user)
    var element = {};
    element.userid = user._id;
    element.username = "realAdmin";
  
    console.log(element)
    console.log("updateUser")
    updateUser(element, dispatch);
    
    
    //dispatch(resetProduct());
    //window.location = '/';   

  };
  
  return (
    <div>
      Profile
      {/* {sendInfo()} */}
      <Button onClick={handleClick}>
        test
      </Button>

    </div>
  )
}

export default Profile