import React from 'react'

import { InputStyle, ValidationErrorStyle } from './style'

type Props = {
	elementType: string
	placeholder: string
	clicked: () => void
	changed: (val: any) => void
	invalid: boolean
	isFocus: boolean
	onfocus: any
	onblur: any
}

export const Input = React.forwardRef((props: Props, ref: any) => {

	let validationError = (
		<ValidationErrorStyle valid={props.invalid}>
			Please fill the blank
		</ValidationErrorStyle>
	)

	return (
		<>
			{validationError}
			<InputStyle
				type={props.elementType}
				placeholder={props.placeholder}
				onClick={props.clicked}
				ref={ref}
				onChange={() => props.changed(ref.current.value)}
				isFocus={props.isFocus}
				onFocus={props.onfocus}
				onBlur={props.onblur}
			/>
		</>
	)
})
