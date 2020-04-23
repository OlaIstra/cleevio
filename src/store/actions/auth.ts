import * as actionTypes from './actionTypes'

import axios, { AxiosResponse } from 'axios'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, InferActionsTypes } from '../..'
import { Action } from 'redux'

export type ActionAuthType = InferActionsTypes<typeof actions>

export const actions = {
	authStart: () => {
		return {
			type: actionTypes.AUTH_START,
		} as const
	},

	authSuccess: (token: string, userId: string | null) => {
		return {
			type: actionTypes.AUTH_SUCCESS,
			idToken: token,
			userId: userId,
		} as const
	},

	authFail: (error: string) => {
		return {
			type: actionTypes.AUTH_FAIL,
			error: error,
		} as const
	},

	logout: () => {
		localStorage.removeItem('token')
		localStorage.removeItem('expirationDate')
		localStorage.removeItem('userId')
		return {
			type: actionTypes.AUTH_LOGOUT,
		} as const
	},

	setAuthRedirectPath: (path: string) => {
		return {
			type: actionTypes.SET_AUTH_REDIRECT_PATH,
			path: path,
		} as const
	},
}

export const checkAuthTimeout = (time: number): ThunkAction<void, AppStateType, unknown, Action<string>> => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(actions.logout())
		}, time * 1000)
	}
}

type ResponceDataType = {
	kind: string
	localId: string
	email: string
	displayName: string
	idToken: string
	registered: boolean
	refreshToken: string
	expiresIn: number
}

export const auth = (email: string, password: string, isSignUp: boolean): ThunkAction<void, AppStateType, unknown, Action<string>> => {
	return (dispatch) => {
		dispatch(actions.authStart())
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
			.then((res: AxiosResponse<ResponceDataType>) => {
				const expirationDate: Date = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				)
				localStorage.setItem('token', res.data.idToken)
				localStorage.setItem('expirationDate', expirationDate.toString())
				localStorage.setItem('userId', res.data.localId)
				dispatch(actions.authSuccess(res.data.idToken, res.data.localId))
				dispatch(checkAuthTimeout(res.data.expiresIn))
			})
			.catch((err) => {
				dispatch(actions.authFail(err.response.data.error))
			})
	}
}

export const checkAuthStatus = (): ThunkAction<void, AppStateType, unknown, Action<string>> => {
	return (dispatch) => {
		const token = localStorage.getItem('token')
		if (!token) {
			dispatch(actions.logout())
		} else {
			const date: string | null = localStorage.getItem('expirationDate')
			if (date) {
				const expirationDate = new Date(date)
				if (expirationDate <= new Date()) {
					dispatch(actions.logout())
				} else {
					const userId = localStorage.getItem('userId')
					dispatch(actions.authSuccess(token, userId))
					dispatch(
						checkAuthTimeout(
							(expirationDate.getTime() - new Date().getTime()) / 1000
						)
					)
				}
			}
		}
	}
}
