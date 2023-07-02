import React from "react";
import classes from './Footer.module.scss';
const Footer = () => {
    return <>
        <div className={classes['footer']}>
            <hr className={classes['divider']}/>
            <p className={'company-info'}>RentACar D.O.O Copyright @2023</p>
        </div>
    </>
}

export default Footer;