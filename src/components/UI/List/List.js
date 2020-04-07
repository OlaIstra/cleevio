import React from 'react'

import { ListStyle, ListItemStyle } from './style'

export const List = (props) => {
	return (
		<ListStyle>
			{props.list.map((elem) => {
				return (
					<ListItemStyle onClick={props.clicked} key={elem.id} id={elem.id}>
						{elem.text}
					</ListItemStyle>
				)
			})}
		</ListStyle>
	)
}
