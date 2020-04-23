import React, { useState, useEffect, useCallback, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions/index'
import { withErrorHandler } from '../../hoc/withErrorHandler'
import { instanse } from '../../shared/axios'

import { H1 } from '../../components/UI/H1/H1'
import { Input } from '../../components/UI/Input/Input'
import { Tripwrap } from '../../components/Tripwrap/Tripwrap'
import { Spinner } from '../../components/UI/Spinner/Spinner'
import { List } from '../../components/UI/List/List'

import { sortByName } from '../../shared/utils'

const ref = createRef()

const Trips = (props) => {
	const [isShowList, setShowList] = useState(false)
	const [tripsToList, setTripsToList] = useState(null)
	const [country, setCountry] = useState(null)

	const loading = useSelector((state) => {
		return state.trips.loading
	})

	const trips = useSelector((state) => {
		return state.trips.countries
	})

	const dispatch = useDispatch()
	const toGetTrips = useCallback(() => dispatch(actions.fetchTrips()), [
		dispatch,
	])

	useEffect(() => {
		toGetTrips()
	}, [toGetTrips])

	useEffect(() => {
		setTripsToList(trips)
	}, [trips])

	const displayList = (val) => {
		setTripsToList(sortByName(trips, val))
		tripsToList.length > 0 ? setShowList(true) : setShowList(false)
	}

	const showList = () => {
		setShowList(true)
	}

	const submit = (event) => {
		event.preventDefault()

		setTripsToList((prevState) => tripsToList)
		ref.current.value = ''
		setShowList(false)
	}

	const setValue = (e) => {
		let country = tripsToList.find((elem) => {
			return elem.id === e.target.id
		})
		ref.current.value = country.text

		setCountry(country)
		setShowList(false)
	}

	let display = country && (
		<Tripwrap key={country.id} title={country.text} id={country.id} />
	)

	if (loading) {
		display = <Spinner />
	}

	return (
		<>
			<H1 title='Start New Trip' />
			<form onSubmit={(event) => submit(event)}>
				<Input
					placeholder='Where do you want to travel?'
					changed={displayList}
					isFocus={isShowList}
					onfocus={showList}
					ref={ref}
				/>
				{tripsToList && isShowList && (
					<List list={tripsToList} clicked={(e) => setValue(e)} />
				)}
			</form>

			{display}
		</>
	)
}

export default withErrorHandler(Trips, instanse)
