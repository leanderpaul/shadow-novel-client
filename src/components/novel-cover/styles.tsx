import styled from 'styled-components';

interface ContainerProps {
  hoverable: boolean;
}

export const Container = styled.div<ContainerProps>`
  flex-shrink: 0;
  overflow: hidden;

  img {
    transition: all 0.3s linear;
  }

  &:hover {
    img {
      transform: ${(props) => (props.hoverable ? 'scale(1.1)' : 'auto')};
    }
  }
`;
