import React from 'react'

import { BackdropStyle } from './style'

type Props = {
	show: boolean
	clicked: () => void
}

export const Backdrop: React.FC<Props> = (props) => {
	return props.show ? <BackdropStyle onClick={props.clicked} /> : null
}
