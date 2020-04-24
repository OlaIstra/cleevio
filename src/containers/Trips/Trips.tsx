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
import { AppStateType } from '../..'
import { Country } from '../../store/reducers/trips'

const ref = createRef<HTMLInputElement>()

const Trips = () => {
	const [isShowList, setShowList] = useState(false)
	const [tripsToList, setTripsToList] = useState<Array<Country> | null>(null)
	const [country, setCountry] = useState<Country | null | undefined>(null)

	const loading = useSelector((state: AppStateType) => {
		return state.trips.loading
	})

	const trips = useSelector((state: AppStateType) => {
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

	const displayList = (val: string) => {
		setTripsToList(sortByName(trips, val))
		if (tripsToList) {
			tripsToList.length > 0 ? setShowList(true) : setShowList(false)
		}
	}

	const showList = () => {
		setShowList(true)
	}

	const submit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		setTripsToList((prevState) => tripsToList)
		//@ts-ignore
		ref.current.value = ''
		setShowList(false)
	}

	const setValue = (e: React.SyntheticEvent) => {
		if (tripsToList && e) {
			let target = e.target as HTMLElement;
			let country: Country | undefined = tripsToList.find((elem) => {
				return elem.id === target.id
			})
			//@ts-ignore
			ref.current.value = country.text

			setCountry(country)
			setShowList(false)
		}
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
					elementType='text'
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
