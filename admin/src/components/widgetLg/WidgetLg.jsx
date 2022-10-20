import { useEffect, useState } from "react";
import { userRequest,setToken } from "../../requestMethod";
import "./widgetLg.css";
import {format} from "timeago.js"

export default function WidgetLg() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        setToken()
        const res = await userRequest.get("orders")
        setOrders(res.data)
      } catch (error) {
      } 

    };
    getOrders();
  }, [])
  // console.log(typeof orders)
  // console.log(orders)

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        
        {orders.slice(0).reverse().map(order=>(

          <tr className="widgetLgTr" key={orders._id}>
          <td className="widgetLgUser">
            
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{format(order.createdAt)}</td>
          <td className="widgetLgAmount">${order.amount/100}</td>
          <td className="widgetLgStatus">
            <Button type={order.status} />
          </td>
        </tr>
        ))}
        
      </table>
    </div>
  );
}
