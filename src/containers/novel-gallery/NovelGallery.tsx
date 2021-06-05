/**
 * Importing npm packages.
 */
import React from 'react';
import { useQuery } from 'react-query';

/**
 * Importing npm design components.
 */
import { Card, Typography } from 'antd';

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

/**
 * Importing types.
 */
import type { ListNovel } from '../../typescript/api';

interface NovelGalaryProps {
  title: string;
  query: Pick<ListNovel['query'], 'genre' | 'sortField' | 'sortOrder' | 'status'>;
}

function NovelGallery(props: NovelGalaryProps) {
  const { data, isLoading } = useQuery(['novel-gallery', props.query], () => NovelAPI.list({ ...props.query, limit: '8' }));

  const novels = data?.items || [];
  const title = (
    <Typography.Title className='mb-0' level={3}>
      {props.title}
    </Typography.Title>
  );

  return (
    <div className='my-4'>
      <Card title={title}>
        <NovelList loading={isLoading} novels={novels} type='vertical' placeholder={8} />
      </Card>
    </div>
  );
}

export default NovelGallery;
