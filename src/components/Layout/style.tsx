import styled from 'styled-components'
import { device, padding, height } from '../../styles/index'

export const LayoutStyle = styled.div`
	display: flex;
	width: 100%;

	& > button {
		display: none;
	}

	@media ${device.tablet} {
		& > button {
			display: flex;
			position: absolute;
			margin: 15px;
			height: ${height.small}px;
			width: ${height.small}px;
			z-index: 10;
		}
	}
`

export const MainStyle = styled.div`
	flex-shrink: 2;
	max-width: 880px;
	width: 100%;
	padding: ${padding.large}px;
`

export const AsideStyle = styled.div`
	flex-basis: 320px;
	flex-shrink: 1;
	width: 320px;
	height: 100vh;

	@media ${device.tablet} {
		display: none;
	}
`
