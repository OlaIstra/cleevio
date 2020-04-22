import React from 'react'

import { TogglerStyle } from './style'

type Props = {
	title: string
	clicked: () => void
}

export const Toggler: React.FC<Props> = (props) => {
	return <TogglerStyle onClick={props.clicked}>{props.title}</TogglerStyle>
}
