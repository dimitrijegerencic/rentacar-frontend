import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {Col, message, Row, Table} from "antd";
import classes from "./ReservationsPage.module.scss";
import {useNavigate} from "react-router";
const ReservationsPage = ({ loggedUser }) => {

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

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/reservations/user/${loggedUser.id}`)
            .then((response) => {
                setReservations(response.data);
            })
            .catch((error) => {
                message.error(error.message); // Use error.message instead of error directly
            });
    }, [setReservations, loggedUser.id]);

    const reservationsColumns = [

        {
            title: 'First name',
            dataIndex: 'first_name',
            key: 'first_name',
            width: '10%',
        },
        {
            title: 'Last name',
            dataIndex: 'last_name',
            key: 'last_name',
            width: '15%',
        },
        {
            title: 'Registration Number',
            dataIndex: 'reg_num',
            key: 'reg_num',
            width: '20%',
        },
        {
            title: 'Production Year',
            dataIndex: 'production_year',
            key: 'production_year',
            width: '20%',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            width: '20%',
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
            width: '40%',
        },
    ];

    return (
        <>
            <div className={classes['reservations']}>
                <Row align="center">
                    <Col span={24}>
                        <h1>My Reservations</h1>
                        {reservations && reservations.length > 0 ?
                            <Table dataSource={reservations}
                                   columns={reservationsColumns}
                                   pagination={{pageSize:10}}
                                   rowKey={'id'}/>
                            :
                            <h3>No reservations yet!</h3>
                        }
                    </Col>
                </Row>
            </div>

        </>
    );
};

const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser,
});

export default connect(mapStateToProps)(ReservationsPage);
