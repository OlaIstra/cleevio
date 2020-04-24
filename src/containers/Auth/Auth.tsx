import React, { useState, useCallback, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { checkValidaty } from '../../shared/utils'

import * as actions from '../../store/actions/index'

import { Input } from '../../components/UI/Input/Input'
import { Button } from '../../components/UI/Button/Button'
import { Toggler } from '../../components/UI/Toggler/Toggler'
import { Spinner } from '../../components/UI/Spinner/Spinner'

import { AuthStyle } from './style'
import { AppStateType } from '../..'

const email = createRef<HTMLInputElement>()
const password = createRef<HTMLInputElement>()


export type EmailValidationType = {
	required: boolean
	isEmail: boolean
}

export type PasswordValidationType = {
	required: boolean
	minLength: number
}

type InputType<V> = {
	elementType: string
	value: string
	elementConfig: {
		type: string
		placeholder: string
	}
	defaultValue: string
	validation: V
	valid: boolean
	touched: boolean
}


type Controls = {
	email: InputType<EmailValidationType>
	password: InputType<PasswordValidationType>
}

export const Auth: React.FC = () => {
	const [controls, setControls] = useState<Controls>({
		email: {
			elementType: 'text',
			value: '',
			elementConfig: {
				type: 'email',
				placeholder: 'E-mail',
			},
			defaultValue: '',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: 'text',
			value: '',
			elementConfig: {
				type: 'password',
				placeholder: 'Password',
			},
			defaultValue: '',
			validation: {
				required: true,
				minLength: 6,
			},
			valid: false,
			touched: false,
		},
	})

	const [isSignUp, setIsSignUp] = useState(true)

	const dispatch = useDispatch()
	const onSetAuthRedirectPath = useCallback(
		(path) => dispatch(actions.actions.setAuthRedirectPath(path)),
		[dispatch]
	)
	const onAuth = (email: string, password: string, isSignUp: boolean) =>
		dispatch(actions.auth(email, password, isSignUp))

	const authRedirectPath = useSelector((state: AppStateType) => {
		return state.auth.authRedirectPath
	})
	const loading = useSelector((state: AppStateType) => {
		return state.auth.loading
	})
	const error = useSelector((state: AppStateType) => {
		return state.auth.error
	})
	const isAuth = useSelector((state: AppStateType) => {
		return state.auth.token !== null
	})

	useEffect(() => {
		if (authRedirectPath) {
			onSetAuthRedirectPath('/')
		}
	}, [authRedirectPath, onSetAuthRedirectPath])

	const inputChangedHandler = (val: string, ref: string) => {

		let controlName = ref

		const updateForm: Controls = {
			...controls,
			[controlName]: {
				//@ts-ignore
				...controls[controlName],
				value: val,
				//@ts-ignore
				valid: checkValidaty(val, controls[controlName].validation),
				touched: true,
			},
		}
		setControls(updateForm)
	}

	const switchAuthModeHandler = () => {
		setIsSignUp(!isSignUp)
	}

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onAuth(controls.email.value, controls.password.value, isSignUp)
	}

	let errorMessage = null
	if (error) {
		errorMessage = <p>{error.message}</p>
	}

	let authRedirect = null
	if (isAuth) {
		authRedirect = <Redirect to={authRedirectPath} />
	}

	let display = <Spinner />

	if (!loading) {
		display = (
			<>
				{authRedirect}
				{errorMessage}
				<form action='' onSubmit={(e) => submitHandler(e)}>
					<Input
						ref={email}
						elementType={controls.email.elementConfig.type}
						invalid={!controls.email.valid}
						touched={controls.email.touched}
						shouldValidate={controls.email.validation}
						placeholder={controls.email.elementConfig.placeholder}
						changed={(val: string) => inputChangedHandler(val, 'email')}
						clicked={() => { }}
						isFocus={false}
						onfocus={() => { }}
					/>

					<Input
						ref={password}
						elementType={controls.password.elementConfig.type}
						invalid={!controls.password.valid}
						touched={controls.password.touched}
						shouldValidate={controls.password.validation}
						placeholder={controls.password.elementConfig.placeholder}
						changed={(val: string) => inputChangedHandler(val, 'password')}
						clicked={() => { }}
						isFocus={false}
						onfocus={() => { }}
					/>
					<Button
						clicked={(e) => submitHandler(e)}
						title='Submit'
					/>
				</form>
				<Toggler
					clicked={switchAuthModeHandler}
					title={!isSignUp ? 'To sign in' : 'To log in'}
				/>
			</>
		)
	}

	return <AuthStyle>{display}</AuthStyle>
}
