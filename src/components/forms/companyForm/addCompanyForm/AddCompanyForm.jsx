import React from "react";
import { Select } from 'antd';
import {Form, Input} from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import {message} from "antd";
import './AddCompanyForm.scss'

const AddCompanyForm = ({onCancel, loadData}) => {

    const { Option } = Select;

    const companyNameReqMsq = 'Company name is required';

    /*Function that is called on submit */

    function onFinish(values){
        axios.post("http://localhost:3001/company", values)
            .then((response) => {
                if(response.status === 200){
                    message.success('Company added successfully!');
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
            <h4>Add a new company</h4>
            <Form onFinish={onFinish} className={'company-form'}>
                <div className={'form-items my-3'}>
                    <Form.Item name="company_name"
                               rules={[{ required: true, message: companyNameReqMsq }]}>
                        <Input placeholder={'Name'}/>
                    </Form.Item>
                </div>
                <AddButton title={'Add company'}/>
            </Form>
        </div>
    </>
}

export default AddCompanyForm;