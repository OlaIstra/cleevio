import React, { ReactElement } from 'react'

import { InputStyle, ValidationErrorStyle } from './style'

type Props = {
	touched: boolean
	shouldValidate: any
	elementType: string
	placeholder: string
	clicked: () => void
	changed: (...arg: any[]) => any
	invalid: boolean
	isFocus: boolean
	onfocus: any
}

type PropsValid = {
	valid: boolean
}

const InputElement = (({ placeholder,
	invalid = false,
	isFocus = false,
	touched = false,
	shouldValidate = false,
	elementType = 'text',
	clicked, changed, onfocus }: Props, ref: React.Ref<HTMLInputElement>) => {

	let validationError: ReactElement<PropsValid> = (
		<ValidationErrorStyle valid={invalid}>
			Please fill the blank
		</ValidationErrorStyle>
	)

	return (
		<>
			{validationError}
			<InputStyle
				type={elementType}
				placeholder={placeholder}
				onClick={clicked}
				ref={ref}
				//@ts-ignore
				onChange={() => changed(ref!.current.value)}
				isFocus={isFocus}
				onFocus={onfocus}
				//@ts-ignore
				touched={touched}
				shouldValidate={shouldValidate}
			/>
		</>
	)
})

export const Input = React.forwardRef(InputElement)
