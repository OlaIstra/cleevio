import React, { useEffect, useCallback } from 'react'
//@ts-ignore
import { Redirect } from 'react-router-dom'

import * as actions from '../../store/actions/index'
//@ts-ignore
import { useDispatch } from 'react-redux'

export const Logout = () => {
	const dispatch = useDispatch()
	const onLogout = useCallback(() => dispatch(actions.logout()), [dispatch])

	useEffect(() => {
		onLogout()
	}, [onLogout])

	return <Redirect to='/' />
}
