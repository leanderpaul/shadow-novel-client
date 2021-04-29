/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Form, Card, Typography, Row, Col, Input, Select, Button } from 'antd';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

/**
 * Importing user defined components.
 */
import NovelCover from '../../components/novel-cover/NovelCover';

/**
 *  Importing user defined modules.
 */
import { suneditorOptions, useNovelForm } from './utils';
import { Genres, Tags, NovelStatus } from '../../typescript/api';
import { convertGenre, convertTag } from '../../utils/lib';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */

/**
 * Constants.
 */
const genreOptions = Object.keys(Genres).map((genre) => <Select.Option value={genre}>{convertGenre(genre)}</Select.Option>);
const tagOptions = Object.keys(Tags).map((tag) => <Select.Option value={tag}>{convertTag(tag)}</Select.Option>);

function NovelForm() {
  const { isLoading, isMutating, handleSubmit, handleCoverChange, form, editorRef, novelCover } = useNovelForm();

  const title = <Typography.Title level={3}>Novel Information</Typography.Title>;

  return (
    <div className='my-5 mx-5'>
      <Card title={title} loading={isLoading}>
        <Row className='px-2'>
          <Col span={18} className='pr-4'>
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} size='large' labelAlign='left' requiredMark={false}>
              <Form.Item name='title' label='Title' hasFeedback rules={[{ required: true, message: 'Please enter a novel title !' }]}>
                <Input />
              </Form.Item>
              <Form.Item label='Genre' name='genre' hasFeedback rules={[{ required: true, message: 'Please select a genre !' }]}>
                <Select>{genreOptions}</Select>
              </Form.Item>
              <Form.Item label='Tags' name='tags' hasFeedback rules={[{ required: true, message: 'Please select a tags !' }]}>
                <Select mode='multiple'>{tagOptions}</Select>
              </Form.Item>
              <Form.Item label='Status' name='status' hasFeedback rules={[{ required: true, message: 'Please select a status !' }]}>
                <Select>
                  <Select.Option value={NovelStatus.ONGOING}>Ongoing</Select.Option>
                  <Select.Option value={NovelStatus.COMPLETED}>Completed</Select.Option>
                </Select>
              </Form.Item>
            </Form>
            <SunEditor ref={editorRef} lang='en' height='185' setOptions={suneditorOptions} placeholder='Novel description' />
          </Col>
          <Col span={6}>
            <input type='file' id='novel-cover' hidden onChange={handleCoverChange} />
            <label htmlFor='novel-cover' className='pointer'>
              <NovelCover image={novelCover} size='full' />
            </label>
          </Col>
        </Row>
        <div className='text-right pr-2 mt-4'>
          <Button loading={isMutating} style={{ width: 200 }} size='large' type='primary' onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default NovelForm;
