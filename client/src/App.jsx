
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import { Redirect,
  BrowserRouter as Router,
  Switch,
  Route } from "react-router-dom/cjs/react-router-dom.min";
import Success from "./pages/Success";
import { useSelector } from 'react-redux';
import Profile from "./pages/user/Profile";
import OrderList from "./pages/user/OrderList";
import Messenger from "./pages/messenger/Messenger";
import TestMessage from "./pages/testMessage";



const App = () => {
  const user = useSelector(state=>state.user.currentUser)
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/products/:category">
          <ProductList/>
        </Route>
        <Route path="/product/:id">
          <Product/>
        </Route>
        <Route path="/cart">
          <Cart/>
        </Route>
        <Route path="/success">
          <Success/>
        </Route>
        <Route path="/users/profile">
          <Profile/>
        </Route>
        <Route path="/users/orderlist">
          <OrderList/>
        </Route>
        <Route path="/testMessage">
          <TestMessage/>
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/"/> : <Login/>}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/"/> : <Register/>}

        </Route>
        <Route path="/logout">
          {user ? <Logout/> : <Redirect to="/"/>}

        </Route>
        <Route path="/messenger">
          {user ? <Messenger/> : <Redirect to="/"/>}
        </Route>
      </Switch>
    </Router>
  )
};

export default App;