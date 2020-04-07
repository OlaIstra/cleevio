import React from 'react'

import { InputStyle, ValidationErrorStyle } from './style'

export const Input = React.forwardRef((props, ref) => {
	let validationClasses

	props.invalid
		? (validationClasses = 'show__invalid')
		: (validationClasses = 'hide__invalid')

	let validationError = (
		<ValidationErrorStyle className={validationClasses}>
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
