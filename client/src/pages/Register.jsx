import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { register } from '../redux/apiCalls'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5), rgba(255,255,255,0.5)
        ), 
        url("https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.6435-9/107658389_3920277831376012_3925696135042186532_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=973b4a&_nc_ohc=gpJwedbSgowAX9iDwaL&_nc_ht=scontent.fbkk5-3.fna&oh=00_AT8Z0-Lwy956sTSh9IIZvIVG3SdAe7QR6qiKm_m4ilMKXg&oe=6270E8DC") 
    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
        display: flex;
        flex-wrap: wrap;
`

const Input = styled.input`
        flex:1;
        min-width: 40%;
        margin: 20px 10px 0px 0px;
        padding: 10px;
`
const Agreement = styled.span`
        font-size:12px;
        margin: 20px 0px;
`
const Button = styled.button`
        width: 40%;
        border:none;
        padding: 15px 20px;
        background-color:teal;
        color:white;
        cursor: pointer;
`

const Register = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        console.log("name", name)
        console.log("lastName", lastName)
        console.log("username", username)
        console.log("email", email)
        console.log("password", password)
        console.log("confirmPassword", confirmPassword)
        if (!(name === "" || lastName === "" || username === "" || email === "" 
        || password === "")) {

            if (password === confirmPassword) {
                console.log("first")
                var element = {};
                element.username = username;
                element.name = name
                element.lastName = lastName;
                element.email = email;
                element.password = password;
                register(dispatch,element)
            } else {
                alert("Your password and confirmPassword are not same");
                console.log("password", password)
                console.log("confirmPassword", confirmPassword)

            }
        }else{
            alert("Please fill all the form");

        }

    };

    return (
        <Container>
            <Wrapper>
                <Title>
                    Create an Account
                </Title>
                <Form>
                    <Input placeholder="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input placeholder="last name"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Input placeholder="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input placeholder="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input placeholder="confirm password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Agreement> Fish swiming in the big pool of Fish A SSSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA </Agreement>
                    <Button onClick={handleClick}>Create</Button>
                </Form>
            </Wrapper>

        </Container>
    )
}

export default Register