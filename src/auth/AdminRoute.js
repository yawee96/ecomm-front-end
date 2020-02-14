import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";
import Page from "../Page"

const AdminRoute = ({ component: Component, ...rest }) => {
    return (<Route {...rest} render={ props => {
        if(isAuthenticated() && isAuthenticated().user.role === 1){
            return (
                <Page location={props.location.pathname}>
            <Component {...props} />
            </Page>)
        } else {
            return (<Redirect to={{ pathname: "/signin", state: { from: props.location } }} />)
        }
    }}
    />)
}

export default AdminRoute;