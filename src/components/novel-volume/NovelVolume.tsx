/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Empty, Collapse } from 'antd';

/**
 * Importing user defined components.
 */
import ChapterList from '../chapter-list/ChapterList';
import { CreateButton } from '../buttons';

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { GetNovel } from '../../typescript/api';

interface NovelVolumeProps {
  type: 'grid' | 'list';
  chapters: GetNovel['response']['chapters'];
  volumes?: GetNovel['response']['volumes'];
  className?: string;
  reverse?: boolean;
  nid?: string;
  isBrief?: boolean;
  onClick?: () => void;
}

function NovelVolume(props: NovelVolumeProps) {
  const chapters = [...props.chapters];
  if (props.reverse) chapters.reverse();

  if (props.volumes) {
    const volumes = props.volumes;
    const volumeList = volumes.map((volume) => ({ ...volume, chapters: [...chapters.splice(0, volume.chapterCount)] }));

    return (
      <div className={props.className}>
        <Collapse defaultActiveKey={['0']}>
          {volumeList.map((volume, index) => (
            <Collapse.Panel header={`Volume ${index + 1}: ${volume.name || ''}`} key={index}>
              {volume.chapterCount > 0 ? (
                <ChapterList columns={props.type === 'grid' ? '2' : '1'} chapters={volume.chapters} isBrief={props.isBrief} />
              ) : (
                <Empty description='No Chapters'>{props.nid && <CreateButton createURL={`/workspace/${props.nid}/new-chapter`} />}</Empty>
              )}
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    );
  } else {
    return chapters.length > 0 ? (
      <div className={props.className} onClick={props.onClick}>
        <ChapterList columns={props.type === 'grid' ? '2' : '1'} chapters={chapters} isBrief={props.isBrief} />
      </div>
    ) : (
      <Empty description='No Chapters'>{props.nid && <CreateButton createURL={`/workspace/${props.nid}/new-chapter`} />}</Empty>
    );
  }
}

export default NovelVolume;
