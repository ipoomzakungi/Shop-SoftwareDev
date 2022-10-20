import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { resetProduct } from "../redux/cartRedux";
import { addOrder } from '../redux/apiCalls';
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


const Success = () => {

  const location = useLocation()
  const dispatch = useDispatch();

  const sendInfo = () => {
    alert("send");
    console.log("location", location);
    var element = {};
    element.userId = location.state.user.username;
    element.key = location.key;
    element.products = location.state.products.products;
    element.address = location.state.stripeData.billing_details.address;
    element.amount = location.state.stripeData.amount;
    element.receipt_url = location.state.stripeData.receipt_url;
    element.status = location.state.stripeData.status;
    

    console.log(element)
    addOrder(element, dispatch);
    console.log("resetProduct")
    dispatch(resetProduct());

  }
  const handleClick = () => {

    


    window.location = '/';   

  };

  
  return (
    <div>
      Successful
      {/* {sendInfo()} */}
      <Button onClick={sendInfo}>
        sendInfo
      </Button>
      <Button onClick={handleClick}>
        backHome
      </Button>

    </div>
  )
}

export default Success