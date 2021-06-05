/**
 * Importing npm packages.
 */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

/**
 * Importing npm design components.
 */
import { Button, Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

/**
 * Importing user defined components.
 */
import NovelList from '../../components/novel-list/NovelList';

/**
 *  Importing user defined modules.
 */
import { NovelAPI } from '../../utils/api';
import { AuthContext } from '../../utils/store';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
const createNovel = (
  <Link to='/workspace/new-novel'>
    <Button type='primary' size='large' icon={<PlusOutlined />}>
      Create Novel
    </Button>
  </Link>
);

function Workspace() {
  const [auth] = useContext(AuthContext);
  const { data, isLoading } = useQuery('workspace-novels', () => NovelAPI.list({ uid: auth.user?.uid }));

  const novels = data?.items || [];
  const title = <Typography.Title level={2}>Workspace</Typography.Title>;

  return (
    <Card title={title} extra={createNovel} className='mb-5 mt-4 mx-4'>
      <NovelList loading={isLoading} type='horizontal' novels={novels} />
    </Card>
  );
}

export default Workspace;
