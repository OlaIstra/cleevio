import styled from 'styled-components'
import {
	color,
	device,
	radius,
	height,
	lineHeight,
	padding,
	fontSize,
} from '../../../styles/index'

interface ButtonProps {
	widthProp: Boolean
	icon?: string
}

export const ButtonStyle = styled.button<ButtonProps>`
	display: flex;
	justify-content: center;
	height: ${height.medium}px;
	width: ${(props) => (!props.widthProp ? height.medium + 'px' : 'unset')};
	line-height: ${lineHeight.medium}px;
	padding: 0 ${padding.medium}px;
	text-transform: uppercase;
	border: none;
	border-radius: ${radius.medium}px;
	font-size: ${fontSize.small}px;
	outline: 0;
	text-decoration: none;
	color: ${color.greyBlack};
	background: ${(props) =>
		props.icon === 'icon-bin' ? color.redLight : color.grey};
	text-align: center;
	letter-spacing: 0.5px;

	&:hover {
		cursor: pointer;
		background: ${color.greyDark};
	}

	@media ${device.mobileL} {
		margin-bottom: 20px;
	}
`
