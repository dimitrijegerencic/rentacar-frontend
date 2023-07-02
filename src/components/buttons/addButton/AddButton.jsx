import React from "react";
import classes from "./AddButton.module.scss";

const AddButton = ({title}) => {
    return <>
        <div className={classes['container']}>
            <button type={'submit'} className={classes['add-btn']}>
                {title}
            </button>
        </div>
    </>
}
export default AddButton;