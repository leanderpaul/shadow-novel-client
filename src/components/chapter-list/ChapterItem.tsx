/**
 * Importing npm packages.
 */
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Importing npm design components.
 */
import { List, Popconfirm, Typography, Modal } from 'antd';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { ChapterAPI } from '../../utils/api';

/**
 * Importing styled components.
 */
import { DeleteIcon, Container } from './styles';

/**
 * Importing types.
 */
import type { NovelChapter } from '../../typescript/api';
import { WarningOutlined } from '@ant-design/icons';

interface ChapterItemProps extends Pick<NovelChapter, 'cid' | 'title' | 'index' | 'createdAt'> {
  isAdmin: boolean;
  nid: string;
  isColored: boolean;
  isBrief?: boolean;
}

function ChapterItem(props: ChapterItemProps, ref: any) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(ChapterAPI.delete, { onSuccess: () => queryClient.invalidateQueries(['novel', props.nid]) });

  const confirmModel = () =>
    Modal.confirm({
      title: 'Are you sure you want to delete this chapter ?',
      onOk: () => mutate({ nid: props.nid, cid: props.cid }),
      centered: true,
      okButtonProps: { danger: true },
      okText: 'Yes',
      cancelText: 'No',
      icon: <WarningOutlined style={{ color: 'red', fontSize: 30 }} />,
      width: 435
    });

  const chapterLink = `/${props.isAdmin ? 'edit' : 'novel'}/${props.nid}/${props.cid}`;
  const deleteAction = props.isAdmin && <DeleteIcon onClick={confirmModel} />;

  return props.isAdmin ? (
    <Container isColored={props.isColored} ref={ref}>
      <List.Item actions={deleteAction ? [deleteAction] : []}>
        <List.Item.Meta
          avatar={<div className='mr-3 text-size'>{props.index}</div>}
          title={
            <Link to={chapterLink}>
              <Typography.Paragraph ellipsis style={props.isBrief ? { marginBottom: 0 } : undefined}>
                {props.title}
              </Typography.Paragraph>
            </Link>
          }
          description={!props.isBrief && moment(props.createdAt).format('llll')}
        />
      </List.Item>
    </Container>
  ) : (
    <Link to={chapterLink}>
      <Container isColored={props.isColored} ref={ref}>
        <List.Item actions={deleteAction ? [deleteAction] : []}>
          <List.Item.Meta
            avatar={<div className='mr-3 text-size'>{props.index}</div>}
            title={
              <Typography.Paragraph ellipsis style={props.isBrief ? { marginBottom: 0 } : undefined}>
                {props.title}
              </Typography.Paragraph>
            }
            description={!props.isBrief && moment(props.createdAt).format('llll')}
          />
        </List.Item>
      </Container>
    </Link>
  );
}

export default React.forwardRef(ChapterItem);
