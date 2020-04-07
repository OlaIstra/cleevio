import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { NavBar } from '../NavBar/NavBar'
import { Button } from '../UI/Button/Button'

import { LayoutStyle, MainStyle, AsideStyle } from './style'

export const Layout = (props) => {
	const [isShow, setIsShow] = useState(false)
	const isLogin = useSelector((state) => {
		return state.auth.token !== null
	})
	const toggleNavbar = () => {
		setIsShow(!isShow)
	}

	return (
		<LayoutStyle>
			<Button icon='icon-burger' clicked={toggleNavbar} />
			<NavBar isAuth={isLogin} isShow={isShow} />
			<MainStyle>{props.children}</MainStyle>
			<AsideStyle />
		</LayoutStyle>
	)
}
