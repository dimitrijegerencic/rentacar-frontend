import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import { Form, Input } from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import { message } from "antd";
import './EditCityForm.scss';

const EditCityForm = ({ name, id, onCancel, loadData }) => {

    const { Option } = Select;

    const cityNameReqMsg = 'City name is required';
    const stateReqMsq = 'State is required';

    const [cityName, setCityName] = useState("");
    const [stateOptions, setStateOptions] = useState([]);

    /* To populate select field upfront */
    const [stateID, setStateID] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/city/${id}`)
            .then((response) => {
                setCityName(response.data[0].city_name)
                setStateID(response.data[0].state_id)
                setLoading(false)
            })
            .catch((err) => console.log(err));
    }, [cityName, stateID]);


    /* Load all the states for the select field */

    useEffect(()=>{
        axios.get("http://localhost:3001/state").then((response)=>{
            setStateOptions(response.data);
        }).catch((err)=>console.log(err))
    }, [setStateOptions])

    /* Function that is called on submit */

    function onFinish(values) {
        axios.put(`http://localhost:3001/city/${id}`, values)
            .then((response) => {
                if (response.status === 200) {
                    message.success('City edited successfully!');
                    setTimeout(() => {
                        onCancel();
                    }, 1000);
                    loadData();
                } else {
                    message.error('An error has occurred! Please try again!');
                }
            });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="form-container">
                <h4>Edit {name}</h4>
                <Form onFinish={onFinish} className="city-form">
                    <div className="form-items my-3">
                        <Form.Item
                            name="city_name"
                            initialValue={cityName}
                            rules={[{ required: true, message: cityNameReqMsg }]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>

                        <Form.Item name="state_id"
                                   initialValue={stateID}
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
                    <AddButton title="Edit city" />
                </Form>
            </div>
        </>
    );
};

export default EditCityForm;
