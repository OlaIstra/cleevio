import React from 'react'

import { Navlink } from '../UI/NavLink/Navlink'
import { NavBarStyle } from './style'

type Props = {
	isShow: boolean
	isAuth: boolean
}

export const NavBar: React.FC<Props> = (props) => {
	return (
		<NavBarStyle isShow={props.isShow}>
			<Navlink link='/' exact icon='icon-home' title='About' />
			{props.isAuth && <Navlink link='/trips' icon='icon-star' title='Trips' />}
			{props.isAuth ? (
				<Navlink link='/logout' icon='icon-refresh' title='Logout' />
			) : (
					<Navlink link='/auth' icon='icon-edit' title='Authentication' />
				)}
		</NavBarStyle>
	)
}
