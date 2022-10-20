import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { logout } from '../redux/apiCalls';
import { useDispatch } from "react-redux";
import styled from 'styled-components'


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


  const handleClick = () => {
    console.log("Clicked");
    // var element = {};
    // element.userId = location.key;
    // element.products= location.state.products.products;
    // element.address = location.state.stripeData.billing_details.address;
    // element.amount = location.state.stripeData.amount;
    // element.receipt_url = location.state.stripeData.receipt_url;
    // element.status = location.state.stripeData.status;

    // console.log(element)
    // // dispatch(
    // //   addProduct({ location })
    // // );
    logout(dispatch);


  };
  // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //   const product = { ...inputs, img: downloadURL, categories: cat };
  //   addProduct(product,dispatch)
  // });
  return (
    <div>
      Logout
      <Button onClick={handleClick}>
        test logout
      </Button>

    </div>
  )
}

export default Success