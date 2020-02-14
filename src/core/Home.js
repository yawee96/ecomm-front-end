import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import "./Home.css"
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search"
import seedData from "../seedData";

function Home() {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState("");

    const loadProductsBySell = () => {
        getProducts("sold")
            .then(data => {
                if (data.error) {
                    setError(data)
                } else {
                    console.log("Sell Data: " + JSON.stringify(data))
                    setProductsBySell(data)
                }
            })
            .catch(err => {
                //load seed data
                console.log("SEED DATA LOADED")
                setProductsBySell(seedData)
                console.log(err)
                setError(err.message)
            })
    }

    const loadProductsByArrival = () => {
        getProducts("createdAt")
            .then(data => {
                //console.log(data)
                if (data.error) {
                    setError(data)
                } else {
                    console.log("Arrival Data: " + JSON.stringify(data))
                    setProductsByArrival(data)
                }
            })
            .catch(err => {
                //load seed data
                setProductsByArrival(seedData);
                console.log(err)
                setError(err.message)
            })
    }

    useEffect(() => {
        loadProductsByArrival()
        console.log(productsByArrival)
        loadProductsBySell()
        console.log(productsBySell)
    }, [])

    const showError = () => {
        if (error) {
            return (<div className="alert alert-danger" >
                {error}
            </div>)
        }
    }

    return (
        <Layout className="home homeBody container-fluid" title="Tradewins Wind Energy Group" description="Browse North America's Largest Supplier of Wind Turbine Parts">
            <Search />
            {/* <h2 className="mb-4">Our Products</h2>
            {showError()}
            <div className='row'>
                {productsBySell.map((product, index) => {
                    return (
                        <div className="col-4 mb-3" key={index}>
                            <Card product={product} />
                        </div>
                    )
                })}
            </div> */}

            <hr />

            {/* <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
            {productsByArrival.map((product, index) => {
                return (
                    <Card key={index} product={product} />
                )
            })}
            </div> */}
        </Layout>
    )
}

export default Home;