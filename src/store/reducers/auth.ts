import * as actionTypes from '../actions/actionTypes'
import { ActionAuthType } from '../actions/auth'

type InitialStateType = {
	token: null | string,
	userId: null | string,
	error: any,
	loading: Boolean,
	authRedirectPath: string,
}

const initialState: InitialStateType = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/',
}

export const authReducer = (state: InitialStateType = initialState, action: ActionAuthType) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				error: null,
				loading: true,
			}

		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				token: action.idToken,
				userId: action.userId,
				error: null,
				loading: false,
			}

		case actionTypes.AUTH_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			}

		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
			}

		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return {
				...state,
				authRedirectPath: action.path,
			}

		default:
			return state
	}
}
