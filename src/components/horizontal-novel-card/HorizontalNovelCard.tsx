/**
 * Importing npm packages.
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Col, Card, Typography, Button } from 'antd';

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
import { CardSkeleton } from './styles';

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

  return (
    <Col span={12}>
      <Link to={`/novel/${novel?.nid || '#'}`}>
        <Card hoverable bodyStyle={{ padding: 0, display: 'flex', overflow: 'hidden' }}>
          <NovelCover style={{ flexShrink: 0 }} loading={loading} size='sm' className='mr-3' image={novel?.cover} alt={novel?.title} />
          {props.loading ? (
            <CardSkeleton active={true} paragraph={{ rows: 4 }} />
          ) : (
            <div className='text-justify overflow-hidden'>
              <Typography.Title className='w-100' level={4} ellipsis>
                {novel?.title}
              </Typography.Title>
              <Link to={`/novel?genre=${novel?.genre}`}>
                <Button type='primary' ghost shape='round' size='small'>
                  {convertGenre(novel!.genre)}
                </Button>
              </Link>
              <Typography.Paragraph className='my-1 pt-1 mr-3' ellipsis={{ rows: 5 }}>
                {novel?.desc.map((block) => block.text).join('\n')}
              </Typography.Paragraph>
            </div>
          )}
        </Card>
      </Link>
    </Col>
  );
}

HorizontalNovelCard.defaultProps = {
  loading: false
};

export default HorizontalNovelCard;
