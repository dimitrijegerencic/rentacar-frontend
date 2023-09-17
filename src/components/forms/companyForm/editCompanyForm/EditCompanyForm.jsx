import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import { Form, Input } from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import { message } from "antd";
import './EditCompanyForm.scss';

const EditCompanyForm = ({ name, id, onCancel }) => {

    const { Option } = Select;

    const companyNameReqMsq = 'Company name is required';

    const [companyName, setCompanyName] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/company/${id}`)
            .then((response) => {
                setCompanyName(response.data[0].company_name)
                setLoading(false)
            })
            .catch((err) => console.log(err));
    }, [companyName]);


    /* Function that is called on submit */

    function onFinish(values) {
        axios.put(`http://localhost:3001/company/${id}`, values)
            .then((response) => {
                if (response.status === 200) {
                    message.success('Company edited successfully!');
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
                            name="company_name"
                            initialValue={companyName}
                            rules={[{ required: true, message: companyNameReqMsq }]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>
                    </div>
                    <AddButton title="Edit company" />
                </Form>
            </div>
        </>
    );
};

export default EditCompanyForm;
