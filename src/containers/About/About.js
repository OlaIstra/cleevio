import React from 'react'
import { useSelector } from 'react-redux'

import { H1 } from '../../components/UI/H1/H1'
import { Button } from '../../components/UI/Button/Button'

import { AboutStyle } from './style'

export const About = (props) => {
	const isAuth = useSelector((state) => {
		return state.auth.token !== null
	})

	const redirectToAuth = () => {
		props.history.push('/auth')
	}

	const redirectToTrips = () => {
		props.history.push('/trips')
	}

	return (
		<AboutStyle>
			<H1 title='Do you want to travel with Cleevio?' />
			{isAuth ? (
				<Button title='Please go to trips' clicked={redirectToTrips} />
			) : (
				<Button title='Please Log in' clicked={redirectToAuth} />
			)}
		</AboutStyle>
	)
}
