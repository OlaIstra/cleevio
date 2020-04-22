import styled from 'styled-components'
import { color, padding, radius, device } from '../../styles/index'

export const TripwrapStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${color.greyLight};
    border-radius: ${radius.medium}px;
    padding: ${padding.medium}px;
    margin-top: 30px;

    & .desc {
        display: flex;
    }

    & img {
        margin-right: 20px;
    }

    & .btns {
        display: flex;
        justify-content: space-between;
        width: 110px;
    }

    @media ${device.mobileL} {
        flex-direction: column;
        align-items: center;

        & .desc {
            width: 100%;
            justify-content: space-between;
            flex-direction: row-reverse;
        }
        
        & .btns {
            flex-direction: column;
            width: 100%;
            margin-top: 30px;
        }

        & .btns > button {
            display: flex;
            width: 100%;
        }
    }    
`;