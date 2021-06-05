/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Empty, Row } from 'antd';

/**
 * Importing user defined components.
 */
import HorizontalNovelCard from '../horizontal-novel-card/HorizontalNovelCard';
import VerticalNovelCard from '../vertical-novel-card/VerticalNovelCard';

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { NovelBrief } from '../../typescript/api';

export interface NovelListProps {
  type: 'horizontal' | 'vertical';
  loading: boolean;
  novels: NovelBrief[];
  className?: string;
  placeholder: number;
}

const getEmptyArray = (size: number) => Array(size).fill(0);

function NovelList(props: NovelListProps) {
  const { novels, loading, type } = props;
  const Card = type === 'horizontal' ? HorizontalNovelCard : VerticalNovelCard;
  const novelList = novels.map((novel) => <Card key={novel.nid} novel={novel} />);
  const loadingList = getEmptyArray(props.placeholder).map((_, index) => <Card key={index} loading />);

  return (
    <Row className={props.className} gutter={type === 'horizontal' ? [20, 20] : 24}>
      {loading ? loadingList : novels.length > 0 ? novelList : <Empty className='w-100 my-5' />}
    </Row>
  );
}

NovelList.defaultProps = {
  placeholder: 20
};

export default NovelList;
