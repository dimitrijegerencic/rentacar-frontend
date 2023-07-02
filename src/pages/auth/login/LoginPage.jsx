import React from "react";
import classes from "./LoginPage.module.scss";
import AppLogo from "../../../images/logo3.png";
import LoginForm from "../../../components/forms/loginForm/LoginForm";

const LoginPage = () => {
    return <>
            <div className={classes['main']}>
                <div className={classes['container']}>
                    <div className={classes['left']}>
                        <img src={AppLogo} alt={'logo'} className={classes['logo-img']}/>
                    </div>
                    <div className={classes['right']}>
                        <LoginForm/>
                    </div>
                </div>
            </div>
        </>
}

export default LoginPage;