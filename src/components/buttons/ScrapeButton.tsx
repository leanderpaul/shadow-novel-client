/**
 * Importing npm packages.
 */
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

/**
 * Importing npm design components.
 */
import { Button, Tooltip, Modal, Typography, Form, Input, Progress } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { AuthContext } from '../../utils/store';
import { ScraperAPI } from '../../utils/api';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import { NovelURLParams } from '../../typescript/api';

interface ScrapeButtonProps {
  disabled?: boolean;
}

const title = (
  <Typography.Title className='mb-0' level={3}>
    Novel Scraper
  </Typography.Title>
);

function ScrapeButton(props: ScrapeButtonProps) {
  const [form] = Form.useForm();
  const [auth] = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { nid } = useParams<NovelURLParams>();

  const queryClient = useQueryClient();
  const { data } = useQuery(['scraper-status', nid], () => ScraperAPI.status(nid), { refetchInterval: 1000 });
  const { mutate: startScraping, isLoading: isStarting } = useMutation(ScraperAPI.start, { onSuccess: () => queryClient.refetchQueries(['scraper-status', nid]) });
  const { mutate: stopScraping, isLoading: isStopping } = useMutation(ScraperAPI.stop, { onSuccess: () => queryClient.refetchQueries(['scraper-status', nid]) });

  const toggleModal = () => setIsOpen(!isOpen);
  const handleStartScrape = () => startScraping({ nid, startURL: form.getFieldValue('startURL') });
  const handleStopScraping = () => stopScraping(nid);

  return (
    <>
      <Modal
        centered
        width={600}
        title={title}
        visible={isOpen}
        onCancel={toggleModal}
        okText={data ? 'Stop' : 'Start'}
        confirmLoading={isStarting || isStopping}
        okButtonProps={{ danger: data ? true : false }}
        onOk={data ? handleStopScraping : handleStartScrape}
      >
        {data ? (
          <>
            <Progress percent={data.chapterCount / data.totalChapters} status='active' showInfo={false} />
            <Typography.Title level={5} className='text-center mt-3'>
              {data.chapterCount} of {data.totalChapters} chapters scraped
            </Typography.Title>
          </>
        ) : (
          <Form form={form}>
            <Form.Item name='startURL' label='Novel Chapter URL'>
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
      {auth.user?.webnovelCookie ? (
        <Button size='large' disabled={props.disabled} onClick={toggleModal} icon={<CloudDownloadOutlined />}>
          Scrape Chapters
        </Button>
      ) : (
        <Tooltip title='Set Webnovel cookie in profile to scraper chapters' placement='bottom'>
          <Button size='large' disabled={true} onClick={toggleModal} icon={<CloudDownloadOutlined />}>
            Scrape Chapters
          </Button>
        </Tooltip>
      )}
    </>
  );
}

export default ScrapeButton;
