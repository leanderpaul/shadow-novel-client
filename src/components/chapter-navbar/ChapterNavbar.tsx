/**
 * Importing npm packages.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Button, Skeleton, Select, Modal, Row, Col, Typography, Form } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */
import { Container, LeftNavMenu, RightNavMenu, Title } from './styles';

/**
 * Importing types.
 */
import type { GetNovel, NovelChapter } from '../../typescript/api';

interface ChapterNavbarProps {
  novel?: Pick<GetNovel['response'], 'nid' | 'title' | 'chapters'>;
  chapter?: Pick<NovelChapter, 'cid' | 'index' | 'title'>;
  onFontSizeChange: (fontSize: number) => void;
  onWidthChange: (width: number) => void;
  metadata: { fontSize: number; width: number };
}

/**
 * Constants.
 */
const fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
const widthSizes = [700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500];

function ChapterNavbar(props: ChapterNavbarProps) {
  const [isSttingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => setIsSettingsOpen(!isSttingsOpen);
  const fontSizeOptions = fontSizes.map((fontSize) => (
    <Select.Option key={fontSize} value={fontSize}>
      {fontSize} px
    </Select.Option>
  ));
  const widthSizeOptions = widthSizes.map((widthSze) => (
    <Select.Option key={widthSze} value={widthSze}>
      {widthSze} px
    </Select.Option>
  ));
  const settingsTitle = (
    <Typography.Title className='mb-0' level={3}>
      Display Settings
    </Typography.Title>
  );
  const okButton = (
    <Button type='primary' onClick={toggleSettings}>
      Close
    </Button>
  );

  return (
    <Container>
      <Modal title={settingsTitle} visible={isSttingsOpen} onCancel={toggleSettings} footer={[okButton]} centered>
        <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} labelAlign='left'>
          <Form.Item label='Font Size'>
            <Select value={props.metadata.fontSize} onChange={props.onFontSizeChange}>
              {fontSizeOptions}
            </Select>
          </Form.Item>
          <Form.Item className='mb-0' label='Width Size'>
            <Select value={props.metadata.width} onChange={props.onWidthChange}>
              {widthSizeOptions}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <LeftNavMenu>
        {props.novel && props.chapter ? (
          <>
            <Link to={props.novel ? `/novel/${props.novel.nid}` : '#'}>
              <Title className='text-underline'>{props.novel?.title}</Title>
            </Link>
            <Title className='mx-2'>/</Title>
            <Title>
              Chapter {props.chapter?.index}: {props.chapter?.title}
            </Title>
          </>
        ) : (
          <Skeleton title={{ width: 800 }} active paragraph={false} />
        )}
      </LeftNavMenu>
      <RightNavMenu>
        <Button className='mr-3' shape='round' icon={<SettingOutlined />} onClick={toggleSettings}>
          Settings
        </Button>
        <Button type='primary' shape='round' icon={<PlusOutlined />}>
          Add to Library
        </Button>
      </RightNavMenu>
    </Container>
  );
}

export default ChapterNavbar;
