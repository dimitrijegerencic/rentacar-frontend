import React, {useEffect, useState} from "react";
import { Select } from 'antd';
import {Form, Input} from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import {message} from "antd";
import './EditVehicleForm.scss'

const EditVehicleForm = ({ name, id, onCancel, loadData}) => {

    const { Option } = Select;

    const modelReqMsq = 'Model is required';
    const companyReqMsq = 'Company is required';
    const classReqMsq = 'Class is required';
    const productionYearReqMsq = 'Production Year is required';
    const regNumReqMsq = 'Registration number is required';

    const [modelOptions, setModelOptions] = useState([]);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [productionYear, setProductionYear] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");


    const [modelID, setModelID] = useState("");
    const [companyID, setCompanyID] = useState("");
    const [classID, setClassID] = useState("");

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(`http://localhost:3001/vehicle/${id}`)
            .then((response) => {
                setModelID(response.data[0].model_id)
                setCompanyID(response.data[0].company_id)
                setClassID(response.data[0].class_id)
                setRegistrationNumber(response.data[0].reg_num)
                setProductionYear(response.data[0].production_year)
                setLoading(false)
            })
            .catch((error) => {
                message.error('An error has occured!', error)
            })

    }, [modelID, companyID, classID, registrationNumber, productionYear])

    /* Load all models for the select field */

    useEffect(()=>{
        axios.get("http://localhost:3001/model").then((response)=>{
            setModelOptions(response.data);
            setModelID(response.data)
        })
            .catch((error) => {
                message.error('An error has occured!', error)
            })
    }, [setModelOptions])

    /* Load all companies for the select field */

    useEffect(()=>{
        axios.get("http://localhost:3001/company").then((response)=>{
            setCompanyOptions(response.data);
        })
            .catch((error) => {
                message.error('An error has occured!', error)
            })
    }, [setCompanyOptions])

    /* Load all models for the select field */

    useEffect(()=>{
        axios.get("http://localhost:3001/class").then((response)=>{
            setClassOptions(response.data);
        })
            .catch((error) => {
                message.error('An error has occured!', error)
            })
    }, [setClassOptions])

    /*Function that is called on submit */

    function onFinish(values){
        axios.put(`http://localhost:3001/vehicle/${id}`, values)
            .then((response) => {
                if(response.status === 200){
                    message.success('Vehicle edited successfully!');
                    setTimeout(()=>{
                        onCancel()
                    }, 1000);
                    loadData();
                }
                else{
                    message.error('An error has occured! Please try again!');
                }
            })
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>
        <div className={'form-container'}>
            <h4>Edit {name}</h4>
            <Form onFinish={onFinish} className={'vehicle-form'}>
                <div className={'form-items my-3'}>
                    <div className={'first-section mt-2'}>
                        <Form.Item name="model_id"
                                   initialValue={modelID}
                                   rules={[{ required: true, message: modelReqMsq }]}>

                            <Select placeholder={'Select a model'} style={{ width: 200 }}>
                                {modelOptions.map((model) => (
                                    <Option key={model.id} value={model.id}>
                                        {model.model_name}
                                    </Option>
                                ))}
                            </Select>

                        </Form.Item>
                        <Form.Item name="company_id"
                                   initialValue={companyID}
                                   rules={[{ required: true, message: companyReqMsq }]}>

                            <Select placeholder={'Select a company'} style={{ width: 200 }}>
                                {companyOptions.map((company) => (
                                    <Option key={company.id} value={company.id}>
                                        {company.company_name}
                                    </Option>
                                ))}
                            </Select>

                        </Form.Item>
                    </div>

                    <Form.Item name="class_id"
                               initialValue={classID}
                               rules={[{ required: true, message: classReqMsq }]}>

                        <Select placeholder={'Select a class'} style={{ width: 430 }}>
                            {classOptions.map((classObj) => (
                                <Option key={classObj.id} value={classObj.id}>
                                    {classObj.class_name}
                                </Option>
                            ))}
                        </Select>

                    </Form.Item>

                    <div className={'second-section'}>
                        <Form.Item name="reg_num"
                                   initialValue={registrationNumber}
                                   rules={[{ required: true, message: regNumReqMsq }]}>
                            <Input placeholder={'Registration Number'} style={{ width: 200 }} />
                        </Form.Item>

                        <Form.Item name="production_year"
                                   initialValue={productionYear}
                                   rules={[{ required: true, message: productionYearReqMsq }]}>
                            <Input placeholder={'Production Year'} style={{ width: 200 }}/>
                        </Form.Item>
                    </div>

                </div>
                <AddButton title={'Edit vehicle'}/>
            </Form>
        </div>
    </>
}

export default EditVehicleForm;