import * as actionTypes from './actionTypes'
import axios from '../../shared/axios'
import { mapKeys } from 'lodash'

export const fetchTripsStart = () => {
	return {
		type: actionTypes.FETCH_TRIPS_START,
	}
}

export const fetchTripsSuccess = (countries) => {
	return {
		type: actionTypes.FETCH_TRIPS_SUCCESS,
		countries: countries,
	}
}

export const fetchTripsFail = (error) => {
	return {
		type: actionTypes.FETCH_TRIPS_FAIL,
		error: error,
	}
}

export const fetchTrips = () => {
	return (dispatch) => {
		dispatch(fetchTripsStart())
		axios
			.get()
			.then((res) => {
				const tripsToShow = []

				const result = res.data[0]

				mapKeys(result.data, function(val, key) {
					tripsToShow.push({
						id: result.data[key].value,
						...result.data[key],
					})
				})
				dispatch(fetchTripsSuccess(tripsToShow))
			})
			.catch((error) => {
				dispatch(fetchTripsFail(error))
			})
	}
}
