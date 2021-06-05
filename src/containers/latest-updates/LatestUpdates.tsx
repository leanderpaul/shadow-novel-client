/**
 * Importing npm packages.
 */
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

/**
 * Importing npm design components.
 */
import { Typography, Table, Button, Card } from 'antd';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { convertGenre } from '../../utils/lib';
import { NovelAPI } from '../../utils/api';

/**
 * Importing styled components.
 */
import { Title, Release, GenreButton, Container } from './styles';

/**
 * Importing types.
 */
import type { ColumnsType } from 'antd/lib/table';
import type { GetLatestUpdates } from '../../typescript/api';

type LatestUpdate = GetLatestUpdates['response']['items'][0];

const columns: ColumnsType<LatestUpdate> = [
  {
    title: <Title>Genre</Title>,
    dataIndex: 'genre',
    render: (genre: LatestUpdate['genre']) => (
      <Link to={`/novel?genre=${genre}`}>
        <GenreButton type='text'> {convertGenre(genre)}</GenreButton>
      </Link>
    )
  },
  {
    title: <Title>Title</Title>,
    dataIndex: 'title',
    render: (title: LatestUpdate['title'], record) => (
      <Link to={`/novel/${record.nid}`}>
        <Typography.Title className='text-underline' level={5}>
          {title}
        </Typography.Title>
      </Link>
    )
  },
  {
    title: <Title>Release</Title>,
    dataIndex: 'chapter',
    key: 'chapter.cid',
    render: (chapter: LatestUpdate['chapter'], record) => (
      <Link to={`/novel/${record.nid}/${chapter.cid}`}>
        <Release className='text-underline'>{`Chapter ${chapter.index}: ${chapter.title}`}</Release>
      </Link>
    )
  },
  {
    title: <Title>Author</Title>,
    dataIndex: 'author',
    key: 'author.uid',
    render: (author: LatestUpdate['author']) => author.username
  },
  {
    title: <Title>Time</Title>,
    dataIndex: 'chapter',
    key: 'chapter.createdAt',
    render: (chapter: LatestUpdate['chapter']) => moment(chapter.createdAt).fromNow()
  }
];

function LatestUpdates() {
  const { isLoading, data } = useQuery('latest-updates', NovelAPI.latestUpdates);

  const latestUpdates = data?.items || [];
  const title = (
    <Typography.Title className='mb-0' level={3}>
      Latest Updates
    </Typography.Title>
  );

  return (
    <Container>
      <Card title={title}>
        <Table className='bordered' columns={columns} dataSource={latestUpdates} loading={isLoading} pagination={false} rowKey='nid' />
      </Card>
    </Container>
  );
}

export default LatestUpdates;
