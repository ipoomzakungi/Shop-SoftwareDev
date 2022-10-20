import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from "react-redux";
import styled from 'styled-components'
import { Badge } from '@material-ui/core'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logoutStart } from "../../redux/userRedux";


const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
`

export default function Topbar() {
  const handleClickLogout = () => {
    //e.preventDefault();
    alert("Start")
    logoutStart();
    localStorage.clear();
    window.location = '/';   

    //alert("Start")

  }

  const handleClick = (e) => {
    window.location = "http://localhost:3000/"
  }
  const user = useSelector(state => state.user.currentUser)
  console.log("user", user)

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to={'/'}><span className="logo">SoftDevAdmin</span></Link>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <span className="nextPage" onClick={handleClick}>SHOP</span>
          <img src={user.profilePicture ? user.profilePicture : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"} alt="" className="topAvatar" />
          <MenuItem>
            <Badge color="primary">
              <LogoutOutlinedIcon onClick={handleClickLogout}/>
            </Badge>
          </MenuItem>
        </div>
      </div>
    </div>
  );
}
