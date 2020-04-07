import React from 'react'

import { BackdropStyle } from "./style";

export const Backdrop = (props) => {
    return (props.show ? <BackdropStyle onClick={props.clicked} /> : null)
}