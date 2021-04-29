import styled from 'styled-components';

interface NavItemState {
  active: boolean;
  disabled?: boolean;
}

const activeStyle = `
  border-left: 2px solid #1890ff;
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
`;

const activeHover = `
  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.05);
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
