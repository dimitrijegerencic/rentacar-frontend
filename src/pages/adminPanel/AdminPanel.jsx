import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import {Row, Col, Table, message, Button as AntdButton} from 'antd';
import axios from 'axios';
import { useModal } from "../../context/modalContext/ModalContext";
import AddCityForm from "../../components/forms/cityForm/addCityForm/AddCityForm";
import './AdminPanel.scss';
import EditCityForm from "../../components/forms/cityForm/editCityForm/EditCityForm";
import AddStateForm from "../../components/forms/stateForm/addStateForm/AddStateForm";
import EditStateForm from "../../components/forms/stateForm/editStateForm/EditStateForm";
import AddClassForm from "../../components/forms/classForm/addClassForm/AddClassForm";
import EditClassForm from "../../components/forms/classForm/editClassForm/EditClassForm";
import AddModelForm from "../../components/forms/modelForm/addModelForm/AddModelForm";
import EditModelForm from "../../components/forms/modelForm/editModelForm/EditModelForm";
import AddVehicleForm from "../../components/forms/vehicleForm/addVehicleForm/AddVehicleForm";
import EditVehicleForm from "../../components/forms/vehicleForm/editVehicleForm/EditVehicleForm";
import AddCompanyForm from "../../components/forms/companyForm/addCompanyForm/AddCompanyForm";
import EditCompanyForm from "../../components/forms/companyForm/editCompanyForm/EditCompanyForm";
import {loadCities, loadStates, loadClasses, loadCompanies, loadModels, loadVehicles, loadReservations} from "../../methods/methods";
import {useNavigate} from "react-router";
import {connect} from "react-redux";

