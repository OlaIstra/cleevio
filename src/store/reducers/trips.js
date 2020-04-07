import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utils'

const initialState = {
	countries: [],
	loading: false,
	error: null,
}

export const tripsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_TRIPS_START:
			return updateObject(state, {
				loading: true,
				error: null,
			})
		case actionTypes.FETCH_TRIPS_SUCCESS:
			return updateObject(state, {
				loading: false,
				countries: action.countries,
				error: null,
			})
		case actionTypes.FETCH_TRIPS_FAIL:
			return updateObject(state, {
				loading: false,
				error: action.error,
			})
		default:
			return state
	}
}