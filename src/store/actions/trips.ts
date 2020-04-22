import * as actionTypes from './actionTypes'
import axios from 'axios'
import { mapKeys } from 'lodash'

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

export const fetchTrips = () => {
	return (dispatch: any) => {
		dispatch(fetchTripsStart())
		axios
			.get('https://gist.githubusercontent.com/davidzadrazil/43378abbaa2f1145ef50000eccf81a85/raw/d734d8877c2aa9e1e8c1c59bcb7ec98d7f8d8459/countries.json')
			.then((res: any) => {
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
