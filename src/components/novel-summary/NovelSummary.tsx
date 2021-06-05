/**
 * Importing npm packages.
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Button, Skeleton, Space, Typography } from 'antd';
import { BookFilled, BarsOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';

/**
 * Importing user defined components.
 */
import NovelCover from '../../components/novel-cover/NovelCover';

/**
 *  Importing user defined modules.
 */
import { convertGenre } from '../../utils/lib';

/**
 * Importing styled components.
 */
import { NovelInfo, Container, AddToLibraryButton } from './styles';

/**
 * Importing types.
 */
import type { GetNovel } from '../../typescript/api';

interface NovelSummaryProps {
  loading: boolean;
  novel?: GetNovel['response'];
}

function NovelSummary(props: NovelSummaryProps) {
  const { novel, loading } = props;

  return (
    <Container>
      <NovelCover hoverable={false} image={props.novel?.cover} size='lg' alt={props.novel?.title} />
      <NovelInfo>
        {loading ? (
          <Skeleton active={true} paragraph={{ rows: 5 }} />
        ) : (
          <React.Fragment>
            <Typography.Title>{novel?.title}</Typography.Title>
            <Space>
              <Typography.Text className='mr-3'>
                <BookFilled className='mr-2' />
                {novel?.genre && convertGenre(novel.genre)}
              </Typography.Text>
              <Typography.Text className='mr-3'>
                <BarsOutlined className='mr-2' />
                {novel?.chapterCount} Chapters
              </Typography.Text>
              <Typography.Text className='mr-3 text-capitalize'>
                <ClockCircleOutlined className='mr-2' />
                {novel?.status}
              </Typography.Text>
            </Space>
            <Space className='mt-4'>
              <Typography.Text style={{ color: '#aaa' }}>Author: </Typography.Text>
              <Typography.Text style={{ color: 'white' }}>{novel?.author}</Typography.Text>
            </Space>
            <Space size='large' className='mt-auto mb-1'>
              <Link to={novel?.chapters[0] ? `/novel/${novel.nid}/${novel?.chapters[0]?.cid}` : '#'}>
                <Button disabled={novel?.chapterCount === 0} type='primary' size='large' shape='round'>
                  Read
                </Button>
              </Link>
              <AddToLibraryButton type='text' icon={<PlusOutlined />} size='large' shape='round'>
                Add to library
              </AddToLibraryButton>
            </Space>
          </React.Fragment>
        )}
      </NovelInfo>
    </Container>
  );
}

export default NovelSummary;
