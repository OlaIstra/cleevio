import styled from 'styled-components'

export const AuthStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & form {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 250px;
        justify-content: space-between;
        align-items: center;
    }
`;