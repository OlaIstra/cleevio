import React, { useEffect, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as actions from '../../store/actions/index'


export const Logout: React.FC = () => {
	const dispatch = useDispatch()
	const onLogout = useCallback(() => dispatch(actions.logout()), [dispatch])

	useEffect(() => {
		onLogout()
	}, [onLogout])

	return <Redirect to='/' />
}
