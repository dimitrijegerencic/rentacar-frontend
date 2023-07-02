import React, {useEffect, useState} from "react";
import { Select } from 'antd';
import {Form, Input} from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import {message} from "antd";
import './AddStateForm.scss'

const AddStateForm = ({onCancel, loadData}) => {

    const { Option } = Select;

    const stateNameReqMsq = 'State is required';

    /*Function that is called on submit */

    function onFinish(values){
        axios.post("http://localhost:3001/state", values)
            .then((response) => {
                if(response.status === 200){
                    message.success('State added successfully!');
                    setTimeout(()=>{
                        onCancel()
                    }, 1000)
                    loadData()
                }
                else{
                    message.error('An error has occured! Please try again!');
                }
            })
    }

    return <>
        <div className={'form-container'}>
            <h4>Add a new state</h4>
            <Form onFinish={onFinish} className={'city-form'}>
                <div className={'form-items my-3'}>
                    <Form.Item name="state_name"
                               rules={[{ required: true, message: stateNameReqMsq }]}>
                        <Input placeholder={'Name'}/>
                    </Form.Item>
                </div>
                <AddButton title={'Add state'}/>
            </Form>
        </div>
    </>
}

export default AddStateForm;