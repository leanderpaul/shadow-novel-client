import styled from 'styled-components';

interface ContainerProps {
  width: number;
}

interface ChapterProps {
  fontSize: number;
}

export const Container = styled.div<ContainerProps>`
  margin-left: -10px;
  width: calc(100% + 10px);
  height: 100%;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow: scroll;
    height: calc(100% - 66px);
    scrollbar-width: thin;
  }

  .chapter-container {
    padding: 50px 0px;
    width: ${(props) => props.width}px;
  }
`;

export const Chapter = styled.div<ChapterProps>`
  background-color: ${(props) => props.theme.background.secondary};
  margin: 50px 0px;
  padding: 30px 40px;
  font-size: ${(props) => props.fontSize}px;

  .ant-typography {
    color: ${(props) => props.theme.text.secondary};
  }

  h3 {
    font-size: ${(props) => props.fontSize + 8}px;
  }
`;
