/**
 * Importing npm packages.
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Card, Col, Skeleton, Tooltip, Typography } from 'antd';

/**
 * Importing user defined components.
 */
import NovelCover from '../novel-cover/NovelCover';

/**
 *  Importing user defined modules.
 */
import { convertGenre } from '../../utils/lib';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { NovelBrief } from '../../typescript/api';

interface VerticalNovelCardProps {
  loading: boolean;
  novel?: NovelBrief;
}

function VerticalNovelCard(props: VerticalNovelCardProps) {
  const { loading, novel } = props;
  const novelURL = `/novel/${novel?.nid}`;

  return (
    <Col span={3}>
      {loading ? (
        <div>
          <NovelCover hoverable={false} size='full' image={novel?.cover} />
          <Skeleton className='mt-3' title={false} paragraph={{ rows: 2 }} />
        </div>
      ) : (
        <div>
          <Link to={novelURL}>
            <NovelCover size='full' image={novel?.cover} />
          </Link>
          <Tooltip title={novel?.title} placement='bottom'>
            <Link to={novelURL}>
              <Typography.Title ellipsis className='mb-0 w-100 text-underline' level={5}>
                {novel?.title}
              </Typography.Title>
            </Link>
          </Tooltip>
          <Link to={`/novel?genre=${novel?.genre}`}>
            <Typography.Text className='text-underline' type='secondary'>
              {novel && convertGenre(novel?.genre)}
            </Typography.Text>
          </Link>
        </div>
      )}
    </Col>
  );
}

export default VerticalNovelCard;
