import React, { useEffect, useCallback } from 'react'

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from './store/actions/index'

import { Layout } from './components/Layout/Layout'
import { About } from './containers/About/About'
import { Auth } from './containers/Auth/Auth'
import { Logout } from './containers/Logout/Logout'
import Trips from './containers/Trips/Trips'

import './App.css'

function App() {
	const dispatch = useDispatch()
	const onTryAutoSignUp = useCallback(
		() => dispatch(actions.checkAuthStatus()),
		[dispatch]
	)

	const isAuth = useSelector((state) => {
		return state.auth.token !== null
	})

	useEffect(() => {
		onTryAutoSignUp()
	}, [onTryAutoSignUp])

	let routes = (
		<Switch>
			<Route path='/Auth' component={Auth} />
			<Route path='/' exact component={About} />
			<Redirect to='/' />
		</Switch>
	)

	if (isAuth) {
		routes = (
			<Switch>
				<Route path='/logout' component={Logout} />
				<Route path='/trips' component={Trips} />
				<Route path='/' exact component={About} />
				<Redirect to='/' />
			</Switch>
		)
	}

	return <Layout>{routes}</Layout>
}

export default withRouter(App)
