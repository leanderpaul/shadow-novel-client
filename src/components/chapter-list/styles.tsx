import styled, { css } from 'styled-components';

import { DeleteFilled } from '@ant-design/icons';

interface ContainerProps {
  isColored: boolean;
}

export const DeleteIcon = styled(DeleteFilled)`
  font-size: 20px;

  &&& {
    display: none;
  }

  &:hover {
    color: red;
  }

  &:focus {
    display: block;
  }
`;

const DarkBackground = css<ContainerProps>`
  background-color: ${(props) => (props.isColored ? '#1f1f1f' : '#141414')};
`;

const Lightbackground = css<ContainerProps>`
  background-color: ${(props) => (props.isColored ? '#f4f4f4' : '#fff')};
`;

const adminChapterItem = css`
  .ant-typography {
    text-decoration: underline;
  }
`;

export const Container = styled.div<ContainerProps>`
  ${(props) => (props.theme.type === 'light' ? Lightbackground : DarkBackground)}
  padding: 0px 20px;

  &:hover {
    .ant-typography {
      text-decoration: underline;
    }

    ${DeleteIcon} {
      display: block;
    }
  }
`;
