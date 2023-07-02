import React from "react";
import classes from "./LoginButton.module.scss";

const LoginButton = ({title}) => {
    return <>
        <div className={classes['container']}>
            <button type={'submit'} className={classes['login-btn']}>
                {title}
            </button>
        </div>
        </>
}
export default LoginButton;