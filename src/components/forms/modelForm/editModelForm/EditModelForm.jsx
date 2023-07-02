import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import { Form, Input } from "antd";
import AddButton from "../../../buttons/addButton/AddButton";
import axios from "axios";
import { message } from "antd";
import './EditModelForm.scss';

const EditModelForm = ({ name, id, onCancel, loadData }) => {

    const { Option } = Select;

    const modelNameReqMsg = 'Model name is required';
    const companyReqMsq = 'Company is required';

    const [modelName, setModelName] = useState("");
    const [companyOptions, setCompanyOptions] = useState([]);

    /* To populate select field upfront */
    const [companyID, setCompanyID] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/model/${id}`)
            .then((response) => {
                setModelName(response.data[0].model_name)
                setCompanyID(response.data[0].company_id)
                setLoading(false)
            })
            .catch((err) => console.log(err));
    }, [modelName, companyID]);


    /* Load all the companies for the select field */

    useEffect(()=>{
        axios.get("http://localhost:3001/company").then((response)=>{
            setCompanyOptions(response.data);
        }).catch((err)=>console.log(err))
    }, [setCompanyOptions])

    /* Function that is called on submit */

    function onFinish(values) {
        axios.put(`http://localhost:3001/model/${id}`, values)
            .then((response) => {
                if (response.status === 200) {
                    message.success('Model edited successfully!');
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
                <Form onFinish={onFinish} className="model-form">
                    <div className="form-items my-3">
                        <Form.Item
                            name="model_name"
                            initialValue={modelName}
                            rules={[{ required: true, message: modelNameReqMsg }]}
                        >
                            <Input placeholder="Model name" />
                        </Form.Item>

                        <Form.Item name="company_id"
                                   initialValue={companyID}
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
                    <AddButton title="Edit model" />
                </Form>
            </div>
        </>
    );
};

export default EditModelForm;
