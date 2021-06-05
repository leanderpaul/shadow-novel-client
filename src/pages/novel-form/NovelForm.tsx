/**
 * Importing npm packages.
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Form, Card, Typography, Row, Col, Input, Button } from 'antd';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

/**
 * Importing user defined components.
 */
import NovelCover from '../../components/novel-cover/NovelCover';
import Selector from '../../components/selectors';

/**
 *  Importing user defined modules.
 */
import { suneditorOptions, useNovelForm } from './utils';

/**
 * Importing styled components.
 */
import { Container } from './styles';

/**
 * Importing types.
 */

/**
 * Constants.
 */

function NovelForm() {
  const { isLoading, isMutating, handleSubmit, handleCoverChange, form, novelCover, novelDesc, setNovelDesc, submitText, history, nid } = useNovelForm();

  const title = <Typography.Title level={3}>Novel Information</Typography.Title>;
  const cancelLink = submitText === 'Create' ? '/workspace' : `/workspace/${nid}`;

  return (
    <Container>
      <Card title={title} loading={isLoading}>
        <Form form={form} size='large' labelAlign='left' requiredMark={false}>
          <Row gutter={[20, 25]} className='px-2'>
            <Col span={18} className='pr-4 form-items'>
              <Form.Item label='Title' name='title' hasFeedback rules={[{ required: true, message: 'Please enter a title !' }]}>
                <Input />
              </Form.Item>
              {submitText === 'Create' && (
                <Form.Item label='Type' name='type' hasFeedback rules={[{ required: true, message: 'Please select an type !' }]}>
                  <Selector.NovelType />
                </Form.Item>
              )}
              <Form.Item label='Origin' name='origin' hasFeedback rules={[{ required: true, message: 'Please select an origin !' }]}>
                <Selector.NovelOrigin />
              </Form.Item>
              <Form.Item label='Genre' name='genre' hasFeedback rules={[{ required: true, message: 'Please select a genre !' }]}>
                <Selector.Genre />
              </Form.Item>
              <Form.Item label='Status' name='status' hasFeedback rules={[{ required: true, message: 'Please select a status !' }]}>
                <Selector.NovelStatus />
              </Form.Item>
              <Form.Item name='webnovelBookId' label='Webnovel Book ID' hasFeedback>
                <Input />
              </Form.Item>
              <Form.Item label='Tags' name='tags' hasFeedback rules={[{ required: true, message: 'Please select a tags !' }]}>
                <Selector.Tag />
              </Form.Item>
            </Col>
            <Col span={6}>
              <input type='file' id='novel-cover' hidden onChange={handleCoverChange} />
              <label htmlFor='novel-cover' className='pointer'>
                <NovelCover image={novelCover} size='full' hoverable={false} />
              </label>
            </Col>
            <Col span={24}>
              <Form.Item label='Synopsis' style={{ marginBottom: 0 }}>
                <SunEditor lang='en' setOptions={suneditorOptions} height='250' setContents={novelDesc} onChange={setNovelDesc} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className='text-right pr-2 mt-4'>
          <Button className='mr-4' size='large' danger style={{ width: 200 }} onClick={() => history.push(cancelLink)}>
            Cancel
          </Button>
          <Button loading={isMutating} style={{ width: 200 }} size='large' type='primary' onClick={handleSubmit}>
            {submitText}
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default NovelForm;
