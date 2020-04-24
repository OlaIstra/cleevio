import * as actionTypes from './actionTypes'
import { instanse } from '../../shared/axios'
import { mapKeys } from 'lodash'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, InferActionsTypes } from '../..'
import { Action } from 'redux'
import { Country, ErrorType } from '../reducers/trips'

export type ActionTripType = InferActionsTypes<typeof actions>

export const actions = {
	fetchTripsStart: () => {
		return {
			type: actionTypes.FETCH_TRIPS_START,
		} as const
	},

	fetchTripsSuccess: (countries: Array<Country>) => {
		return {
			type: actionTypes.FETCH_TRIPS_SUCCESS,
			countries: countries,
		} as const
	},

	fetchTripsFail: (error: ErrorType) => {
		return {
			type: actionTypes.FETCH_TRIPS_FAIL,
			error: error,
		} as const
	}
}

type ResponceDataType = {
	label: string
	data: Array<Country>
}

type ResponseType = Array<ResponceDataType>

export const fetchTrips = (): ThunkAction<void, AppStateType, unknown, Action<string>> => {
	return (dispatch) => {
		dispatch(actions.fetchTripsStart())
		instanse
			.get<ResponseType>('/countries.json')
			.then((res) => {
				const tripsToShow: Array<Country> = []
				const result = res.data[0]

				mapKeys(result.data, function (val, key) {
					tripsToShow.push({
						id: result.data[key].value,
						...result.data[key],
					})
				})
				dispatch(actions.fetchTripsSuccess(tripsToShow))
			})
			.catch((error: ErrorType) => {
				dispatch(actions.fetchTripsFail(error))
			})
	}
}
