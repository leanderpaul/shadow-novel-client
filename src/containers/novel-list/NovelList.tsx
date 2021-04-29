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
import HorizontalNovelCard from '../../components/horizontal-novel-card/HorizontalNovelCard';
import VerticalNovelCard from '../../components/vertical-novel-card/VerticalNovelCard';

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
}

function NovelList(props: NovelListProps) {
  const { novels, loading, type } = props;
  const Card = type === 'horizontal' ? HorizontalNovelCard : VerticalNovelCard;
  const novelList = novels.map((novel) => <Card novel={novel} />);
  const loadingList = Array(20).fill(<Card loading={true} />);

  return <Row gutter={type === 'horizontal' ? [20, 20] : 24}>{loading ? loadingList : novels.length > 0 ? novelList : <Empty className='w-100 my-5' />}</Row>;
}

export default NovelList;
