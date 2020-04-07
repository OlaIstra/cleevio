import React from 'react'

import { NavLink } from 'react-router-dom'
import { NavlinkStyle } from './style'

export const Navlink = (props) => (
	<NavlinkStyle>
		<NavLink to={props.link} exact={props.exact}>
			{props.title}
			<span className={props.icon}></span>
		</NavLink>
	</NavlinkStyle>
)
