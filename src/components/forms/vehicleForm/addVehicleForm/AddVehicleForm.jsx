import React, {useEffect, useState} from "react";
import { Select } from 'antd';
import {Form, Input} from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import {message} from "antd";
import './AddVehicleForm.scss'

const AddVehicleForm = ({onCancel, loadData}) => {

    const { Option } = Select;

    const modelReqMsq = 'Model is required';
    const companyReqMsq = 'Company is required';
    const classReqMsq = 'Class is required';
    const productionYearReqMsq = 'Production Year is required';
    const regNumReqMsq = 'Registration number is required';

    const [modelOptions, setModelOptions] = useState([]);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    // const [productionYear, setProductionYear] = useState("");
    // const [registrationNumber, setRegistrationNumber] = useState("");

    /* Load all models for the select field */

    useEffect(()=>{
        axios.get("http://localhost:3001/model").then((response)=>{
            setModelOptions(response.data);
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
        axios.post("http://localhost:3001/vehicle", values)
            .then((response) => {
                if(response.status === 200){
                    message.success('Vehicle added successfully!');
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

    return <>
        <div className={'form-container'}>
            <h4>Add a new vehicle</h4>
            <Form onFinish={onFinish} className={'vehicle-form'}>
                <div className={'form-items my-3'}>
                    <div className={'first-section mt-2'}>
                        <Form.Item name="model_id"
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
                                   rules={[{ required: true, message: regNumReqMsq }]}>
                            <Input placeholder={'Registration Number'} style={{ width: 200 }} />
                        </Form.Item>

                        <Form.Item name="production_year"
                                   rules={[{ required: true, message: productionYearReqMsq }]}>
                            <Input placeholder={'Production Year'} style={{ width: 200 }}/>
                        </Form.Item>
                    </div>

                </div>
                <AddButton title={'Add vehicle'}/>
            </Form>
        </div>
    </>
}

export default AddVehicleForm;