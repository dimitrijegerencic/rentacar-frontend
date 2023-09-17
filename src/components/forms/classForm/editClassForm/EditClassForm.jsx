import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import { Form, Input } from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import { message } from "antd";
import './EditClassForm.scss';

const EditClassForm = ({ name, id, onCancel }) => {

    const { Option } = Select;

    const classNameReqMsg = 'Class name is required';

    const [className, setClassName] = useState("");

    const [loading, setLoading] = useState(true);

    /* To get selected class */
    useEffect(() => {
        axios.get(`http://localhost:3001/class/${id}`)
            .then((response) => {
                setClassName(response.data[0].class_name)
                setLoading(false)
            })
            .catch((err) => console.log(err));
    }, [className]);


    /* Function that is called on submit */

    function onFinish(values) {
        axios.put(`http://localhost:3001/class/${id}`, values)
            .then((response) => {
                if (response.status === 200) {
                    message.success('Class edited successfully!');
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
                <Form onFinish={onFinish} className="class-form">
                    <div className="form-items my-3">
                        <Form.Item
                            name="class_name"
                            initialValue={className}
                            rules={[{ required: true, message: classNameReqMsg }]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>
                    </div>
                    <AddButton title="Edit class" />
                </Form>
            </div>
        </>
    );
};

export default EditClassForm;
