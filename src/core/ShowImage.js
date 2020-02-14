import React, { useState } from "react";
import { API } from "../config";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from "@material-ui/core/Fade"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    image: {
        width: "300px",
        minHeight: "300px",
        maxHeight: "auto",
        margin: "3px",
        padding: "3px"
    }
})
)

const ShowImage = (props) => {
    const classes = useStyles();
    const { item, url } = props;
    const [loaded, setLoaded] = useState(false);

    return (
        // <div className="product-img">
        //     {loaded ?
        //         <img
        //             onload={() => setLoaded(true)}
        //             src={`${API}/${url}/photo/${item._id}`}
        //             alt={item.name}
        //             className="mb-3"
        //             style={{ maxHeight: "100%", maxWidth: "100%" }}
        //             style={loaded ? {} : { display: "none" }}
        //         />
        //         :
        //         <img src="" alt="Loading" />
        //     }
        // </div>
        <div className="product-img" className={classes.image}>
            {loaded ? null : (
                <div style={{display: "flex", justifyContent: "center"}}>
                <CircularProgress color="secondary"/>
                </div>
            )}
            <Fade key={item.name} in={loaded} timeout={{enter: 1000}}>
            <img
                style={loaded ? {} : { display: 'none' }}
                src={`${API}/${url}/photo/${item._id}`}
                alt={item.name}
                className="mb-3"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                onLoad={() => setLoaded(true)}
            />
            </Fade>
        </div>
    )
}


export default ShowImage;