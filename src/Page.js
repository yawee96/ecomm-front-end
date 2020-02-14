import React from "react";
import "./Page.css"
import Fade from '@material-ui/core/Fade';
import Menu from "./core/Menu"


function Page(props){

    return(
        <Fade key={props.location} in={true} timeout={{enter: 700}}>
         <section className="page">{props.children}</section>
         </Fade> 
         )
}

export default Page;