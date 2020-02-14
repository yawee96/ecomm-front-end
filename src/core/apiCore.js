import {API} from "../config";
import queryString from "query-string";

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=12`, {
        method: "GET"
    })
    .then(response => response.json())
    .catch(error => {
        console.log(error)
        throw new Error(error);
    })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
        throw new Error(err);
    })
}

export const getBrands = () => {
    return fetch(`${API}/products/brands`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
        throw new Error(err);
    })
}

export const getFirstFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        //skip,
        filters
    }
    console.log("Fetching Products in Shop")
    //console.log(`${name} ${email} ${password} ${phone} ${country} ${company}`);
    //console.log(JSON.stringify({ name, email, password, contact_phone_number: phone, country, company_name: company }))
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())//{
        //console.log("Inside the promise: " + JSON.stringify(response.json()));
        //  response.json();
        //})
        .catch(err => {
            console.log(err);
            throw new Error(err);
        })
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    }
    console.log("Fetching Products in Shop")
    //console.log(`${name} ${email} ${password} ${phone} ${country} ${company}`);
    //console.log(JSON.stringify({ name, email, password, contact_phone_number: phone, country, company_name: company }))
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())//{
        //console.log("Inside the promise: " + JSON.stringify(response.json()));
        //  response.json();
        //})
        .catch(err => {
            console.log(err);
            throw new Error(err);
        })
}

//this function takes in what the user typed and the category
export const list = (params) => {
    const query = queryString.stringify(params)
    console.log("QUERY", query);

    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
    .then(response => response.json())
    .catch(error => {
        console.log(error)
        throw new Error(error);
    })
}

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
        throw new Error(err);
    })
}


export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
        throw new Error(err);
    })
}