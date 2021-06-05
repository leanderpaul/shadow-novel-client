import styled from 'styled-components';

export const Container = styled.nav`
  width: 100%;
  background-color: #3f3f3f;
  padding: 15px 20px;
  font-size: 20px;
  display: flex;
`;

export const Title = styled.h5`
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0px;
  padding: 5px 0px;
`;

export const LeftNavMenu = styled.div`
  flex-grow: 1;
  display: flex;

  .ant-skeleton-title {
    margin-top: 10px;
  }
`;

export const RightNavMenu = styled.div`
  flex-shrink: 0;
`;
