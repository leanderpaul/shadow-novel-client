import styled, { css } from 'styled-components';

import { Button } from 'antd';

export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const Release = styled.div`
  color: ${(props) => props.theme.text.primary};
  font-weight: 600;
`;

export const Container = styled.div`
  tr.ant-table-row:hover > td {
    background: inherit;
  }

  .bordered {
    border: 1px solid ${(props) => props.theme.background.primary};
  }
`;

export const GenreButton = styled(Button)`
  border: 1px solid #eee;

  &:hover {
    background-color: #eee;
  }
`;
