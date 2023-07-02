import React from "react";
import {Card} from 'antd'
import './InfoCard.scss';
const InfoCard = ({title, icon, description, width}) => {
    return <>
        <Card
            title={title}
            bordered={false}
            style={{
                width: width,
            }}
        >
            <div className={'content'}>
                <div>
                    {icon}
                </div>
                <div className={'card-description'}>
                    {description}
                </div>
            </div>

        </Card>
    </>
}

export default InfoCard;