import React from 'react'

import { BackdropStyle } from './style'

type Props = {
	show: boolean
	clicked: () => void
}

export const Backdrop = (props: Props) => {
	return props.show ? <BackdropStyle onClick={props.clicked} /> : null
}
