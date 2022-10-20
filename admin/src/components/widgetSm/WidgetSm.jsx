import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest,setToken } from "../../requestMethod";


export default function WidgetSm() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        setToken()
        const res = await userRequest.get("users/?new=true")
        setUsers(res.data)
      } catch (error) {
      } 

    };
    getUsers();
  }, [])
  // console.log(typeof users.users)
  // console.log(users.users)
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {users.users && (<>
        {(users.users).map(user=>(
          
          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img || 
              "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"}
              alt=""
              className="widgetSmImg"
              />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div> 
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      ))}
      </>)}
      </ul>
    </div>
  );
}
