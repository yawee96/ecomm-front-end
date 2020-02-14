import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";
import Page from "../Page"

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     <Route
//         {...rest}
//         render={props => isAuthenticated() ? (
//             <Component {...props} />
//         ) : (
//                 <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
//             )
//         }
//     />
// }

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (<Route {...rest} render={ props => {
        if(isAuthenticated() && isAuthenticated().user.role === 0){
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

export default PrivateRoute;