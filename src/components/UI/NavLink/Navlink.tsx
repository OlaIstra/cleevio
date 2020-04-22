import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavlinkStyle } from './style'

type Props = {
	link: string
	title: string
	icon: string
	exact?: boolean
}

export const Navlink: React.FC<Props> = (props) => (
	<NavlinkStyle>
		<NavLink to={props.link} exact={props.exact}>
			{props.title}
			<span className={props.icon}></span>
		</NavLink>
	</NavlinkStyle>
)
