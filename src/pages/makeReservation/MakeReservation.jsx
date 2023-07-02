import React, {useEffect} from "react";
import classes from "./MakeReservation.module.scss";
import {connect} from "react-redux";
import AddReservationForm from "../../components/forms/reservationForm/AddReservationForm";
import {Select} from "antd";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";

const MakeReservation = ({loggedUser}) => {

    const navigate = useNavigate()

    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

    // Retrieve the logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));

    // Check if a logged-in user exists
    useEffect(()=>{
        if (storedUser.id==='') {
            navigate('/login')
        }
    })

    const { Option } = Select;

    const { id } = useParams();

    return <>
        <div className={classes['make-reservation']}>
            <h4>{loggedUser.first_name}, make a reservation : </h4>
            <AddReservationForm userID={loggedUser.id} vehicleID={id} />
        </div>
        </>
}


const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser
});
export default connect(mapStateToProps)(MakeReservation);