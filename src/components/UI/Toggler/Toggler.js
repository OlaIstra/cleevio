import React from 'react'

import { TogglerStyle } from './style'

export const Toggler = (props) => {
	return <TogglerStyle onClick={props.clicked}>{props.title}</TogglerStyle>
}
