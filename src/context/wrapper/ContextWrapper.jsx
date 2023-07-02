import React from 'react';
import ModalProvider from "../modalContext/ModalContext";

const ContextWrapper=({children})=>{
    return(
            <ModalProvider>
                {children}
            </ModalProvider>
    )
}

export default ContextWrapper;