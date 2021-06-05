/**
 * Importing npm packages.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/**
 * Importing npm design components.
 */
import { Empty, Tag, Typography } from 'antd';

/**
 * Importing user defined components.
 */
import NovelVolume from '../novel-volume/NovelVolume';

/**
 *  Importing user defined modules.
 */
import { convertTag } from '../../utils/lib';

/**
 * Importing styled components.
 */
import { NovelDescriptionCard, LastChapterContainer } from './styles';

/**
 * Importing types.
 */
import type { CardTabListType } from 'antd/lib/card';
import type { GetNovel } from '../../typescript/api';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

interface NovelDescriptionProps {
  loading: boolean;
  novel?: GetNovel['response'];
}

/**
 * Constants.
 */
const tablist: CardTabListType[] = [
  {
    key: 'about',
    tab: (
      <Typography.Title className='mb-0 px-3' level={3}>
        About
      </Typography.Title>
    )
  },
  {
    key: 'chapters',
    tab: (
      <Typography.Title className='mb-0 px-3' level={3}>
        Table of Contents
      </Typography.Title>
    )
  }
];

function NovelDescription(props: NovelDescriptionProps) {
  const [tab, setTab] = useState<'about' | 'chapters'>('about');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  const { loading, novel } = props;
  const lastChapter = novel?.chapters[novel.chapterCount - 1] || null;
  const toggleTab = () => setTab(tab === 'about' ? 'chapters' : 'about');
  const toggleSort = () => setSort(sort === 'asc' ? 'desc' : 'asc');
  const desc = novel?.desc.map((block, index) => (
    <Typography.Paragraph key={index} strong={block.tag === 'strong'}>
      {block.text}
    </Typography.Paragraph>
  ));
  const tags = novel?.tags.map((tag, index) => (
    <Tag key={index} className='m-1'>
      {convertTag(tag)}
    </Tag>
  ));

  return (
    <NovelDescriptionCard className='mb-5' tabList={tablist} activeTabKey={tab} onTabChange={toggleTab} loading={loading}>
      {tab === 'about' ? (
        <div>
          <div>
            <Typography.Title level={4}>Synopsis</Typography.Title>
            <span>{desc}</span>
          </div>
          <div>
            <Typography.Title level={4}>Tags</Typography.Title>
            <span>{tags}</span>
          </div>
        </div>
      ) : novel?.chapterCount ? (
        <div>
          <LastChapterContainer>
            <Typography.Text className='mr-3'>Latest Release:</Typography.Text>
            <Link to={`/novel/${novel?.nid}/${lastChapter?.cid}`} component={Typography.Link}>
              <span className='text-underline'>{`Chapter ${lastChapter?.index}: ${lastChapter?.title}`}</span>
            </Link>
            <Typography.Text className='ml-3' type='secondary'>
              {moment(lastChapter?.createdAt).fromNow()}
            </Typography.Text>
            <div className='float-right mx-1 pointer' style={{ fontSize: 24 }} onClick={toggleSort}>
              {sort === 'asc' ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
            </div>
          </LastChapterContainer>
          {props.novel && <NovelVolume type='grid' chapters={props.novel.chapters} reverse={sort === 'desc'} />}
        </div>
      ) : (
        <Empty />
      )}
    </NovelDescriptionCard>
  );
}

export default NovelDescription;
