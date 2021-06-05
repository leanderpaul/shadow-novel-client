/**
 * Importing npm packages.
 */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Button, Modal, Typography } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, UnorderedListOutlined } from '@ant-design/icons';

/**
 * Importing user defined components.
 */
import NovelVolume from '../novel-volume/NovelVolume';

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */
import { ActionList, TOCContainer } from './styles';

/**
 * Importing types.
 */
import type { GetNovel, GetChapter } from '../../typescript/api';

interface ChapterActionsProps {
  novel?: GetNovel['response'];
  chapter?: GetChapter['response'];
  children?: JSX.Element | JSX.Element[];
}

type EventHandler = (event: KeyboardEvent) => void;

function ChapterContainer(props: ChapterActionsProps) {
  const history = useHistory();
  const { novel, chapter } = props;
  const [isTOCVisible, setIsTOCVisible] = useState(false);
  const eventHandler = React.useRef<EventHandler>((e) => console.log(e));

  const prevChapter = novel?.chapters[(chapter?.index || 1) - 2];
  const nextChapter = novel?.chapters[chapter?.index || 0];
  const hasPrevChapter = prevChapter ? true : false;
  const hasNextChapter = nextChapter ? true : false;
  const prevChapterLink = prevChapter ? `/novel/${novel?.nid}/${prevChapter.cid}` : '#';
  const nextChapterLink = nextChapter ? `/novel/${novel?.nid}/${nextChapter.cid}` : '#';
  const toggleTOC = () => setIsTOCVisible(!isTOCVisible);

  useEffect(() => {
    const eventListener: EventHandler = (event) => eventHandler.current(event);
    window.addEventListener('keydown', eventListener);
    return () => window.removeEventListener('keydown', eventListener);
  }, []);

  useEffect(() => {
    eventHandler.current = function (event) {
      if (event.key === 'ArrowLeft' && hasPrevChapter) history.push(prevChapterLink);
      if (event.key === 'ArrowRight' && hasNextChapter) history.push(nextChapterLink);
    };
  }, [novel, chapter]);

  const tocTitle = (
    <Typography.Title className='mb-0' level={4}>
      Table of Contents
    </Typography.Title>
  );
  const actionList = (
    <ActionList>
      <Link to={prevChapterLink}>
        <Button disabled={!hasPrevChapter} type='primary' size='large' icon={<DoubleLeftOutlined />}>
          Previous Chapter
        </Button>
      </Link>
      <Button type='primary' size='large' icon={<UnorderedListOutlined />} onClick={toggleTOC}>
        Table of Contents
      </Button>
      <Link to={nextChapterLink}>
        <Button disabled={!hasNextChapter} type='primary' size='large'>
          Next Chapter
          <DoubleRightOutlined />
        </Button>
      </Link>
    </ActionList>
  );

  return (
    <div className='chapter-container'>
      <Modal className='mt-5' title={tocTitle} visible={isTOCVisible} footer={null} centered onCancel={toggleTOC}>
        <TOCContainer>
          <NovelVolume type='list' chapters={novel?.chapters || []} nid={novel?.nid} isBrief onClick={toggleTOC} />
        </TOCContainer>
      </Modal>
      {actionList}
      {props.children}
      {actionList}
    </div>
  );
}

export default ChapterContainer;
