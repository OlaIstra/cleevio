import * as actionTypes from './actionTypes'
import { instanse } from '../../shared/axios'
import { mapKeys } from 'lodash'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../..'
import { Action } from 'redux'

type Country = {
	id?: string
	value: string
	text: string
	icon: string
}

type ActionStartType = {
	type: typeof actionTypes.FETCH_TRIPS_START
}

type ActionSuccessType = {
	type: typeof actionTypes.FETCH_TRIPS_SUCCESS
	countries: Array<Country>
}

type ActionFailType = {
	type: typeof actionTypes.FETCH_TRIPS_FAIL
	error: string
}

export type ActionTripType = ActionStartType | ActionSuccessType | ActionFailType

export const fetchTripsStart = (): ActionStartType => {
	return {
		type: actionTypes.FETCH_TRIPS_START,
	}
}

export const fetchTripsSuccess = (countries: Array<Country>): ActionSuccessType => {
	return {
		type: actionTypes.FETCH_TRIPS_SUCCESS,
		countries: countries,
	}
}

export const fetchTripsFail = (error: string): ActionFailType => {
	return {
		type: actionTypes.FETCH_TRIPS_FAIL,
		error: error,
	}
}

type ResponceDataType = {
	label: string
	data: Array<Country>
}

type ResponseType = Array<ResponceDataType>

export const fetchTrips = (): ThunkAction<void, AppStateType, unknown, Action<string>> => {
	return (dispatch) => {
		dispatch(fetchTripsStart())
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
				dispatch(fetchTripsSuccess(tripsToShow))
			})
			.catch((error: string) => {
				dispatch(fetchTripsFail(error))
			})
	}
}
