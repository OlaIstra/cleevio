import React from 'react'

import { ButtonStyle } from './style'

export const Button = (props) => {
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
