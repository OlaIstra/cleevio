import styled from 'styled-components'
import { fontWeight, color } from '../../../styles/index'

export const TogglerStyle = styled.p`
    font-weight: ${fontWeight.bold};
    color: ${color.black};

    &:hover {
        cursor: pointer;
        color: ${color.blue};
    }
`;