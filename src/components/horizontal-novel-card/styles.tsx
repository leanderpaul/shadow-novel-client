import styled from 'styled-components';

import { Skeleton, Typography } from 'antd';

export const CardSkeleton = styled(Skeleton)`
  width: calc(100% - 180px);
`;

export const NovelTitle = styled(Typography.Title)`
  width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;
