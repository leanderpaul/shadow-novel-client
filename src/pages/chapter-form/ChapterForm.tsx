/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Form, Card, Typography, Input, Switch, Button, Select } from 'antd';
import SunEditor from 'suneditor-react';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { useChapterForm, suneditorOptions } from './utils';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */

function ChapterForm() {
  const { form, handleSubmit, isLoading, isMutating, submitText, titleText, volumes } = useChapterForm();

  const title = <Typography.Title level={3}>{titleText}</Typography.Title>;

  return (
    <div className='my-5 mx-5'>
      <Card title={title} loading={isLoading}>
        <Form form={form} labelCol={{ span: 3 }} size='large' labelAlign='left' requiredMark={false} onFinish={handleSubmit}>
          {volumes && (
            <Form.Item name='vid' label='Volume' hasFeedback rules={[{ required: true, message: 'Please enter a volume !' }]}>
              <Select>
                {volumes.map((volume, index) => (
                  <Select.Option value={volume.vid}>{`Volume ${index}: ${volume.name || ''}`}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item name='title' label='Title' hasFeedback rules={[{ required: true, message: 'Please enter the chapter title !' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='matureContent' label='Mature Content' valuePropName='checked'>
            <Switch />
          </Form.Item>
          <Form.Item label='Content' style={{ marginBottom: 0 }}>
            <SunEditor
              lang='en'
              setOptions={suneditorOptions}
              height='400'
              placeholder='Content'
              setContents={form.getFieldValue('content')}
              onChange={(value) => form.setFieldsValue({ content: value })}
            />
          </Form.Item>
          <div className='text-right pr-2 mt-4'>
            <Button htmlType='submit' loading={isMutating} style={{ width: 200 }} size='large' type='primary'>
              {submitText}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default ChapterForm;
