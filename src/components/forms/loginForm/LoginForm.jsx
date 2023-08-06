import React, {useEffect} from "react";
import {Form, Input, message} from "antd";
import "./LoginForm.scss";
import LoginButton from "../../buttons/loginButton/LoginButton";
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router";
import { connect } from 'react-redux';
const LoginForm = ({loggedUser, setLoggedUser}) => {

    const usernameReqMsq = 'Username field is required';
    const passwordReqMsq = 'Password field is required';
    const navigate = useNavigate();

    function onFinish(values){
        let email = values.email;
        let password = values.password;

        axios.get(`http://localhost:3001/user/${email}/${password}`)
            .then(response => {
                if (response.data.length === 0){
                    message.error('Wrong username or password!')
                    setTimeout(()=>{
                        navigate('/login')
                    }, 1000)
                }
                else{
                    message.success("Logged in successfully!")
                    setLoggedUser(response.data[0]);
                    setTimeout(()=>{
                        navigate('/')
                    }, 2000)

                }
            });
    }

    useEffect(() => {
        
        // Load loggedUser from local storage when component is rendered

        const storedUser = localStorage.getItem('loggedUser');

        if (storedUser) {
            setLoggedUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        // Save loggedUser to local storage whenever it changes
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }, [loggedUser]);

    return <>
        <Form onFinish={onFinish} className={'login-form'}>
            <div className={'login-text'}>
                <h1 className={'login-title'}>Hello! Good to see you again!</h1>
                <p className={'login-subtitle-1'}>Log in to your account to continue</p>
                <p className={'login-subtitle-2'}>Don't have an account? <Link to={'/sign-up'}>Create one.</Link></p>
            </div>
            <Form.Item name="email"
                       type={'email'}
                       rules={[{ required: true, message: usernameReqMsq }]}>
                <Input placeholder={'Email'}/>
            </Form.Item>
            <Form.Item name="password"
                       rules={[{ required: true, message: passwordReqMsq }]}>
                <Input.Password placeholder={'Password'}/>
            </Form.Item>
            <LoginButton title={'Log in'}/>

        </Form>
        </>
}

const mapDispatchToProps = (dispatch) => ({
    setLoggedUser: (user) => dispatch({ type: 'SET_USER', payload: user })
});

const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);