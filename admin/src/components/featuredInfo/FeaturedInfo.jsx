import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest,setToken} from "../../requestMethod";

export default function FeaturedInfo() {
  const [income , setIncome] = useState([])
  const [perc , setPerc] = useState(0)


  useEffect(()=>{
    const getIncome = async ()=>{
      try {
        setToken()
        const res = await userRequest.get("orders/income")
        setIncome(res.data)
        console.log(res.data)
        setPerc(((res.data[1].total/res.data[0].total)*100)-100)
        
      } catch (error) {
        
      }
    }
    getIncome()
  },[])

  // console.log("income")
  // console.log(income)
  // console.log(income)


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          {income&& <>
          {console.log("income",income)}
          { income[1] &&<span className="featuredMoney">${income[1].total/100}</span> }
          <span className="featuredMoneyRate">
            {Math.floor(perc)}%{" "} 
            {perc < 0 ? (
              
              <ArrowDownward  className="featuredIcon negative"/>
              ): <ArrowUpward className="featuredIcon"/>}
          </span>
           </> }
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      {/* <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}
    </div>
  );
}