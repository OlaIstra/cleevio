import React from 'react'

import { ListStyle, ListItemStyle } from './style'

type Props = {
	list: Array<any>
	clicked: () => void
}

export const List = (props: Props) => {
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
