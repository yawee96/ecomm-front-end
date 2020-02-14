import React, { useState, useEffect } from "react";
import "./Home.css"
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import Fade from '@material-ui/core/Fade';

const Search = () => {
    const [data, setData] = useState({
        categories: [], //make api request to get all the categories
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data

    const loadCategories = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    console.log(JSON.stringify(data))
                    console.log("setData: ", JSON.stringify({ ...data, categories: data }))
                    setData({ ...data, categories: data })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        console.log(search, category)
        if (search) {
            list(
                {
                    search: search || undefined,
                    category: category
                })
                .then(response => {
                    if (response.error) {
                        console.log(response.error)
                    } else {
                        setData({...data, results: []})
                        setData({ ...data, results: response, searched: true })
                    }
                })
        }
        // Tell user they need to type in something
    }

    const searchSubmit = (event) => {
        event.preventDefault();
        setData({...data, searched: false})
        searchData();
    }

    const handleChange = (name) => (event) => {
        //setData({ ...data, [name]: event.target.value, searched: false })
        setData({ ...data, [name]: event.target.value})
    }

    const searchMessage = (searched, results) => {
        if(searched && results.length === 1) {
            return `Found ${results.length} product`
        }
        if(searched && results.length > 0) {
            return `Found ${results.length} products`
        }
        if(searched && results.length < 1) {
            return `No products found`
        }
    }

    //default value is empty array
    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                {results.map((product, index) => {
                    return (
                        <Fade key={product._id} in={true} timeout={{enter: 1000}}>
                        <div className="col-4 mb-3" key={index}>
                            <Card product={product} />
                        </div>
                        </Fade>
                    )
                })}
            </div>
            </div>
        )
    }

    const searchForm = () => {
        return (
            <form onSubmit={searchSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <select className="btn mr-2"
                                onChange={handleChange("category")}
                            >
                                <option value="All">All Categories</option>
                                {categories.map((category, index) => {
                                    return (
                                        <option key={index} value={category._id}>
                                            {category.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <input
                            type="search"
                            className="form-control"
                            onChange={handleChange("search")}
                            placeholder="Search by name"
                        />
                    </div>
                    <div className="btn input-group-apped" style={{ border: "none" }}>
                        <button className="input-group-text">Search</button>
                    </div>
                </span>
            </form>
        )
    }

    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
            </div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default Search;