import styled from 'styled-components';

import { MenuOutlined } from '@ant-design/icons';

interface NavState {
  open: boolean;
}

export const Container = styled.div<NavState>`
  width: ${(props) => (props.open ? '250px' : '55px')};
  background-color: #1f1f1f;
  padding: 20px 0px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const LogoContainer = styled.div`
  text-align: center;
  margin: 15px 15px 20px 15px;
`;

export const NavItemList = styled.ul`
  list-style-type: none;
  padding: 0px;
`;

export const Toggle = styled(MenuOutlined)<NavState>`
  color: #fff;
  font-size: 18px;
  transform: rotateZ(${(props) => (props.open ? 0 : -90)}deg);
  transition: all 350ms cubic-bezier(0.6, 0.05, 0.28, 0.91);
`;
