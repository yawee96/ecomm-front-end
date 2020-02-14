import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
    const [name, setName] = useState("")
    //const [error, setError] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    //destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const handleChange = (e) => {
        setError("");
        setSuccess(false);
        setName(e.target.value);
    }

    // const showSuccess = () => {
    //     if (success) {
    //         return <h3 className="text-success">{name} is created!</h3>
    //     }
    // }

    const showSuccess = () => {
        if (success) {
            return (<div className="alert alert-success" >
                {name} is created!
            </div>)
        }
    }


    // const showError = () => {
    //     if (error) {
    //         return <h3 className="text-danger">{name} is not a unique category</h3>
    //     }
    // }

    const showError = () => {
        if (error) {
            return (<div className="alert alert-danger" >
                {name} is not a unique category or {error}
            </div>)
        }
    }



    const clickSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, token, { name })
            .then(data => {
                console.log("HEERE")
                if (data.error) {
                    setError(data.error);
                } else {
                    setError("");
                    setSuccess(true);
                }
            })
            .catch(err => {
                console.log(err);
                setError(err.message)
            })
    }


    const newCategoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
                </div>
                <button className="btn btn-outline-primary">
                    Create Category
                    </button>
            </form>
        )
    }

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
            </div>
        )
    }

    return (
        <Layout title="Add New Category" description={`Hi ${user.name}, ready to add new category?`}>
            <div className="row" >
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>

    )
}

export default AddCategory;