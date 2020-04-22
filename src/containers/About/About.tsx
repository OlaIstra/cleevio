import React from 'react'
import { useSelector } from 'react-redux'

import { H1 } from '../../components/UI/H1/H1'
import { Button } from '../../components/UI/Button/Button'

import { AboutStyle } from './style'
import { AppStateType } from '../..'

type Props = {
	history: Array<string>
}

export const About: React.FC<Props> = (props) => {
	const isAuth = useSelector((state: AppStateType) => {
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
