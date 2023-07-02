import React, {useEffect, useState} from "react";
import { Select } from 'antd';
import {Form, Input} from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import {message} from "antd";
import './AddCityForm.scss'

const AddCityForm = ({type, onCancel, loadData}) => {

    const { Option } = Select;

    const cityNameReqMsq = 'City name is required';
    const stateReqMsq = 'State is required';

    const [stateOptions, setStateOptions] = useState([]);

    /* Load all the states for the select field */

    useEffect(()=>{
        axios.get("http://localhost:3001/state").then((response)=>{
            setStateOptions(response.data);
        }).catch((err)=>console.log(err))
    }, [setStateOptions])

    /*Function that is called on submit */

    function onFinish(values){
        axios.post("http://localhost:3001/city", values)
            .then((response) => {
                if(response.status === 200){
                    message.success('City added successfully!');
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
                <h4>Add a new city</h4>
                <Form onFinish={onFinish} className={'city-form'}>
                   <div className={'form-items my-3'}>
                       <Form.Item name="city_name"
                                  rules={[{ required: true, message: cityNameReqMsq }]}>
                           <Input placeholder={'Name'}/>
                       </Form.Item>

                       <Form.Item name="state_id"
                                  rules={[{ required: true, message: stateReqMsq }]}>

                           <Select placeholder={'Select a state'} style={{ width: 200 }}>
                               {stateOptions.map((state) => (
                                   <Option key={state.id} value={state.id}>
                                       {state.state_name}
                                   </Option>
                               ))}
                           </Select>

                       </Form.Item>
                   </div>
                    <AddButton title={'Add city'}/>
                </Form>
            </div>
        </>
}

export default AddCityForm;