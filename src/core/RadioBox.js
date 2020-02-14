import React, { useState, useEffect, Fragment } from "react";

const RadioBox = (props) => {
    const { prices, handleFilters } = props;

    const [values, setValue] = useState(0)

    const handleChange = (event) => {
        console.log(event.target.value);
        handleFilters(event.target.value);
        setValue(event.target.value);
    }

    return prices.map((price, index) => {
        return (
            <div key={index}>
                <input
                    value={`${price._id}`}
                    onChange={handleChange}
                    name={price}
                    type="radio"
                    className="mr-2 ml-4" />
                {/* <input value={checked.indexOf(category._id) !== -1} onChange={handleToggle(category._id)} type="checkbox" className="form-check-input" /> */}
                <label className="form-check-label">{price.name}</label>
            </div>

        )
    })
}

export default RadioBox;