/**
 * Importing npm packages.
 */
import React, { useContext } from 'react';

/**
 * Importing npm design components.
 */
import { Form, Input, Modal, Select, Typography } from 'antd';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { serverURL, setServerURL, ThemeContext } from '../../utils/store';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const title = (
  <Typography.Title className='mb-0' level={3}>
    Settings
  </Typography.Title>
);

function Settings(props: SettingsProps) {
  const [theme, setTheme] = useContext(ThemeContext);
  const [form] = Form.useForm();

  async function handleSubmit() {
    const serverURL = form.getFieldValue('serverURL');
    setServerURL(serverURL);
    const newTheme = form.getFieldValue('theme');
    if (theme != newTheme) setTheme(newTheme);
    props.onClose();
  }

  return (
    <Modal title={title} visible={props.isOpen} onCancel={props.onClose} onOk={handleSubmit} okText='Save' centered>
      <Form form={form} labelCol={{ span: 7 }} labelAlign='left' initialValues={{ serverURL, theme }}>
        <Form.Item name='serverURL' label='Server Address'>
          <Input value={serverURL} placeholder='example: 192.168.23.42 or http://shadow-novel.com' />
        </Form.Item>
        <Form.Item className='mb-0' name='theme' label='Theme'>
          <Select placeholder='Select a theme'>
            <Select.Option value='dark'>Dark</Select.Option>
            <Select.Option value='light'>Light</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Settings;
