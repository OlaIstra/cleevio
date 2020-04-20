import React from 'react'

import { TogglerStyle } from './style'

type Props = {
	title: string
	clicked: () => void
}

export const Toggler = (props: Props) => {
	return <TogglerStyle onClick={props.clicked}>{props.title}</TogglerStyle>
}
