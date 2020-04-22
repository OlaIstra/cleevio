import React from 'react'

import { H1Style } from './style'

type Props = {
	title: string
}

export const H1: React.FC<Props> = (props) => {
	return <H1Style>{props.title}</H1Style>
}
