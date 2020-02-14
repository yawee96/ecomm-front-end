import React, { useState } from "react";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated} from "../auth/index";
import { Redirect } from "react-router-dom";

function Signin() {

    const [values, setValues] = useState({
        email: "kipp@gmail.com",
        password: "kipp123",
        error: "",
        loading: false,
        redirectToReferrer: false //when this is true, we will redirect the user to the dashboard 
    })

    const {user} = isAuthenticated();

    //higher order function ie. function returning a function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }


    const clickSubmit = (event) => {
        // when the button is clicked, the browser will reload so we do this to prevent the submit from propagating up to the window
        event.preventDefault()
        //when the user clicks, loading is true to show the loading
        //when login is successful, loading is then set to false
        setValues({ ...values, error: false, loading: true })
        const { email, password} = values;
        signin(email, password)
            .then(data => {
                // console.log("Outside the promise: " + JSON.stringify(data));
                // console.log("HEERE")
                if (data === undefined || data.error) {
                    //console.log("here")
                    console.log(data);
                    throw new Error(data.error)
                } else {
                    console.log("User Authenticated")
                    // setValues({
                    //     ...values,
                    //     name: "",
                    //     email: "",
                    //     password: "",
                    //     error: "",
                    //     loading: false
                    // })
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
    
                        })
                    })
                }
            })
            .catch( err => {
                console.log("In the outside promise catch")
                console.log(err.message);
                setValues({ ...values, error: err.message, loading: false })
                //setValues({ ...values, error: "Failed to sign in... must be on our end", loading: false })
            })
    }


    const signInForm = () => {
        return (
            <form>
                <div className="row">
                    <div className=" col-md-4">
                        <h3>Sign In Information</h3>
                        {/* <div className="form-group">
                            <label className="text-muted">Name</label>
                            : {values.name}
                            <input type="text" onChange={handleChange("name")} className="form-control" />
                        </div> */}
                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            {/* : {values.email} */}
                            <input type="email" value={values.email} onChange={handleChange("email")} className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            : {values.password}
                            <input type="password" value={values.password} onChange={handleChange("password")} className="form-control" required />
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
            </form>
        )
    }

    const showError = () => {
        return (<div className="alert alert-danger" style={{ display: values.error ? "" : "none" }}>
            {values.error}
        </div>)
    }

    const showLoading = () => {
        if (values.loading) {
            return (
                <div className="alert alert-info" >
                    <h2>Loading...</h2>
                </div>
            )
        }
    }

    const redirectUser = () => {
        if (values.redirectToReferrer) {
            if( user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to ="/" />
        }
    }

    return (
        <Layout
            title="Sign In"
            description=""
            // altogether it's a 12 col grid so 8 for the container
            // and 2 on each side
            className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )

}

export default Signin;