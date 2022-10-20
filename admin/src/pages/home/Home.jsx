import Chart from "../../../../admin/src/components/chart/Chart";
import FeaturedInfo from "../../../../admin/src/components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../../../admin/src/dummyData";
import WidgetSm from "../../../../admin/src/components/widgetSm/WidgetSm";
import WidgetLg from "../../../../admin/src/components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest, setToken } from "../../../../admin/src/requestMethod";

export default function Home() {
  const [userStats, setUserStats] = useState([])

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",

    ],
    []
  )

  useEffect(() => {
    const getStats = async () => {
      try {
        setToken()
        const res = await userRequest.get("/users/stats")
        res.data.map(item => {
          setUserStats(prev => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total }
          ])
        })
      } catch (error) {

      }
    }
    getStats();
  }, [MONTHS]);

  //console.log(userStats);


  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
