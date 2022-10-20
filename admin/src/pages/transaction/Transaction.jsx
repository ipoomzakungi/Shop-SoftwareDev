import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./transaction.css";
import { format } from "timeago.js"
import { userRequest, setToken } from "../../requestMethod";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from "../../firebase"
import { updateOrder, updateProduct } from "../../redux/apiCalls";



export default function User() {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const [transactions, setTransactions] = useState([])
  const [user, setUser] = useState([])

  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }


  const handleClick = (e) => {
    e.preventDefault();

    console.log("welcome")
    const product = { ...inputs };
    updateOrder(id, product)

  }



  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(
          `/orders/` + id
        );
        setTransactions(res.data);
      } catch (err) { }
    };
    getOrders();
  }, []);

  console.log("transactions", transactions)

  // const user = users.users?.find(user => user._id === userId)
  // console.log(user, userId)


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Transactions</h1>
        
      </div>
      {transactions.orders && <>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <div className="userShowTopTitle">
                <span className="userShowUsername">{transactions.orders[0].userId ? transactions.orders[0].userId : "Didn't Push"}</span>

              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Transactions Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">Key  : {transactions.orders[0].key}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">Date : {transactions.orders[0].createdAt.slice(0, 10)}</span>
              </div>
              <span className="userShowTitle">Receipt Details</span>
              {/* <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div> */}
              <div className="userShowInfo">
                <span className="userShowInfoTitle">Status : {transactions.orders[0].status}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{transactions.orders[0].receipt_url.slice(0, 48)}</span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">{transactions.orders[0].receipt_url.slice(48, 91)}</span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">{transactions.orders[0].receipt_url.slice(91, -1)}</span>
              </div>

            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={transactions.orders[0].userId}
                    className="userUpdateInput"
                    name="userId"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Status</label>
                  <input
                    type="text"
                    placeholder={transactions.orders[0].status}
                    className="userUpdateInput"
                    name="status"
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div> */}
                {/* <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput"
                  />
                </div> */}
                <button className="userUpdateButton" onClick={handleClick}>Update</button>
              </div>
              <div className="userUpdateRight">

              </div>
            </form>
          </div>
        </div>
      </>}
    </div>
  );
}
