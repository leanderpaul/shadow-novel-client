import styled, { css } from 'styled-components';

interface NavItemState {
  active: boolean;
  disabled?: boolean;
}

const activeStyle = css`
  border-left: 2px solid #1890ff;
  background-color: ${(props) => props.theme.background.active};
  color: #fff;
`;

const activeHover = css`
  &:hover {
    color: #fff;
    background-color: ${(props) => props.theme.background.active};
  }
`;

export const Container = styled.div<NavItemState>`
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  padding: 10px 20px;
  /* width: 250px; */
  white-space: nowrap;
  color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.65)')};
  ${(props) => props.active && activeStyle}
  ${(props) => !props.disabled && activeHover}

  .icon {
    margin-right: 20px;
  }
`;
