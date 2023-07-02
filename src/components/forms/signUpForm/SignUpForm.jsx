import React, {useEffect, useState} from "react";
import {Form, Input, Select} from "antd";
import "./SignUpForm.scss";
import LoginButton from "../../buttons/loginButton/LoginButton";
import {Link} from "react-router-dom";
import {message} from "antd";
import {useNavigate} from "react-router";
import axios from "axios";

const SignUpForm = () => {

    const { Option } = Select;

    const firstNameReqMsq = 'First name field is required';
    const lastNameReqMsq = 'Last name field is required';
    const usernameReqMsq = 'Username field is required';
    const passwordReqMsq = 'Password field is required';
    const stateReqMsq = 'State field is required';

    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:3001/state").then((response)=>{
            setStateOptions(response.data);
        }).catch((err)=>console.log(err))
    }, [setStateOptions])

    useEffect(()=>{
        axios.get("http://localhost:3001/city").then((response)=>{
            setCityOptions(response.data);
        }).catch((err)=>console.log(err))
    }, [setCityOptions])

    function onFinish(values){
        axios.post("http://localhost:3001/user", values)
            .then((response) => {
                if(response.status === 200){
                    message.success('Profile created successfully!')
                    setTimeout(()=>{
                        navigate('/login')
                    }, 1000)
                }
                else{
                    message.error('An error has occured! Please try again!');
                }
            })
    }

    return <>
        <Form onFinish={onFinish} className={'signup-form'}>
            <div className={'signup-text mb-3'}>
                <h1 className={'signup-title mb-4'}>Unlock Your Journey: Rent. Drive. Explore.</h1>
                <p className={'signup-subtitle-1 mb-4'}>Fill out the form below to register.</p>
                <p className={'signup-subtitle-2'}>Already have an account? <Link to={'/login'}>Log in.</Link></p>
            </div>
            <div className={'section-1'}>
                <Form.Item name="first_name"
                           rules={[{ required: true, message: firstNameReqMsq }]}>
                    <Input placeholder={'First name'}/>
                </Form.Item>
                <Form.Item name="last_name"
                           rules={[{ required: true, message: lastNameReqMsq }]}>
                    <Input placeholder={'Last name'}/>
                </Form.Item>
            </div>
            <div className={'section-2'}>
                <Form.Item name="email"
                           rules={[{ required: true, message: usernameReqMsq }]}>
                    <Input placeholder={'Email'}/>
                </Form.Item>

                <Form.Item name="password"
                           rules={[{ required: true, message: passwordReqMsq }]}>
                    <Input.Password placeholder={'Password'}/>
                </Form.Item>

            </div>
            <div className={'section-3'}>
                <Form.Item name="state_id"
                           rules={[{ required: true, message: stateReqMsq }]}>

                    <Select placeholder={'Select a state'} style={{ width: 250 }}>
                        {stateOptions.map((state) => (
                            <Option key={state.id} value={state.id}>
                                {state.state_name}
                            </Option>
                        ))}
                    </Select>

                </Form.Item>
                <Form.Item name="city_id"
                           rules={[{ required: true, message: stateReqMsq }]}>

                    <Select placeholder={'Select a city'} style={{ width: 250 }}>
                        {cityOptions.map((city) => (
                            <Option key={city.id} value={city.id}>
                                {city.city_name}
                            </Option>
                        ))}
                    </Select>

                </Form.Item>
            </div>
            <LoginButton title={'Sign up'}/>
        </Form>
    </>
}

export default SignUpForm;