/**
 * Importing npm packages.
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

/**
 * Importing npm design components.
 */
import { Card, Input, Typography } from 'antd';

/**
 * Importing user defined components.
 */
import NovelList from '../../components/novel-list/NovelList';

/**
 *  Importing user defined modules.
 */
import { NovelAPI } from '../../utils/api';

/**
 * Importing styled components.
 */
import { Container, SearchContainer, NovelListContainer } from './styles';

/**
 * Importing types.
 */

function SearchPage() {
  const history = useHistory();
  const { isLoading, data } = useQuery(['novels', window.location.search], () => NovelAPI.list());

  const handleSearch = (searchQuery: string) => history.push(`/search?title=${searchQuery}`);
  const novels = data?.items || [];
  const resultCount = data?.pagination.totalCount;

  const title = <Typography.Title className='mb-0' level={3}>{`${resultCount || 'Loading'} Results`}</Typography.Title>;

  return (
    <Container>
      <SearchContainer>
        <Input.Search placeholder='Novel Title to search' size='large' allowClear enterButton='Search' loading={isLoading} onSearch={handleSearch} />
      </SearchContainer>
      <NovelListContainer>
        <Card title={title}>
          <NovelList loading={isLoading} type='horizontal' novels={novels} />
        </Card>
      </NovelListContainer>
    </Container>
  );
}

export default SearchPage;
