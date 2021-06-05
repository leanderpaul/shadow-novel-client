import styled from 'styled-components';

interface IBackgroundImageProps {
  cover?: string | null;
}

export const Container = styled.div`
  margin-left: -10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const BackgroundImage = styled.div<IBackgroundImageProps>`
  position: absolute;
  background: ${(props) => (props.cover ? `url(${props.cover})` : 'none')};
  background-position: center;
  background-size: 100%;
  filter: blur(20px) brightness(0.5);
  height: 660px;
  margin: -30px -30px;
  width: calc(100% + 60px);
`;
