import { API } from "../config";

export const createCategory = (userId, token, category) => {
    //console.log(`${name} ${email} ${password} ${phone} ${country} ${company}`);
    //console.log(JSON.stringify({ name, email, password, contact_phone_number: phone, country, company_name: company }))
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
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

export const createProduct = (userId, token, product) => {
    //console.log(`${name} ${email} ${password} ${phone} ${country} ${company}`);
    //console.log(JSON.stringify({ name, email, password, contact_phone_number: phone, country, company_name: company }))
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product //product will be form data, not raw JSON
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