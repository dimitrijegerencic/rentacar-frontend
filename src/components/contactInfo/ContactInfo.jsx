import React from 'react';
import {  Space, Row, Col, Typography } from 'antd';
import {
    PhoneOutlined,
    MailOutlined,
    TwitterOutlined,
    InstagramOutlined,
    FacebookOutlined
} from '@ant-design/icons';

import classes from './ContactInfo.module.scss';

const { Text } = Typography;
const sendMail = () => {
    window.location.href = 'mailto:rentacar@mail.com';
};
const callUs = () => {
    window.location.href = 'tel:+069123456'
}

const ContactInfo = () => {
    return (
        <div className={classes['contact-info']}>
            <Row justify="center">
                <Col span={24}>
                    <Text className={classes["contact-text"]}>
                        Contact our company for any inquiries, assistance, or to book a car rental.
                        We are here to help you with the best car rental services and support.
                    </Text>
                </Col>
            </Row>
            <Space direction="horizontal" align="center" size={30} >
                <Row align="middle">
                    <Col span={4} onClick={sendMail} style={{cursor: 'pointer'}} title={'Send us an email'}>
                        <MailOutlined style={{ fontSize: '44px', color: 'purple' }} />
                    </Col>
                </Row>
                <Row align="middle">
                    <Col span={4} style={{cursor: 'pointer'}} title={'Visit our Twitter page'}>
                        <TwitterOutlined style={{ fontSize: '44px', color: '#1DA1F2' }} />
                    </Col>
                </Row>
                <Row align="middle">
                    <Col span={4} style={{cursor: 'pointer'}} title={'Visit our Intagram page'}>
                        <InstagramOutlined style={{ fontSize: '44px', color: 'darkred' }} />
                    </Col>
                </Row>
                <Row align="middle" >
                    <Col span={4} style={{cursor: 'pointer'}} title={'Visit our Facebook page'}>
                        <FacebookOutlined style={{ fontSize: '44px', color:'#1778F2' }} />
                    </Col>
                </Row>
                <Row align={'middle'}>
                    <Col span={4} onClick={callUs} style={{cursor: 'pointer'}} title={'Call us'}>
                        <PhoneOutlined style={{ fontSize: '44px', color: 'darkgreen' }}/>
                    </Col>
                </Row>
            </Space>
        </div>
    );
};

export default ContactInfo;
