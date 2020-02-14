import React, { useState, useEffect } from "react";

const Checkbox = (props) => {
    const [checked, setChecked] = useState([])

    const { listOfFilters, handleFilters, type } = props;

    const handleToggle = (categoryId) => () => {
        const currentCategoryIdIndex = checked.indexOf(categoryId) //returns first index of which a given element can be found in the array if not found, returns -1
        const newCheckedCategoryId = [...checked]
        //if currently checked was not already in checked state, then push, else pull/take off
        if (currentCategoryIdIndex === -1) {
            newCheckedCategoryId.push(categoryId);
        } else {
            newCheckedCategoryId.splice(currentCategoryIdIndex, 1);
        }
        console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
        //handleFilters(newCheckedCategoryId, "category");
    }

    if (type === "category") {
        return listOfFilters.map((category, index) => {
            return (
                <li key={index} className="list-unstyled">
                    <input value={checked.indexOf(category._id === -1)} onChange={handleToggle(category._id)} type="checkbox" className="form-check-input" />
                    {/* <input value={checked.indexOf(category._id) !== -1} onChange={handleToggle(category._id)} type="checkbox" className="form-check-input" /> */}
                    <label className="form-check-label">{category.name}</label>
                </li>

            )
        })
    } else if (type === "brand") {
        return listOfFilters.map((brand, index) => {
            return (
                <li key={index} className="list-unstyled">
                    <input value={checked.indexOf(brand === -1)} onChange={handleToggle(brand)} type="checkbox" className="form-check-input" />
                    {/* <input value={checked.indexOf(category._id) !== -1} onChange={handleToggle(category._id)} type="checkbox" className="form-check-input" /> */}
                    <label className="form-check-label">{brand}</label>
                </li>

            )
        })
    } else if (type === "condition") {
        return listOfFilters.map((condition, index) => {
            return (
                <li key={index} className="list-unstyled">
                    <input value={checked.indexOf(condition === -1)} onChange={handleToggle(condition)} type="checkbox" className="form-check-input" />
                    {/* <input value={checked.indexOf(category._id) !== -1} onChange={handleToggle(category._id)} type="checkbox" className="form-check-input" /> */}
                    <label className="form-check-label">{condition}</label>
                </li>

            )
        })
    }

}

export default Checkbox;