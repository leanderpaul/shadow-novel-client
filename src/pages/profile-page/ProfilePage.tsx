/**
 * Importing npm packages.
 */
import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';

/**
 * Importing npm design components.
 */
import { Button, Card, Form, Input, Typography } from 'antd';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { ProfileAPI } from '../../utils/api';
import { AuthContext } from '../../utils/store';

/**
 * Importing styled components.
 */
import { Continer } from './styles';

/**
 * Importing types.
 */

const title = (
  <Typography.Title className='mb-0' level={4}>
    Profile Settings
  </Typography.Title>
);

function ProfilePage() {
  const [auth, setAuth] = useContext(AuthContext);
  const [form] = Form.useForm();
  const { isLoading, mutate } = useMutation(ProfileAPI.update, { onSuccess: (user) => setAuth({ user }) });

  useEffect(() => {
    form.setFieldsValue(auth.user);
  }, [auth]);

  return (
    <Continer>
      <Card title={title}>
        <Form form={form} labelCol={{ span: 6 }} labelAlign='left' size='large'>
          <Form.Item name='username' label='Username'>
            <Input />
          </Form.Item>
          <Form.Item name='firstName' label='First Name'>
            <Input />
          </Form.Item>
          <Form.Item name='lastName' label='Last Name'>
            <Input />
          </Form.Item>
          <Form.Item name='webnovelCookie' label='Webnovel Cookie'>
            <Input />
          </Form.Item>
          <Form.Item label='Password'>
            <Button size='small'>Update</Button>
            {/* <Input type='password' value='User Password' readOnly suffix={passwordUpdateButton} /> */}
          </Form.Item>
          <div className='w-100 d-flex justify-content-center'>
            <Button type='primary' loading={isLoading} onClick={() => mutate(form.getFieldsValue())}>
              Save Changes
            </Button>
          </div>
        </Form>
      </Card>
    </Continer>
  );
}

export default ProfilePage;
