import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import "./Home.css"
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from "@material-ui/core/Fade"
import { render } from "@testing-library/react";

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([])
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const loadSingleProduct = (productId) => {
        setLoading(true)
        read(productId)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    console.log("DATA", JSON.stringify(data))
                    setProduct(data)
                    // fetch related products
                    listRelated(data._id)
                        .then(data => {
                            if (data.error) {
                                setError(data.error)
                            } else {

                                setRelatedProducts(data);
                                setLoading(false);
                            }
                        })
                        .catch(err => {
                            setError(err.message)
                        })
                }
            })
            .catch(err => {
                setError(err.message)
            })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        console.log("SINGLE PRODUCT LOADING")
        loadSingleProduct(productId);
    }, [props])


    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {loading ?
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <CircularProgress color="secondary" />
                        </div>
                        :
                        (product && product.description &&
                        <Fade key={product._id} in={product !== null} timeout={{ enter: 1000 }}>
                            <div>
                            <Card product={product} showViewProductButton={false} showInquireButton={true} />
                            </div>
                        </Fade>)
                        //TODO: FADE NOT WORKING
                    }
                </div>
                <div className="col-4">
                    <h4>Related Products</h4>
                    {loading ?
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <CircularProgress color="secondary" />
                        </div> :

                        relatedProducts.map((product, index) => {
                            return (
                                <Fade key={product._id} in={true} timeout={{ enter: 1000 }}>
                                    <div key={index} className="mb-3">
                                        <Card product={product} />
                                    </div>
                                </Fade>
                            )
                        })}

                </div>
            </div>
        </Layout>
    )
}

export default Product;