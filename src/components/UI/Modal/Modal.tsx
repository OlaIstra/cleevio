import React from 'react'

import { Modal } from './style'
import { Backdrop } from '../Backdrop/Backdrop'

type Props = {
	show: boolean
	modalClosed: () => void
	children: any
}

const ModalWin: React.FC<Props> = (props) => {
	return (
		<>
			<Backdrop show={props.show} clicked={props.modalClosed} />
			<Modal
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0',
				}}
			>
				{props.children}
			</Modal>
		</>
	)
}

export default React.memo(
	ModalWin,
	(prevProps, nextProps) =>
		nextProps.show === prevProps.show &&
		nextProps.children === prevProps.children
)
