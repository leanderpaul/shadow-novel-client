import styled from 'styled-components';

import SearchBackground from '../../assets/img/search-background.jpg';

export const Container = styled.div`
  /* margin: 20px 20px; */
  margin-left: -10px;
`;

export const SearchContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100%;
  background-position: center;
  background-image: url(${SearchBackground});

  > * {
    width: 70% !important;
  }

  input {
    padding: 0px 10px !important;
  }

  .ant-input-affix-wrapper {
    border-top-left-radius: 50px !important;
    border-bottom-left-radius: 50px !important;
    background-color: ${(props) => props.theme.background.secondary};
  }

  button,
  .ant-input-group-addon {
    border-top-right-radius: 50px !important;
    border-bottom-right-radius: 50px !important;
    width: 100px;
  }
`;

export const NovelListContainer = styled.div`
  margin: 20px 20px;
`;
