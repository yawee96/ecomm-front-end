import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage"
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';

//TODO: Refactor so you load twice the amount that's given in the limit
//Ex. When mounted, load 12 products by only show 6
//When button is pressed, load the next 6, but fetch the next 6 as well
//If the next 6 loaded has less than 6 products, let's say 4, remove the button after those 4 are rendered

//OR get number of products on mount and remove button when (rendered products === number of products)

const useStyles = makeStyles(theme => ({
    added: {
        color: "#20d420",
        fontWeight: "bold"
    }
}));


const Card = (props) => {
    const classes = useStyles();
    // TODO: handle case where the product is sold out (ie. Either remove from database or don't show it)

    const { product } = props
    const { showViewProductButton = true } = props //default value is true for showViewProductButton
    const { showInquireButton = false } = props

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-info mt-2 mb-2 mr-3">
                        More Info
                    </button>
                </Link>
            )
        )
    }

    const showInquire = () => {
        return (
            showInquireButton && (
            <button className="btn btn-warning mt-2 mb-2">
                Inquire
            </button>
            )
        )
    }

    const showStock = (quantity) => {
        return (
            quantity > 0 ?
        (<span className="badge badge-primary badge-pill">{quantity} In Stock</span> ) :
            (<span className="badge badge-primary badge-pill">Out of Stock</span> )
        )
    }

    return (

        <div className="card">
            <div className="card-header name">
                {product.name}
            </div>
            <div className="card-body">
                <ShowImage item={product} url="product" />
                <p>{product.description.substring(0, 60)} <span>{(product.description.length > 60) ? "..." : ""}</span></p>
                <p className="black-9">${product.price}</p>
                <p className="black-8">Category: {product.category && product.category.name}</p>
                <p className="black-8">Condition: {product.condition}</p>
                <p className={classes.added}>Added: {moment(product.createdAt).fromNow()}</p>
                {showStock(product.quantity)}
                <br />
                {showViewButton(showViewProductButton)}
                {showInquire(showInquireButton)}
                {/* <button className="btn btn-warning mt-2 mb-2">
                            Add to Cart
                        </button> */}
            </div>
        </div>

    )
}

export default Card;