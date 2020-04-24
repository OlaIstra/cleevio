import React from 'react'

import { TripwrapStyle } from './style'
import { Button } from '../UI/Button/Button'

import germany from '../../assets/img/flags/germany.svg'
import czechia from '../../assets/img/flags/czechia.svg'

type Props = {
	id?: string
	title: string
}

export const Tripwrap: React.FC<Props> = (props) => {
	let flag: undefined | string
	switch (props.id) {
		case 'germany':
			flag = germany
			break
		case 'czechia':
			flag = czechia
			break
		default:
			flag = ''
	}

	return (
		<TripwrapStyle>
			<div className='desc'>
				<img src={flag} alt='flag' />
				<p>{props.title}</p>
			</div>
			<div className='btns'>
				<Button icon='icon-bin'></Button>
				<Button icon='icon-arrow'></Button>
			</div>
		</TripwrapStyle>
	)
}
