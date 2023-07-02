import React, {useEffect, useState} from "react";
import { Select } from 'antd';
import {Form, Input} from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import {message} from "antd";
import './AddModelForm.scss'

const AddModelForm = ({ onCancel, loadData}) => {

    const { Option } = Select;

    const modelNameReqMsq = 'Model name is required';
    const companyReqMsq = 'Company is required';

    const [companyOptions, setCompanyOptions] = useState([]);

    /* Load all the companies for the select field */

    useEffect(()=>{
        axios.get("http://localhost:3001/company").then((response)=>{
            setCompanyOptions(response.data);
        }).catch((err)=>console.log(err))
    }, [setCompanyOptions])

    /*Function that is called on submit */

    function onFinish(values){
        axios.post("http://localhost:3001/model", values)
            .then((response) => {
                if(response.status === 200){
                    message.success('Model added successfully!');
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
            <h4>Add a new model</h4>
            <Form onFinish={onFinish} className={'city-form'}>
                <div className={'form-items my-3'}>
                    <Form.Item name="model_name"
                               rules={[{ required: true, message: modelNameReqMsq }]}>
                        <Input placeholder={'Name'}/>
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
                <AddButton title={'Add company'}/>
            </Form>
        </div>
    </>
}

export default AddModelForm;