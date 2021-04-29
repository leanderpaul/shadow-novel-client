import styled from 'styled-components';
import { Typography, Select } from 'antd';

export const Container = styled.div`
  width: 100%;
`;

export const FlatButton = styled(Typography.Text)`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #444;
  }
`;

export const SelectFilter = styled(Select)`
  width: 250px;
`;
