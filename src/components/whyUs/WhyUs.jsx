import React from "react";
import InfoCard from "../infoCard/InfoCard";
import {RocketOutlined, SafetyCertificateOutlined, SyncOutlined} from "@ant-design/icons";
import Button from "react-bootstrap/Button";
import './WhyUs.module.scss';
import {useModal} from "../../context/modalContext/ModalContext";
import classes from './WhyUs.module.scss';
const WhyUs = () => {

    const { open, close } = useModal();

    const iconSize = 48;

    const openSpeedModal = () => {
        open({
            title: '',
            content: <InfoCard title={whyUsContent[0].title}
                               icon={whyUsContent[0].icon}
                               description={whyUsContent[0].extendedDescription}
            />
        })
    }

    const openReliabilityModal = () => {
        open({
            title: '',
            content: <InfoCard title={whyUsContent[1].title}
                               icon={whyUsContent[1].icon}
                               description={whyUsContent[1].extendedDescription}
            />
        })
    }

    const openSafetyModal = () => {
        open({
            title: '',
            content: <InfoCard title={whyUsContent[2].title}
                               icon={whyUsContent[2].icon}
                               description={whyUsContent[2].extendedDescription}
            />
        })
    }


    const whyUsContent = [
        {
            title : "Speed",
            icon :  <RocketOutlined style={{ fontSize: iconSize, color: 'darkred' }} />,
            description : <>
                Introducing our Rent-a-Car App: <span className={'highlight'}>The Fastest Way to Hit the Road</span>
                <br/> <br/>
                At Rent-a-Car, we understand the need for speed.
                Our Rent-a-Car App is specifically designed to provide you with the fastest and most efficient car rental
                experience available.
                <br/> <br/>
                Here's why our app is the ultimate solution for those seeking speed:
                <br/> <br/>
                <p className={'read-more'} onClick={() => openSpeedModal()}>Read more</p>
            </>,
            extendedDescription: <>

                Instant Bookings: With just a few taps on our Rent-a-Car App,
                you can instantly reserve the perfect vehicle for your needs.
                Say goodbye to long waiting times or cumbersome booking processes.
                <br/> <br/>
                Quick Support and Assistance: In the event of any issues or queries,
                our Rent-a-Car App offers instant access to our
                dedicated customer support team.
                <br/> <br/>
                GPS Navigation Integration: Our Rent-a-Car App
                seamlessly integrates with popular GPS navigation systems. You can
                easily input your destination and enjoy real-time directions, helping you save valuable time during your journey. No more fumbling with maps or wasting time on wrong turns.
                <br/> <br/>
                Express Return: Returning your rental
                vehicle is a breeze with our Rent-a-Car App. Our express return feature enables you to quickly drop off the vehicle, complete the necessary check-out procedures, and be on your way in a matter of minutes. It's the perfect option for those rushing to catch a flight or make an important appointment.
                <br/> <br/>
                Speedy Rewards: We appreciate your loyalty and believe in rewarding our valued customers. With our Rent-a-Car App, you can earn points, unlock exclusive discounts, and enjoy priority service as a member of our loyalty program. The more you rent with us, the faster your rewards accumulate.
                <br/> <br/>
                <Button onClick={() => close()} variant={'danger'} size="sm">Close</Button>
            </>,
            key : 'speed'

        },
        {
            title : "Reliability",
            icon :  <SyncOutlined style={{ fontSize: iconSize , color: 'darkblue' }} spin />,
            description : <>
                Introducing our Rent-a-Car App: <span className={'highlight'}>Your Trusted Partner for Reliable Car Rentals</span>
                <br/> <br/>
                When it comes to renting a car, reliability is of utmost importance.
                At Rent-a-Car, we take pride in offering a rental experience that is second to none in terms of reliability.
                <br/> <br/>
                Here's why our Rent-a-Car App is your best choice for dependable and trustworthy car rentals:
                <br/> <br/>
                <p className={'read-more'} onClick={() => openReliabilityModal()}>Read more</p>
            </>,
            extendedDescription: <>
                Well-Maintained Fleet: Our fleet of rental vehicles undergoes rigorous maintenance and inspection protocols to ensure optimal performance and reliability. Each vehicle is regularly serviced, thoroughly cleaned, and meticulously checked before it is rented out.
                We prioritize the reliability of our vehicles, so you can embark on your journey with confidence.
                <br/> <br/>

                Trusted Partnerships:
                We have established strong partnerships with renowned car manufacturers and trusted
                suppliers in the industry. By working with reputable brands, we can offer you a wide selection
                of reliable and well-known car models. Our commitment to quality and reliability extends to the vehicles we provide.
                <br/> <br/>

                Transparent Booking Process: With our Rent-a-Car App, you can expect a transparent
                and straightforward booking process.
                <br/> <br/>

                We provide detailed information about each vehicle, including its features, specifications,
                and rental terms. You can make an informed decision and choose the vehicle that best suits your needs,
                ensuring a reliable and tailored rental experience.
                <br/> <br/>

                <Button onClick={() => close()} variant={'danger'} size="sm">Close</Button>
            </>,
            key: 'reliability'

        },
        {
            title : "Safety",
            icon :  <SafetyCertificateOutlined style={{ fontSize: iconSize, color: 'green' }}/>,
            description :  <div >
                Introducing our Rent-a-Car App: <span className={'highlight'}>Your Safest Choice</span>
                <br/> <br/>
                At Rent-a-Car, we prioritize the safety of our customers above all else.
                Our commitment to providing a secure and reliable car
                rental experience sets us apart as the best choice for safety-conscious individuals.
                <br/> <br/>
                Here's why our Rent-a-Car App is the ultimate solution for ensuring your safety:
                <br/> <br/>
                <p className={'read-more'} onClick={() => openSafetyModal()}>Read more</p>
            </div>,
            extendedDescription: <>
                Thorough Vehicle Inspection: We conduct comprehensive inspections of our rental vehicles to ensure they meet the highest safety standards.
                Each car is meticulously checked and maintained, so you can have peace of mind knowing that you are driving a reliable and safe vehicle.
                <br/> <br/>

                Regular Maintenance and Servicing: Our fleet of vehicles undergoes regular maintenance and servicing to
                keep them in optimal condition.
                <br/> <br/>

                24/7 Roadside Assistance: In the unlikely event of any issues during your rental period,
                our Rent-a-Car App provides 24/7 roadside assistance. Whether it's a flat tire, battery
                jump-start, or any other roadside emergency, our dedicated support team is just a phone call away, ready to assist you promptly.
                <br/> <br/>

                Our Rent-a-Car App integrates secure payment gateways, ensuring that your personal and payment information
                is protected at all times. You can book and pay for your rental with confidence,
                knowing that your data is encrypted and safeguarded.
                <br/> <br/>
                <Button onClick={() => close()} variant={'danger'} size="sm">Close</Button>

            </>,
            key: 'safety'

        }
    ]

    return <>
        <div className={classes['why-us']}>
            <h1 className={classes['why-us-title']}>Why us?</h1>
            <div className={classes['why-us-section']}>
                {whyUsContent.map((value, index) => {
                    return (
                        <InfoCard
                            title={value.title}
                            icon={value.icon}
                            description={value.description}
                            key={value.key}
                            width={600}
                        />
                    );
                })}
            </div>
        </div>
    </>
}

export default WhyUs