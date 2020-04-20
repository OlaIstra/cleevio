import styled from 'styled-components'
import { color, device } from '../../../styles/index'

export const BackdropStyle = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: ${color.greyFog};
    
    @media ${device.mobileL} {
        display: none;
    }
`
