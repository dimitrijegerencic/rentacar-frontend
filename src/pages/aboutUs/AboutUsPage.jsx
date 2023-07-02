import React, {useEffect} from 'react';
import { Typography } from 'antd';
import './AboutUsPage.scss';
import {useNavigate} from "react-router";
import {connect} from "react-redux";

const { Title, Paragraph } = Typography;

const AboutUsPage = ({loggedUser}) => {

    const navigate = useNavigate()

    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

    // Retrieve the logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'));

    // Check if a logged-in user exists
    useEffect(()=>{
        if (storedUser.id==='') {
            navigate('/login')
        }
    })


    return (
        <div className={"about-us"}>
            <Title className={'about-us-title'}>About Us</Title>
            <div className="content">
                <Paragraph>
                    At Rent-A-Car, we are dedicated to providing the best car rental experience for our customers. With a wide range
                    of vehicles to choose from and convenient rental options, we make it easy for you to get on the road and explore
                    your destination.
                </Paragraph>
                <Paragraph>
                    Our mission is to offer reliable and affordable car rental services that meet the needs of both leisure and business
                    travelers. We pride ourselves on delivering exceptional customer service and maintaining a fleet of well-maintained
                    and clean vehicles.
                </Paragraph>
                <Paragraph>
                    Whether you need a compact car for a quick trip, a spacious SUV for a family vacation, or a luxury vehicle for a
                    special occasion, we have the perfect rental car for you. Our flexible rental periods and competitive rates ensure
                    that you have the freedom and convenience to travel on your own terms.
                </Paragraph>
                <Paragraph>
                    With Rent-A-Car, you can expect a seamless booking process, transparent pricing, and 24/7 customer support. We
                    strive to exceed your expectations and make your car rental experience enjoyable and hassle-free.
                </Paragraph>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser,
});

export default connect(mapStateToProps)(AboutUsPage);