const AdminPanel = ({loggedUser}) => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [classes, setClasses] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [models, setModels] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [reservations, setReservations] = useState([]);

    const navigate = useNavigate()

    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

    // Retrieve the logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));

    // Check if a logged-in user exists
    useEffect(()=>{
        if (storedUser.id==='' || storedUser.isAdmin===0) {
            navigate('/login')
        }
    })

    /* Open and close modal methods from Modal Context*/

    const { open, close } = useModal();

    /* Delete city method */

    const deleteCity = (cityID) => {
        axios.delete(`http://localhost:3001/city/${cityID}`)
            .then(()=>{
                message.success("City deleted successfully!")
                close()
                loadCities(setCities)
        }).catch(err => {
            message.error(err)
        })
    }

    const deleteState = (stateID) => {
        axios.delete(`http://localhost:3001/state/${stateID}`)
            .then(()=>{
                message.success("State deleted successfully!")
                close()
                loadStates(setStates)
        }).catch(err => {
            message.error("An error has occured! Please try again!")
        })
    }

    const deleteCompany = (companyID) => {
        axios.delete(`http://localhost:3001/company/${companyID}`)
            .then(()=>{
                message.success("Company deleted successfully!")
                close()
                loadCompanies(setCompanies)
            }).catch(err => {
            message.error("An error has occured! Please try again!")
        })
    }

    const deleteClass = (classID) => {
        axios.delete(`http://localhost:3001/class/${classID}`)
            .then(()=>{
                message.success("Class deleted successfully!")
                close()
                loadClasses(setClasses)
        }).catch(err => {
            message.error("An error has occured! Please try again!")
        })
    }

    const deleteModel = (modelID) => {
        axios.delete(`http://localhost:3001/model/${modelID}`)
            .then(()=>{
                message.success("Model deleted successfully!")
                close()
                loadModels(setModels)
        }).catch(err => {
            message.error("An error has occured! Please try again!")
        })
    }

    const rejectReservation = (reservationID) => {
        axios.delete(`http://localhost:3001/reservations/${reservationID}`)
            .then(()=>{
                message.success("Reservation rejected successfully!")
                close()
                loadReservations(setReservations)
            }).catch(err => {
            message.error("An error has occured! Please try again!")
        })
    }

    const deleteVehicle = (vehicleID) => {
        axios.delete(`http://localhost:3001/vehicle/${vehicleID}`)
            .then(()=>{
                message.success("Vehicle deleted successfully!")
                close()
                loadVehicles(setVehicles)
            }).catch(err => {
            message.error("An error has occured! Please try again!")
        })
    }


    /* Modals for city actions*/

    const openAddCityModal = () => {
        open({
            title: 'Add a city',
            content: <AddCityForm onCancel={close} loadData={() => loadCities(setCities)} />
        });
    };


    const openEditCityModal = (id, name) => {
        open({
            title: `Edit ${name}`,
            content: <EditCityForm name={name} id={id} onCancel={close} loadData={() => loadCities(setCities)}/>
        })
    }

    const openDeleteCityModal = (name, id) => {
        open({
            title: 'Delete',
            content : <div className={'delete-form'}>
                            <p>Are you sure you want to delete city {name} ? </p>
                            <div className={'buttons'}>
                                <Button variant={'outline-success'} className={'yes'} onClick={()=>deleteCity(id)}>Yes</Button>
                                <Button variant={'outline-danger'} className={'no'} onClick={()=>close()}>No</Button>
                            </div>
                        </div>
        })
    }


    /* Modal for state actions */

    const openAddStateModal = () => {
        open({
            title: 'Add a state',
            content: <AddStateForm  onCancel={close} loadData={() => loadStates(setStates)}/>
        })
    }

    const openEditStateModal = (name, id) => {
        open({
            title: `Edit ${name}`,
            content : <EditStateForm name={name} id={id} onCancel={close}/>
        })
    }

    const openDeleteStateModal = (name, id) => {
        open({
            title: 'Delete',
            content : <div className={'delete-form'}>
                <p>Are you sure you want to delete state {name} ? </p>
                <div className={'buttons'}>
                    <Button variant={'outline-success'} className={'yes'} onClick={()=>deleteState(id)}>Yes</Button>
                    <Button variant={'outline-danger'} className={'no'} onClick={()=>close()}>No</Button>
                </div>
            </div>
        })
    }

    /* Modals for company actions */

    const openAddCompanyModal = () => {
        open({
            title: 'Add company',
            content: <AddCompanyForm onCancel={close} loadData={() => loadCompanies(setCompanies)}/>
        })
    }

    const openEditCompanyModal = (name, id) => {
        open({
            title: `Edit ${name}`,
            content: <EditCompanyForm name={name} id={id} onCancel={close}/>
        })
    }

    const openDeleteCompanyModal = (name, id) => {
        open({
            title: 'Delete',
            content: <div className={'delete-form'}>
                <p>Are you sure you want to delete company {name} ? </p>
                <div className={'buttons'}>
                    <Button variant={'outline-success'} className={'yes'} onClick={()=>deleteCompany(id)}>Yes</Button>
                    <Button variant={'outline-danger'} className={'no'} onClick={()=>close()}>No</Button>
                </div>
            </div>
        })
    }

    /* Modals for class actions */

    const openAddClassModal = () => {
        open({
            title: 'Add a class',
            content: <AddClassForm onCancel={close} loadData={() => loadClasses(setClasses)}/>
        })
    }

    const openEditClassModal = (name, id) => {
        open({
            title: `Edit ${name}`,
            content: <EditClassForm id={id} name={name} onCancel={close} loadData={() => loadClasses(setClasses)}/>
        })
    }

    const openDeleteClassModal = (name, id) => {
        open({
            title: `Delete ${name}`,
            content : <div className={'delete-form'}>
                <p>Are you sure you want to delete class {name} ? </p>
                <div className={'buttons'}>
                    <Button variant={'outline-success'} className={'yes'} onClick={()=>deleteClass(id)}>Yes</Button>
                    <Button variant={'outline-danger'} className={'no'} onClick={()=>close()}>No</Button>
                </div>
            </div>
        })
    }

    /* Modals for model actions */

    const openAddModelModal = () => {
        open({
            title: 'Add a model',
            content: <AddModelForm onCancel={close} loadData={() => loadModels(setModels)}/>
        })
    }

    const openEditModelModal = (name, id) => {
        open({
            title: `Edit ${name}`   ,
            content: <EditModelForm name={name} id={id} onCancel={close} loadData={() => loadModels(setModels)}/>
        })
    }

    const openDeleteModelModal = (name, id) => {
        open({
            title: `Delete ${name}`,
            content : <div className={'delete-form'}>
                <p>Are you sure you want to delete model {name} ? </p>
                <div className={'buttons'}>
                    <Button variant={'outline-success'} className={'yes'} onClick={() => deleteModel(id)}>Yes</Button>
                    <Button variant={'outline-danger'} className={'no'} onClick={() => close()}>No</Button>
                </div>
            </div>
        })
    }

    const openRejectReservationModal = (id) => {
        open({
            title: '',
            content: <div className={'delete-form'}>
                <p>Are you sure you want to reject this reservation ? </p>
                <div className={'buttons'}>
                    <Button variant={'outline-success'} className={'yes'} onClick={() => rejectReservation(id)}>Yes</Button>
                    <Button variant={'outline-danger'} className={'no'} onClick={() => close()}>No</Button>
                </div>
            </div>
        })
    }

    /* Modals for vehicle actions */

    const openAddVehicleModal = () => {
        open({
            title: 'Add vehicle',
            content: <AddVehicleForm onCancel={close} loadData={() => loadVehicles(setVehicles)}/>
        })
    }

    const openEditVehicleModal = (name, id) => {
        open({
            title: `Edit ${name}`,
            content: <EditVehicleForm name={name} id={id} onCancel={close} loadData={() => loadVehicles(setVehicles)}/>
        })
    }

    const openDeleteVehicleModal = (name, id) => {
        open({
            title: '',
            content: <div className={'delete-form'}>
                <p>Are you sure you want to delete vehicle {name} ? </p>
                <div className={'buttons'}>
                    <Button variant={'outline-success'} className={'yes'} onClick={() => deleteVehicle(id)}>Yes</Button>
                    <Button variant={'outline-danger'} className={'no'} onClick={() => close()}>No</Button>
                </div>
            </div>
        })
    }

    /* Load all the states*/

    useEffect(()=>{
        axios.get("http://localhost:3001/state").then((response)=>{
            setStates(response.data);
        }).catch((err)=>console.log(err))
    }, [setStates])

    /* Load all the cities */

    useEffect(()=> {
        axios.get("http://localhost:3001/city").then((response)=>{
            setCities(response.data)
        }).catch((error) => {
            message.error("An error occured!")
        })
    }, [setCities])

    /* Load all the classes*/

    useEffect(()=>{
        axios.get("http://localhost:3001/class").then((response)=>{
            setClasses(response.data)
        }).catch((error) => {
            message.error("An error occured!")
        })
    }, [setClasses])

    /* Load all the companies */

    useEffect(()=>{
        axios.get("http://localhost:3001/company").then((response)=>{
            setCompanies(response.data)
        }).catch((error) => {
            message.error("An error occured!")
        })
    }, [setClasses])

    /* Load all the models */

    useEffect(()=>{
        axios.get("http://localhost:3001/model").then((response)=>{
            setModels(response.data)
        }).catch((error) => {
            message.error("An error occured!")
        })
    }, [setModels])

    /* Load all the vehicles */

    useEffect(()=>{
        axios.get("http://localhost:3001/vehicle").then((response)=>{
            setVehicles(response.data)
        }).catch((error) => {
            message.error("An error occured!")
        })
    }, [setVehicles])

    /* Load all the reservations */
    useEffect(()=>{
        axios.get("http://localhost:3001/reservations").then((response)=>{
            setReservations(response.data)
        }).catch((error) => {
            message.error("An error occured!")
        })
    }, [setReservations])


    /* Columns for state table*/

    const stateColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
        },
        {
            title: 'Name',
            dataIndex: 'state_name',
            key: 'name',
            width: '20%',
        },
        {
            title: 'Actions',
            key: 'actions',
            align : 'right',
            render: (text, record) => (
                <div className={'action-buttons'}>
                    <Button variant="warning" onClick={() => openEditStateModal(record.state_name, record.id)}>
                        <AiOutlineEdit/>
                    </Button>
                    <Button variant="danger" onClick={() => openDeleteStateModal(record.state_name, record.id)}>
                        <AiOutlineDelete />
                    </Button>
                </div>
            ),
        },
    ];

    /* Columns for city table*/

    const cityColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
        },
        {
            title: 'Name',
            dataIndex: 'city_name',
            key: 'name',
            width: '20%',
        },
        {
            title: 'State',
            dataIndex: 'state_name',
            key: 'state_name',
            width: '20%',
        },
        {
            title: 'Actions',
            key: 'actions',
            align : 'right',
            render: (text, record) => (
                <div className={'action-buttons'}>
                    <Button variant="warning" onClick={() => openEditCityModal(record.id, record.city_name)}>
                        <AiOutlineEdit/>
                    </Button>
                    <Button variant="danger" onClick={()=>openDeleteCityModal(record.city_name, record.id)}>
                        <AiOutlineDelete />
                    </Button>
                </div>
            ),
        },
    ];

    /* Columns for class table*/

    const classColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
        },
        {
            title: 'Name',
            dataIndex: 'class_name',
            key: 'name',
            width: '20%',
        },
        {
            title: 'Actions',
            key: 'actions',
            align : 'right',
            render: (text, record) => (
                <div className={'action-buttons'}>
                    <Button variant="warning" onClick={() => openEditClassModal(record.class_name, record.id)}>
                        <AiOutlineEdit/>
                    </Button>
                    <Button variant="danger" onClick={() => openDeleteClassModal(record.class_name, record.id)}>
                        <AiOutlineDelete />
                    </Button>
                </div>
            ),
        },
    ];

    /* Columns for company table*/

    const companyColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
        },
        {
            title: 'Name',
            dataIndex: 'company_name',
            key: 'name',
            width: '20%',
        },
        {
            title: 'Actions',
            key: 'actions',
            align : 'right',
            render: (text, record) => (
                <div className={'action-buttons'}>
                    <Button variant="warning" onClick={() => openEditCompanyModal(record.company_name, record.id)}>
                        <AiOutlineEdit/>
                    </Button>
                    <Button variant="danger" onClick={() => openDeleteCompanyModal(record.company_name, record.id)}>
                        <AiOutlineDelete />
                    </Button>
                </div>
            ),
        },
    ];

    /* Columns for model table */

    const modelColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
        },
        {
            title: 'Name',
            dataIndex: 'model_name',
            key: 'name',
            width: '20%',
        },
        {
            title: 'Company',
            dataIndex: 'company_name',
            key: 'state_name',
            width: '20%',
        },
        {
            title: 'Actions',
            key: 'actions',
            align : 'right',
            render: (text, record) => (
                <div className={'action-buttons'}>
                    <Button variant="warning" onClick={() => openEditModelModal(record.model_name, record.id)}>
                        <AiOutlineEdit/>
                    </Button>
                    <Button variant="danger" onClick={() => openDeleteModelModal(record.model_name, record.id)}>
                        <AiOutlineDelete />
                    </Button>
                </div>
            ),
        },
    ];

    /* Columns for model table */

    const vehicleColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
        },
        {
            title: 'Model',
            dataIndex: 'model_name',
            key: 'name',
            width: '20%',
        },
        {
            title: 'Company',
            dataIndex: 'company_name',
            key: 'company_name',
            width: '20%',
        },
        {
            title: 'Class',
            dataIndex: 'class_name',
            key: 'class_name',
            width: '20%',
        },
        {
            title: 'Production Year',
            dataIndex: 'production_year',
            key: 'production_year',
            width: '20%',
        },
        {
            title: 'Registration Number',
            dataIndex: 'reg_num',
            key: 'reg_num',
            width: '20%',
        },
        {
            title: 'Actions',
            key: 'actions',
            align : 'center',
            render: (text, record) => (
                <div className={'action-buttons'}>
                    <Button variant="warning" onClick={() => openEditVehicleModal(record.model_name + " " + record.company_name, record.id)}>
                        <AiOutlineEdit/>
                    </Button>
                    <Button variant="danger" onClick={() => openDeleteVehicleModal(record.model_name, record.id)}>
                        <AiOutlineDelete />
                    </Button>
                </div>
            ),
        },
    ];

    /* Columns for reservations table*/

    const reservationsColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
        },
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
            width: '15%',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            width: '15%',
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
            width: '10%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: '30%',
            align : 'center',
            render: (text) => (<span>{text} &euro;</span>)
        },
        {
            title: 'Actions',
            key: 'actions',
            align : 'center',
            render: (text, record) => (
                <div className={'action-buttons'}>
                    <AntdButton type="primary" danger onClick={() => openRejectReservationModal(record.id)}>
                        Reject
                    </AntdButton>
                </div>
            ),
        },
    ];

    /* To set how many items are shown per page in table */

    const paginationConfig = {
        pageSize: 4,
    };

    return <>
        <div className={'container'}>
            <Row className={'mt-3'}>
                <Col span={24}>
                    <div className="reservations">
                        <div className={'title-and-add my-3'}>
                            <h3>Reservations</h3>
                        </div>
                        <Table dataSource={reservations}
                               columns={reservationsColumns}
                               pagination={{pageSize:10}}
                               rowKey={'id'}
                        />
                    </div>
                </Col>
            </Row>
            <Row className={'mt-3'}>
                <Col span={24}>
                    <div className="states">
                        <div className={'title-and-add my-3'}>
                            <h3>Vehicles</h3>
                            <p onClick={()=>openAddVehicleModal()}>Add a vehicle</p>

                        </div>
                        <Table dataSource={vehicles}
                               columns={vehicleColumns}
                               pagination={{pageSize:10}}
                               rowKey={'id'}
                        />
                    </div>
                </Col>
            </Row>

            <Row gutter={[80, 150]} justify={'center'} className={'mt-3'}>
                <Col span={12}>
                    <div className="states">
                        <div className={'title-and-add my-3'}>
                            <h3 >States</h3>
                            <p onClick={() => openAddStateModal('add')}>Add a state</p>

                        </div>
                        <Table dataSource={states}
                               columns={stateColumns}
                               pagination={paginationConfig}
                               rowKey={'id'}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="cities">
                        <div className={'title-and-add my-3'}>
                            <h3>Cities</h3>
                            <p onClick={() => openAddCityModal('add')}>Add a city</p>

                        </div>
                        <Table dataSource={cities}
                               columns={cityColumns}
                               pagination={paginationConfig}
                               rowKey={'id'}
                        />
                    </div>
                </Col>
            </Row>

            <Row gutter={[80, 150]}  className={'mt-3'}>
                <Col span={7}>
                    <div className="states">
                        <div className={'title-and-add my-3'}>
                            <h3>Companies</h3>
                            <p onClick={()=>openAddCompanyModal()}>Add a company</p>

                        </div>
                        <Table dataSource={companies}
                               columns={companyColumns}
                               pagination={paginationConfig}
                               rowKey={'id'}
                        />
                    </div>
                </Col>
                <Col span={7}>
                    <div className="cities">
                        <div className={'title-and-add my-3'}>
                            <h3>Classes</h3>
                            <p onClick={() => openAddClassModal()}>Add a class</p>

                        </div>
                        <Table dataSource={classes}
                               columns={classColumns}
                               pagination={paginationConfig}
                               rowKey={'id'}
                        />
                    </div>
                </Col>
                <Col span={10}>
                    <div className="cities">
                        <div className={'title-and-add my-3'}>
                            <h3>Models</h3>
                            <p onClick={() => openAddModelModal()}>Add a model</p>
                        </div>
                        <Table dataSource={models}
                               columns={modelColumns}
                               pagination={paginationConfig}
                               rowKey={'id'}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    </>
}
const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser,
});

export default connect(mapStateToProps)(AdminPanel);
