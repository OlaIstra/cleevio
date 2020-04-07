import styled from 'styled-components'
import { color, device } from '../../styles/index'

export const NavBarStyle = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin: 0;
	padding: 100px 0 0;
	height: 100vh;
	width: 240px;
	list-style: none;
	background-color: ${color.greyLight};

	@media ${device.tablet} {
		position: absolute;
		z-index: 1;
		display: ${(props) => (props.isShow ? 'flex' : 'none')};
	}
`
