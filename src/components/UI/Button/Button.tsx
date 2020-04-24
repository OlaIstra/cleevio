import React from 'react'

import { ButtonStyle } from './style'

type Props = {
	title?: string
	icon?: string
	disabled?: boolean
	clicked?: (e: any) => void
}

export const Button: React.FC<Props> = (props) => {
	let widthContent = !!props.title

	return (
		<ButtonStyle
			onClick={props.clicked}
			disabled={props.disabled}
			icon={props.icon}
			widthProp={widthContent}
		>
			<span className={props.icon}></span>
			{props.title}
		</ButtonStyle>
	)
}
