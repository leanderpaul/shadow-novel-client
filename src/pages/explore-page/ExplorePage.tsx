/**
 * Importing npm packages.
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from 'react-query';

/**
 * Importing npm design components.
 */
import { Card, Typography } from 'antd';

/**
 * Importing user defined components.
 */
import NovelList from '../../components/novel-list/NovelList';
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
  const { data, isLoading } = useQuery(['list-novels', search], () => NovelAPI.list());

  const novels = data?.items || [];
  const title = <Typography.Title level={2}>Explore</Typography.Title>;

  return (
    <Card title={title} className='mb-5 mt-4 mx-4'>
      <Filters />
      <NovelList className='mt-3' loading={isLoading} type='horizontal' novels={novels} />
    </Card>
  );
}

export default ExplorePage;
