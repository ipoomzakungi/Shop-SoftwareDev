import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined, ChatBubble } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { setToken } from '../requestMethod'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
    background-color: #6FDFDF;
    `

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
flex:1;
display: flex;
align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
border: none;
${mobile({ width: "50px" })}
`

const Center = styled.div`
    display: flex;
    align-items: center;
    
`

const Logo = styled.h1`
font-weight: bold;
&:focus, &:hover, &:visited, &:link, &:active {
    color: black;
    text-decoration: none;

}
text-decoration: none;
${mobile({ fontSize: "24px" })}

`

const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: 2, justifyContent: "center" })}
`

const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Navbar = () => {
    // console.log(useSelector(state => state.cart))
    const quantity = useSelector(state => state.cart.quantity)
    // console.log(quantity)
    const user = useSelector(state => state.user.currentUser)
    console.log(user)
    //console.log("test",JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser)
    setToken()
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>

                        <Link to={'/'}>
                            SoftwareDev.
                        </Link>

                    </Logo>




                </Center>
                <Right>
                    { !user && 
                        
                    <>
                    <Link to={'/register'}>
                        <MenuItem>REGISTER</MenuItem>
                    </Link>

                    <Link to={'/login'}>
                        <MenuItem>SIGN IN</MenuItem>
                    </Link>

                    </>}

                    <Link to={'/cart'}>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>

                    <Link to={'/messenger'}>
                        <MenuItem>
                            <Badge color="primary">
                                <ChatBubble />
                            </Badge>
                        </MenuItem>
                    </Link>
                    <Link to={'/logout'}>
                        <MenuItem>
                            <Badge color="primary">
                                <LogoutOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Link>


                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar