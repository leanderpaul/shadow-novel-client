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
import type { NovelURLParams } from '../../typescript/api';

function NovelPage() {
  const { nid } = useParams<NovelURLParams>();
  const { data, error, isFetching } = useQuery(['novel', nid], () => NovelAPI.get(nid), { retry: false });

  return (
    <div>
      <h1>Novel Page: </h1>
      <h2>Is Fetcing: {isFetching}</h2>
      <div>Data: {JSON.stringify({ ...data, cover: null })}</div>
      <div>Error: {JSON.stringify(error)}</div>
    </div>
  );
}

export default NovelPage;
