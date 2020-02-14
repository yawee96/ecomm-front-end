import { API } from "../config";

export const signup = (name, email, password, phone, country, company) => {
    //console.log(`${name} ${email} ${password} ${phone} ${country} ${company}`);
    //console.log(JSON.stringify({ name, email, password, contact_phone_number: phone, country, company_name: company }))
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, contact_phone_number: phone, country, company_name: company })
    })
        .then(response => response.json())//{
        //console.log("Inside the promise: " + JSON.stringify(response.json()));
        //  response.json();
        //})
        .catch(err => {
            console.log(err);
        })
}

export const signin = (email, password) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password})
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            //console.log("HEEERRRRREEEEEEEEEEEEEEEEEE")
            throw new Error(err)
        })
}


//TODO
//****************************************************************************
//                    USE sessionStorage instead of localStorage
//****************************************************************************
export const authenticate = (data, callback) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        callback(); //callback to redirect user to some other page or set/clear values
    }
}

//TODO
//****************************************************************************
//                    USE sessionStorage instead of localStorage
//****************************************************************************
export const signout = (callback) => {
    //remove token from local storage
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        //redirect user to some page which is done with the callback
        callback();
        //make request to backend to log out
        return fetch(`${API}/signout`, {
            method: "GET"
        })
        .then( response => {
            console.log("signout", response)
        })
        .catch( err => {
            console.log(err)
        })
    }
}

//TODO
//****************************************************************************
//                    USE sessionStorage instead of localStorage
//****************************************************************************
export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false;
    }

    //const jwt = localStorage.getItem("jwt");

    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false;
    }

}