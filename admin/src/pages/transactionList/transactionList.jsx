import "./transactionList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest, setToken } from "../../requestMethod";
import { format } from "timeago.js"



export default function TransactionList() {
    //const [data, setData] = useState(userRows);
    const [transactions, setTransactions] = useState([])
    let cutTheReceipt = 0;
    useEffect(() => {
        const getTransactions = async () => {
            try {
                setToken()
                const res = await userRequest.get("orders")
                setTransactions(res.data)
            } catch (error) {
            }

        };
        getTransactions();
    }, [])


    console.log("transactions", transactions)
    //transactions.receipt_url=transactions.receipt_url.slice(31)
    //console.log("data", data)
    if (!cutTheReceipt && transactions) {
        for (let i = 0; i < transactions.length; i++) {
            transactions[i].receipt_url = transactions[i].receipt_url.slice(31)
            transactions[i].amount = transactions[i].amount / 100
            // transactions[i].createdAt=transactions[i].createdAt.slice(0, 10)
            transactions[i].createdAt = format(transactions[i].createdAt)

        }
        cutTheReceipt = 1;
        // if (transactions) transactions = transactions.reverse()

    }
    console.log("transactions", transactions)



    const handleDelete = (id) => {
        //setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 200 },
        {
            field: "userId",
            headerName: "User",
            width: 120,
            //   renderCell: (params) => {
            //     return (
            //       <div className="userListUser">
            //         <img className="userListImg" src={params.row.profilePicture ? 
            //           params.row.profilePicture : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"} 
            //           alt="" />
            //         {params.row.username}
            //       </div>
            //     );
            //   },
        },
        { field: "amount", headerName: "Amount", width: 150 },
        {
            field: "createdAt",
            headerName: "createdAt",
            width: 120,
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/transaction/" + params.row._id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    return (

        <div className="userList">
            {transactions &&
                <>
                    <DataGrid
                        rows={transactions}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={row => row._id}
                        pageSize={8}
                        checkboxSelection
                    />
                </>}
        </div>

    );
}
