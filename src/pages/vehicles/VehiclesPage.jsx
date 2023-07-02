import React, { useEffect, useState } from "react";
import {Col, Row, Table} from "antd";
import classes from "./VehiclesPage.module.scss";
import {loadVehicles} from "../../methods/methods";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {connect} from "react-redux";

const VehiclesPage = ({loggedUser}) => {

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

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
      loadVehicles(setVehicles)
    }, [setVehicles]);


    const vehicleColumns = [
        {
            title: 'Model',
            dataIndex: 'model_name',
            key: 'name',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Company',
            dataIndex: 'company_name',
            key: 'company_name',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Class',
            dataIndex: 'class_name',
            key: 'class_name',
            align: 'center',

            width: '20%',
        },
        {
            title: 'Production Year',
            dataIndex: 'production_year',
            key: 'production_year',
            align: 'center',
            width: '20%',
        },
        {
            title: 'Registration Number',
            dataIndex: 'reg_num',
            key: 'reg_num',
            align: 'center',

            width: '20%',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',

            render: (text, record) => (
                <div className={'action-buttons'}>
                    <Link to={`/make-reservation/${record.id}`} style={{textDecoration: 'none'}}>Make a reservation</Link>
                </div>
            ),
            width: '40%',

        },
    ];

    return (
        <>
            <div className={classes['vehicles']}>
                <Row align="center">
                    <Col span={22}>
                        <h1>Available vehicles</h1>
                            <Table dataSource={vehicles}
                                   columns={vehicleColumns}
                                   pagination={{pageSize:10}}
                                   rowKey={'id'}/>
                    </Col>
                </Row>
            </div>

        </>
    );
};


const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser,
});

export default connect(mapStateToProps)(VehiclesPage);
