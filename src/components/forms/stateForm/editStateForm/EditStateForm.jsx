import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import { message } from "antd";
import './EditStateForm.scss';

const EditStateForm = ({ name, id, onCancel }) => {


    const stateNameReqMsq = 'State is required';

    const [stateName, setStateName] = useState("");

    /* To populate select field upfront */

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/state/${id}`)
            .then((response) => {
                setStateName(response.data[0].state_name)
                setLoading(false)
            })
            .catch((err) => console.log(err));
    }, [id, stateName]);


    /* Function that is called on submit */

    function onFinish(values) {
        axios.put(`http://localhost:3001/state/${id}`, values)
            .then((response) => {
                if (response.status === 200) {
                    message.success('State edited successfully!');
                    setTimeout(() => {
                        onCancel();
                    }, 1000);
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
                            name="state_name"
                            initialValue={stateName}
                            rules={[{ required: true, message: stateNameReqMsq }]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>
                    </div>
                    <AddButton title="Edit state" />
                </Form>
            </div>
        </>
    );
};

export default EditStateForm;
