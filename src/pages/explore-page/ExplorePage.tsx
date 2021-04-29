/**
 * Importing npm packages.
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';

/**
 * Importing npm design components.
 */
import { Card, Typography } from 'antd';

/**
 * Importing user defined components.
 */
import NovelList from '../../containers/novel-list/NovelList';
import Filters from '../../containers/filters/Filters';

/**
 *  Importing user defined modules.
 */
import { NovelAPI } from '../../utils/api';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */

function ExplorePage() {
  const history = useHistory();
  const { search } = history.location;
  const { data, isLoading, refetch } = useInfiniteQuery(['novels', search], NovelAPI.list, { enabled: true, getNextPageParam: console.log });

  const novels = data?.pages[0].items || [];
  const title = <Typography.Title level={2}>Explore</Typography.Title>;

  return (
    <Card title={title} className='mb-5 mt-4 mx-4'>
      <Filters />
      <NovelList loading={isLoading} type='horizontal' novels={novels} />
    </Card>
  );
}

export default ExplorePage;
