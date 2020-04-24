import * as actionTypes from '../actions/actionTypes'
import { ActionTripType } from '../actions/trips'

export type Country = {
	id?: string
	value: string
	text: string
	icon: string
}

export type ErrorType = {
	message: string
}

type InitialStateType = {
	countries: Array<Country>
	loading: boolean
	error: null | ErrorType
}

const initialState: InitialStateType = {
	countries: [],
	loading: false,
	error: null,
}

export const tripsReducer = (state = initialState, action: ActionTripType): InitialStateType => {
	switch (action.type) {
		case actionTypes.FETCH_TRIPS_START:
			return {
				...state,
				loading: true,
				error: null,
			}
		case actionTypes.FETCH_TRIPS_SUCCESS:
			return {
				...state,
				loading: false,
				countries: action.countries,
				error: null,
			}
		case actionTypes.FETCH_TRIPS_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		default:
			return state
	}
}
