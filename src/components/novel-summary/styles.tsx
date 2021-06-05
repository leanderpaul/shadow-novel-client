import styled from 'styled-components';

import { Button } from 'antd';

export const Container = styled.div`
  margin: 100px 0px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NovelInfo = styled.div`
  width: 700px;
  height: 400px;
  z-index: 2;
  margin: 0px 50px;
  display: flex;
  flex-direction: column;

  .ant-typography {
    color: #fff;
  }

  button {
    width: 200px;
  }

  span {
    font-weight: 600;
  }
`;

export const AddToLibraryButton = styled(Button)`
  &&& {
    background-color: #d0deff;
    color: #177ddc;

    &:hover {
      background-color: #a0bcff;
    }
  }
`;
