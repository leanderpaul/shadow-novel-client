/**
 * Importing npm packages.
 */
import React from 'react';
import { useQuery } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Card, Descriptions, Empty, PageHeader, Typography } from 'antd';

/**
 * Importing user defined components.
 */
import NovelVolume from '../../components/novel-volume/NovelVolume';
import PageNotFound from '../page-not-found/PageNotFound';
import { ScrapeButton, EditButton, CreateButton } from '../../components/buttons';

/**
 *  Importing user defined modules.
 */
import { NovelAPI } from '../../utils/api';
import { convertGenre, capitalizeWord } from '../../utils/lib';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { NovelURLParams, ErrorResponse } from '../../typescript/api';

/**
 * Constants
 */
const contentTitle = <Typography.Title level={4}>Table of Contents</Typography.Title>;

function NovelDashboard() {
  const history = useHistory();
  const { nid } = useParams<NovelURLParams>();
  const { data, error, isLoading } = useQuery(['novel', nid], () => NovelAPI.get(nid), { retry: false });

  const err = error as ErrorResponse;
  const createChapterURL = `/workspace/${nid}/new-chapter`;
  const editButton = <EditButton key='edit' to={`/edit/${nid}`} />;
  const scrapeButton = <ScrapeButton key='scrape' disabled={!data?.webnovelBookId} />;
  const createButton = <CreateButton key='create' createURL={createChapterURL} hasVolume={data?.volumes ? true : false} />;

  return err?.code === 'NOVEL_NOT_FOUND' ? (
    <PageNotFound />
  ) : (
    <>
      <Card className='mx-4 mt-5 mb-4' loading={isLoading} bodyStyle={{ padding: 0 }} bordered>
        {data && (
          <PageHeader title={data.title} extra={[scrapeButton, editButton, createButton]} onBack={() => history.push('/workspace')}>
            <Descriptions className='mx-4 px-2'>
              <Descriptions.Item label='ID'>{data.nid}</Descriptions.Item>
              <Descriptions.Item label='Webnovel Book ID'>{capitalizeWord(data.webnovelBookId || '-')}</Descriptions.Item>
              <Descriptions.Item label='Origin'>{capitalizeWord(data.origin)}</Descriptions.Item>
              <Descriptions.Item label='Type'>{data.volumes ? 'Book' : 'Series'}</Descriptions.Item>
              <Descriptions.Item label='Genre'>{convertGenre(data.genre)}</Descriptions.Item>
              <Descriptions.Item label='Status'>{capitalizeWord(data.status)}</Descriptions.Item>
              <Descriptions.Item label='Chapter Count'>{data.chapterCount}</Descriptions.Item>
              <Descriptions.Item label='Views'>{data.views}</Descriptions.Item>
            </Descriptions>
          </PageHeader>
        )}
      </Card>
      <Card className='mx-4 mb-5' loading={isLoading} title={contentTitle}>
        {data?.chapters && <NovelVolume type='grid' nid={nid} chapters={data.chapters} volumes={data.volumes} />}
      </Card>
    </>
  );
}

export default NovelDashboard;
