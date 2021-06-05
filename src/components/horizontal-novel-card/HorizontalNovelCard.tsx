/**
 * Importing npm packages.
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Col, Card, Typography, Button, Tooltip } from 'antd';

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
import { CardSkeleton, NovelTitle } from './styles';

/**
 * Importing types.
 */
import type { NovelBrief } from '../../typescript/api';

interface LoadingCard {
  loading: true;
  novel?: NovelBrief;
}

interface NovelCard {
  loading: false;
  novel: NovelBrief;
}

type HorizontalNovelCardProps = LoadingCard | NovelCard;

function HorizontalNovelCard(props: HorizontalNovelCardProps) {
  const { loading, novel } = props;
  const prefixURL = window.location.pathname.includes('workspace') ? 'workspace' : 'novel';
  const novelURL = `/${prefixURL}/${novel?.nid || ''}`;

  return (
    <Col span={12}>
      <Card bodyStyle={{ padding: 0, display: 'flex', overflow: 'hidden' }}>
        <Link to={novelURL}>
          <NovelCover style={{ flexShrink: 0 }} loading={loading} size='sm' className='mr-3' image={novel?.cover} alt={novel?.title} />
        </Link>
        {props.loading ? (
          <CardSkeleton active={true} paragraph={{ rows: 4 }} />
        ) : (
          <div className='text-justify overflow-hidden py-2 novel-desc'>
            <Link to={novelURL}>
              <NovelTitle level={4} ellipsis>
                {novel?.title}
              </NovelTitle>
            </Link>
            <Link to={`/novel?genre=${novel?.genre}`}>
              <Button type='primary' ghost shape='round' size='small'>
                {convertGenre(novel!.genre)}
              </Button>
            </Link>
            <Typography.Paragraph className='my-1 pt-2 mr-3' ellipsis={{ rows: 4 }}>
              {novel?.desc.map((block) => block.text)}
            </Typography.Paragraph>
          </div>
        )}
      </Card>
    </Col>
  );
}

HorizontalNovelCard.defaultProps = {
  loading: false
};

export default HorizontalNovelCard;
