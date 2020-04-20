import styled from 'styled-components'
import { fontWeight, color, fontSize, padding, lineHeight } from '../../../styles/index'

export const NavlinkStyle = styled.li`
  margin: 0 0 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  
  & a {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    color: ${color.greyShadow};
    text-decoration: none;
    height: 100%;
    padding: ${padding.normal}px ${padding.medium}px;
    box-sizing: border-box;
    font-weight: ${fontWeight.bold};
    font-size: ${fontSize.normal}px;
    line-height: ${lineHeight.small}px;
  }

  & span {
    margin-right: 10px;
  }
  
  & a:hover, 
  & a:active,
  & a.active,
  & a.active > span:before,
  & a:hover > span:before, 
  & a:active > span:before {
    color: ${color.blue};
  }
`;