import * as actionTypes from './actionTypes'

import axios from 'axios'


type ActionStartType = {
	type: typeof actionTypes.AUTH_START
}

type ActionSuccessType = {
	type: typeof actionTypes.AUTH_SUCCESS
	idToken: string
	userId: string | null
}

type ActionFailType = {
	type: typeof actionTypes.AUTH_FAIL
	error: string
}

type ActionLogoutType = {
	type: typeof actionTypes.AUTH_LOGOUT
}

type ActionSetPathType = {
	type: typeof actionTypes.SET_AUTH_REDIRECT_PATH
	path: string
}

export type ActionAuthType = ActionStartType | ActionSuccessType | ActionFailType | ActionLogoutType | ActionSetPathType

export const authStart = (): ActionStartType => {
	return {
		type: actionTypes.AUTH_START,
	}
}

export const authSuccess = (token: string, userId: string | null): ActionSuccessType => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	}
}

export const authFail = (error: string): ActionFailType => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	}
}

export const logout = (): ActionLogoutType => {
	localStorage.removeItem('token')
	localStorage.removeItem('expirationDate')
	localStorage.removeItem('userId')
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}

export const checkAuthTimeout = (time: number) => {
	return (dispatch: any) => {
		setTimeout(() => {
			dispatch(logout())
		}, time * 1000)
	}
}

export const auth = (email: string, password: string, isSignUp: boolean) => {
	return (dispatch: any) => {
		dispatch(authStart())
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		}

		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3jdywiMkR4oJ_xA0JGygm44jZbcHDrp4'

		if (!isSignUp) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3jdywiMkR4oJ_xA0JGygm44jZbcHDrp4'
		}

		axios
			.post(url, authData)
			.then((response) => {
				const expirationDate: any = new Date(
					new Date().getTime() + response.data.expiresIn * 1000
				)
				localStorage.setItem('token', response.data.idToken)
				localStorage.setItem('expirationDate', expirationDate)
				localStorage.setItem('userId', response.data.localId)
				dispatch(authSuccess(response.data.idToken, response.data.localId))
				dispatch(checkAuthTimeout(response.data.expiresIn))
			})
			.catch((err) => {
				dispatch(authFail(err.response.data.error))
			})
	}
}

export const setAuthRedirectPath = (path: string): ActionSetPathType => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	}
}

export const checkAuthStatus = () => {
	return (dispatch: any) => {
		console.log(localStorage.getItem('token'))
		const token = localStorage.getItem('token')
		if (!token) {
			dispatch(logout())
		} else {
			console.log(localStorage.getItem('expirationDate'))
			const date: any = localStorage.getItem('expirationDate')
			const expirationDate: any = new Date(date)
			if (expirationDate <= new Date()) {
				dispatch(logout())
			} else {
				const userId = localStorage.getItem('userId')
				dispatch(authSuccess(token, userId))
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				)
			}
		}
	}
}
