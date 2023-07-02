import React from "react";
import classes from "./PageNotFound.module.scss";
import {useNavigate} from "react-router";

const PageNotFound = () => {

    const navigate = useNavigate();

    return <>
            <div className={classes['main']}>
                <h1>Whoops!</h1>
                <p className={classes['error-msg']}>The page you are looking for doesn't exist or another error has occured.</p>
                <p className={classes['go-back']} onClick={() => navigate(-1)}>Go back</p>
            </div>
        </>
}

export default PageNotFound