import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts, getFirstFilteredProducts, getBrands } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

//TODO: Refactor so you load twice the amount that's given in the limit
//Ex. When mounted, load 12 products by only show 6
//When button is pressed, load the next 6, but fetch the next 6 as well
//If the next 6 loaded has less than 6 products, let's say 4, remove the button after those 4 are rendered

//OR get number of products on mount and remove button when (rendered products === number of products)

const useStyles = makeStyles(theme => ({
    filterBox: {
        position: '-webkit-sticky',
        position: 'sticky',
        top: 100,
        bottom: 20,
        paddingTop: '0px',
        paddingBottom: '0px',
        zIndex: 4,
    },
    RadioBox: {
        marginBottom: "10px"
    }
}));

const Shop = () => {
    const classes = useStyles();
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: [],
            brands: []
        }
    })
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [categoriesError, setCategoriesError] = useState(false)
    const [brandsError, setBrandsError] = useState(false)
    const [resultsError, setResultsError] = useState(false)
    const [limit, setLimit] = useState(6) //6 products on each request
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    const conditions = ["New", "Refurbished", "Used", "Repaired"]


    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters)
        console.log("Load Filtered Results")
        console.log("Initial data.size ", size)
    }, [])


    // load categories and set form data
    const init = () => {

        getCategories()
            .then(data => {
                if (data.error) {
                    setCategoriesError(data.error)
                } else {
                    setCategories(data);
                }
            })
            .catch(err => {
                setCategoriesError(err.message)
            })

        getBrands()
            .then(data => {
                if (data.error) {
                    setBrandsError(data.error)
                } else {
                    setBrands(data);
                }
            })
            .catch(err => {
                setBrandsError(err.message)
            })

    }


    const loadFilteredResults = (newFilters) => {
        //console.log(newFilters);
        getFirstFilteredProducts(skip, limit, newFilters)
            .then(data => {
                if (data.error) {
                    setResultsError(data.error)
                } else {
                    setFilteredResults([])
                    setFilteredResults(data.data);
                    setSize(data.size)
                    setSkip(0)
                }
            })
            .catch(err => {
                setResultsError(err.message)
            })
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        //console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters)
            .then(data => {
                if (data.error) {
                    setResultsError(data.error)
                } else {
                    setFilteredResults([...filteredResults, ...data.data]);
                    console.log("Data.size ", data.size)
                    setSize(data.size)
                    setSkip(toSkip)
                }
            })
            .catch(err => {
                setResultsError(err.message)
            })
    }

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    }


    const handlePrice = (value) => {
        const data = prices;
        let array = [];
        for (let key in data) {
            //console.log(key);
            if (data[key]._id === parseInt(value)) {
                console.log(key);
                console.log(data[key])
                array = data[key].array
            }
        }

        return array;
    }

    const handleFilters = (filters, filterBy) => {
        //console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };

        if (filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        } else {
            newFilters.filters[filterBy] = filters;
        }

        loadFilteredResults(myFilters.filters)

        setMyFilters(newFilters)
    }

    const showCategoriesError = () => {
        if (categoriesError) {
            return (<div className="alert alert-danger" style={{ width: "70%" }}>
                Unable to Fetch Categories
            </div>)
        }
    }

    const showBrandsError = () => {
        if (brandsError) {
            return (<div className="alert alert-danger" style={{ width: "70%" }}>
                Unable to Fetch Brands
            </div>)
        }
    }

    return (
        <Layout
            title="Our Catalogue"
            description="Look Through Our Vast Supply of Turbine Parts"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-2" >
                    <div className={classes.filterBox}>
                        <h4>Filter By Categories</h4>
                        <ul>
                            {showCategoriesError()}
                            <Checkbox
                                listOfFilters={categories}
                                type="category"
                                handleFilters={filters => handleFilters(filters, "category")}
                            //handleFilters={handleFilters}

                            />
                        </ul>
                        <h4>Filter By Brand</h4>
                        <ul>
                            {showBrandsError()}
                            <Checkbox
                                listOfFilters={brands}
                                type="brand"
                                handleFilters={filters => handleFilters(filters, "brand")}
                            //handleFilters={handleFilters}

                            />
                        </ul>
                        <h4>Filter By Price Range</h4>
                        <div className={classes.RadioBox}>
                            <RadioBox
                                prices={prices}
                                handleFilters={filters => handleFilters(filters, "price")}
                            //handleFilters={handleFilters}

                            />
                        </div>
                        <h4>Filter By Condtion</h4>
                        <ul>
                            <Checkbox
                                listOfFilters={conditions}
                                type="condition"
                                handleFilters={filters => handleFilters(filters, "condition")}
                            //handleFilters={handleFilters}

                            />
                        </ul>
                    </div>
                </div>
                <div className="col-10">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, index) => {
                            return (
                                <Fade key={product._id} in={true} timeout={{ enter: 1000 }}>
                                    <div className="col-4 mb-3" >
                                        <Card product={product} />
                                    </div>
                                </Fade>
                            )
                        })}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;