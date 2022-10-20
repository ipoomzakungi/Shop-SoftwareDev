import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import TransactionList from "./pages/transactionList/transactionList";
import Transaction from "./pages/transaction/Transaction";


function App() {

  const persisrootUser = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const user = persisrootUser && JSON.parse(persisrootUser).currentUser;
  const admin = user?.isAdmin;


  return (
    <Router>
      <Switch>
        {!admin&&
        <Route path="/">
          <Login />
        </Route>
        }
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/transactions">
                <TransactionList />
              </Route>
              <Route path="/transaction/:productId">
                <Transaction />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
            </div>
          </>)}
      </Switch>
    </Router>
  );
}

export default App;
