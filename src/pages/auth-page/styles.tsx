import styled from 'styled-components';
import { Card } from 'antd';

// import F from '../../assets/img/auth-background.jpg';

export const AuthCard = styled(Card)`
  width: 500px;
`;

export const Container = styled.div`
  margin-left: -10px;
  width: calc(100% + 10px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: center / cover no-repeat url('https://raw.githubusercontent.com/leanderpaul/shadow-novel-electron-app/master/src/assets/img/auth-background.jpg');
`;
