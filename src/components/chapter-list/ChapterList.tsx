/**
 * Importing npm packages.
 */
import React from 'react';
import VList from 'rc-virtual-list';
import { useParams } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { List, Row, Col } from 'antd';

/**
 * Importing user defined components.
 */
import ChapterItem from './ChapterItem';

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { NovelChapter, NovelURLParams } from '../../typescript/api';

interface ChapterListProps {
  columns: '1' | '2';
  chapters: Pick<NovelChapter, 'cid' | 'title' | 'index' | 'createdAt'>[];
  isBrief?: boolean;
}

function ChapterList(props: ChapterListProps) {
  const { nid } = useParams<NovelURLParams>();

  const isAdmin = window.location.pathname.includes('workspace');

  if (props.columns === '1') {
    return (
      <List>
        <VList data={props.chapters} itemKey='cid'>
          {(chapter, index) => <ChapterItem isColored={index % 2 === 0} {...chapter} nid={nid} isAdmin={isAdmin} isBrief={props.isBrief} />}
        </VList>
      </List>
    );
  } else {
    const evenChapters = props.chapters.filter((_, index) => index % 2 === 0);
    const oddChapters = props.chapters.filter((_, index) => index % 2 === 1);
    const chapters = evenChapters.map((evenChapter, index) => ({ index, oddChapter: oddChapters[index], evenChapter }));
    return (
      <List>
        <VList data={chapters} itemKey='index'>
          {(chapterRow, index) => (
            <Row gutter={25}>
              <Col span={12}>
                <ChapterItem isColored={index % 2 === 0} {...chapterRow.evenChapter} nid={nid} isAdmin={isAdmin} />
              </Col>
              {chapterRow.oddChapter && (
                <Col span={12}>
                  <ChapterItem isColored={index % 2 === 1} {...chapterRow.oddChapter} nid={nid} isAdmin={isAdmin} />
                </Col>
              )}
            </Row>
          )}
        </VList>
      </List>
    );
  }
}

export default ChapterList;
