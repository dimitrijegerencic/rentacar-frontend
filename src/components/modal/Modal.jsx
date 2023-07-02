import React from 'react';
import { Modal as AntModal } from 'antd';

const Modal = ({isVisible, close, content}) => {
    return <AntModal
        title={true}
        centered
        closable={false}
        open={isVisible}
        width={700}
        footer={null}
        onCancel={() => close()}

    >
        {content}
    </AntModal>
}


export default Modal;