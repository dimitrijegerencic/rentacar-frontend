import React, {createContext, useContext, useState} from 'react';
import Modal from "../../components/modal/Modal";

const ModalContext = createContext();

const ModalProvider = ({children}) => {

    const initialModalData = {title: '', content: ''}
    const [isVisible, setIsVisible] = useState(false)
    const [modalData, setModalData] = useState(initialModalData)

    const open = ({title, content}) => {
        setModalData({title: title, content: content})
        setIsVisible(true)
    }

    const close = () => {
        setModalData(initialModalData)
        setIsVisible(false)
    }

    const data = {
        open: (data) => open(data),
        close: () => close()
    }

    return( <ModalContext.Provider value={data}>
        {isVisible && <Modal
            title={modalData?.title}
            isVisible={isVisible}
            close={() => close()}
            content={modalData?.content}
        />}
        {children}
    </ModalContext.Provider>)
}

export const useModal = () => {
    return useContext(ModalContext)
}

export default ModalProvider;