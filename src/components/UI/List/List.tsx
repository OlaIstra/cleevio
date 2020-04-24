import React from 'react'

import { ListStyle, ListItemStyle } from './style'
import { Country } from '../../../store/reducers/trips'

type Props = {
	list: Array<Country>
	clicked: (e: React.SyntheticEvent) => void
}

export const List: React.FC<Props> = (props) => {
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
