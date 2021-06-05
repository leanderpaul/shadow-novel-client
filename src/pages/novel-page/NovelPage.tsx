/**
 * Importing npm packages.
 */
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

/**
 * Importing npm design components.
 */

/**
 * Importing user defined components.
 */
import PageNotFound from '../page-not-found/PageNotFound';
import NovelSummary from '../../components/novel-summary/NovelSummary';
import NovelDescription from '../../components/novel-description/NovelDescription';

/**
 *  Importing user defined modules.
 */
import { NovelAPI } from '../../utils/api';

/**
 * Importing styled components.
 */
import { BackgroundImage, Container } from './styles';

/**
 * Importing types.
 */
import type { NovelURLParams, ErrorResponse } from '../../typescript/api';

function NovelPage() {
  const { nid } = useParams<NovelURLParams>();
  const { data, error, isLoading } = useQuery(['novel', nid], () => NovelAPI.get(nid), { retry: false });
  const err = error as ErrorResponse;

  return err?.code === 'NOVEL_NOT_FOUND' ? (
    <PageNotFound />
  ) : (
    <Container>
      <BackgroundImage cover={data?.cover} />
      <NovelSummary loading={isLoading} novel={data} />
      <NovelDescription loading={isLoading} novel={data} />
    </Container>
  );
}

export default NovelPage;
