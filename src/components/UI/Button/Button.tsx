import React from 'react'

import { ButtonStyle } from './style'

type Props = {
	title: string
	icon: string
	disabled: boolean
	clicked: () => void
}

export const Button = (props: Props) => {
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
