import React, {useEffect, useState} from "react";
import { Select } from 'antd';
import {Form, Input} from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import {message} from "antd";
import './AddClassForm.scss'

const AddClassForm = ({onCancel, loadData}) => {

    const { Option } = Select;

    const classNameReqMsq = 'Class name is required';

    /*Function that is called on submit */

    function onFinish(values){
        axios.post("http://localhost:3001/class", values)
            .then((response) => {
                if(response.status === 200){
                    message.success('Class added successfully!');
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
            <h4>Add a new class</h4>
            <Form onFinish={onFinish} className={'class-form'}>
                <div className={'form-items my-3'}>
                    <Form.Item name="class_name"
                               rules={[{ required: true, message: classNameReqMsq }]}>
                        <Input placeholder={'Name'}/>
                    </Form.Item>
                </div>
                <AddButton title={'Add class'}/>
            </Form>
        </div>
    </>
}

export default AddClassForm;