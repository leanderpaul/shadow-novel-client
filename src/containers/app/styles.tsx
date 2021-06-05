import styled from 'styled-components';

export const AppContainer = styled.div`
  font-size: 16px;
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const ContentContainer = styled.div`
  width: 100%;
  padding-left: 10px;
  overflow: auto;
  background-color: ${(props) => props.theme.background.primary};
  scrollbar-width: thin;
`;
