import React from 'react';
import { createPortal } from 'react-dom';

function Modal({}){
    return createPortal(
        <div>Modal</div>,
        document.querySelector('#modal')
    )
};

export default Modal;