
import { Add, Remove } from '@material-ui/icons'
import { useRef } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest,userRequest } from "../requestMethod";
import { addProduct } from "../redux/cartRedux";
import { useDispatch,useSelector } from "react-redux";
import { createConversations, checkConversations } from '../redux/apiCalls';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`
const ImgContainer = styled.div`
    flex:1;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
`
const InfoContainer = styled.div`
    flex:1;
    padding: 0px 50px;
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 400;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin:0px 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 10px;
    
`
const FilterSizeOption = styled.option`

`

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 600;

`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
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




const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
    const socket = useRef();
    const user = useSelector(state => state.user.currentUser)
    const history = useHistory()

    



    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
            } catch { }
        };
        getProduct();
    }, [id])

    const handleQuantity = (type) => {


        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
        console.log("product", product)
        console.log("quantity", quantity)
        console.log("color", color)
        console.log("size", size)
    };

    const handleClick = () => {
        if (color === "" || size === "") {
            alert("Please select color and size");
            console.log("color", color)
            console.log("size", size)

        } else {

            console.log("product", product)
            dispatch(
                addProduct({ ...product, quantity, color, size })
            );
        }
    };

    const sendInfo = async () => {



        alert("start");
        //console.log("location", location);
        var element = {};
        // element.senderId = location.state.user.username;
        element.senderId = "624bc77c99a2010072558035";
        element.receiverId = "6264f15114e2f906935cc2a4";
        const a = await checkConversations(element);
        if(a.data?._id){
            console.log("Already Create : Do nothing")
            console.log("conversation ID :",a.data?._id);
        }else{
            console.log("Creating Conversations")
            a = await createConversations(element);
            console.log("conversation ID :",a.data._id)
        }
        

        console.log("end Conversation Part")

        const message = {
            sender: user._id,
            text: `product name : ${product.title} ---- price : $${product.price} `,
            conversationId: a.data._id,
            img: `${product.img}`
        };

        // const receiverId = currentChat.members.find(
        //     (member) => member !== user._id
        // );

        // socket.current.emit("sendMessage", {
        //     senderId: user._id,
        //     receiverId,
        //     text: newMessage,
        // });

        try {
            const res = await userRequest.post("/messages", message);
            console.log(res)
        } catch (err) {
            console.log(err);
        }

        history.push("/messenger", {
            currentChat: a.data,
        });

    }

    return (
        <Container>
            {console.log(`product name : ${product.title}
halo`)}
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />

                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (

                                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                            ))}
                        </Filter>

                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>

                                {product.size?.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>

                    </FilterContainer>
                    <AddContainer>

                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={handleClick}>
                            Add to cart
                        </Button>
                        <Button onClick={sendInfo}>
                            Contact
                        </Button>


                    </AddContainer>
                </InfoContainer>

            </Wrapper>

            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product