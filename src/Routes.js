import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute"
import Dashboard from "./user/UserDashboard"
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Page from "./Page"
import Menu from "./core/Menu"



function Routes() {

    return (
        <BrowserRouter>
        <Menu/>
            <Switch>

                <Route path="/" exact render={(props) => {
                    return (
                        <Page location={props.location.pathname}>
                            <Home {...props} />
                        </Page>
                    )
                }} />

                <Route path="/shop" exact render={(props) => {
                    return (
                        <Page location={props.location.pathname}>
                            <Shop {...props} />
                        </Page>
                    )
                }} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/product/:productId" exact component={Product} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact  component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
            </Switch>
        </BrowserRouter>

    )
};

export default Routes;
