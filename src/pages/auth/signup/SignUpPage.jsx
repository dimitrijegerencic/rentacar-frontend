import React from "react";
import classes from "./SignUpPage.module.scss";
import AppLogo from "../../../images/logo3.png";
import SignUpForm from "../../../components/forms/signUpForm/SignUpForm";

const SignUpPage = () => {
    return <>
        <div className={classes['main']}>
            <div className={classes['container']}>
                <div className={classes['left']}>
                    <img src={AppLogo} alt={'logo'} className={classes['logo-img']}/>
                </div>
                <div className={classes['right']}>
                    <SignUpForm/>
                </div>
            </div>
        </div>
    </>
}

export default SignUpPage;