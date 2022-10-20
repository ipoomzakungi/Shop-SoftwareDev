import "./newUser.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { format } from "timeago.js"
import { userRequest, setToken } from "../../requestMethod";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from "../../firebase"
import { addProduct, addUser, updateOrder, updateProduct } from "../../redux/apiCalls";



export default function NewUser() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
    console.log(inputs)
  }


  const handleClick = (e) => {
    e.preventDefault();

    console.log("welcome")
    const product = { ...inputs };
    addUser(product, dispatch)

  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">

        <div className="newUserItem">
          <label>First Name</label>
          <input type="text"
            placeholder="John"
            name="name"
            onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input type="text"
            placeholder="Smith"
            name="lastName"
            onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email"
            placeholder="john@gmail.com"
            name="email"
            onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text"
            placeholder="john"
            name="username"
            onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password"
            placeholder="password"
            name="password"
            onChange={handleChange} />
        </div>

        <div className="newUserItem">
          <label>Is Admin</label>
          <select className="newUserSelect"
            id="active" 
            name="isAdmin"
            onChange={handleChange}>
    
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="newUserItem">

        </div>
        <button className="newUserButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
