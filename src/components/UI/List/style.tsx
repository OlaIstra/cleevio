import styled from 'styled-components'
import { fontWeight, color, fontSize, height, padding, radius } from '../../../styles/index'

export const ListStyle = styled.div`
    position: absolute;
    top: 59px;
    background: ${color.white};
    max-width: 380px;
    width: 100%;
    border: 1px solid ${color.grey};
    box-sizing: border-box;
    border-radius: ${radius.medium}px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
`;

export const ListItemStyle = styled.div`
    display: flex;
    align-items: center;
    height: ${height.small}px;
    padding-left: ${padding.medium}px;
    
    border-bottom: 1px solid ${color.grey};
    font-weight: ${fontWeight.bold};
    font-size: ${fontSize.micro}px;
    color: ${color.black};

    &:hover {
        cursor: pointer;
        background: ${color.grey};
    }

    &:last-of-type {
        border-bottom: 1px solid transparent;
        border-bottom-left-radius: ${radius.medium}px;
        border-bottom-right-radius: ${radius.medium}px;
    }
`;