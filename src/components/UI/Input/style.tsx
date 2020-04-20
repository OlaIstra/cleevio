import styled from 'styled-components'
import { color, lineHeight, fontSize, height, padding, radius } from '../../../styles/index'

interface InputProps {
    isFocus: boolean
}

interface ParagraphProps {
    valid: boolean
}

export const InputStyle = styled.input<InputProps>`
    max-width: 380px;
    width: 100%;
    height: ${height.small}px;
    padding: 0 ${padding.medium}px;
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: ${fontSize.micro}px;
    line-height: ${lineHeight.micro}px;
    color: ${color.greyBlack};

    border: 1px solid ${color.grey};
    box-sizing: border-box;
    border-radius: ${radius.medium}px;

    border-bottom-left-radius: ${ props => (props.isFocus ? 0 : radius.medium)}px;
    border-bottom-right-radius: ${ props => (props.isFocus ? 0 : radius.medium)}px; 
`;

export const ValidationErrorStyle = styled.p<ParagraphProps>`
    margin: 0px;
    font-size: ${fontSize.small}px;
    color: ${color.orange};

    display: ${(props) => (props.valid ? 'block' : 'none')};
`
