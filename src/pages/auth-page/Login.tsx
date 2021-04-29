/**
 * Importing components from npm packages.
 */
import React, { useContext } from 'react';
import { useMutation } from 'react-query';

/**
 * Importing npm design components.
 */
import { Form, Input, Button } from 'antd';

/**
 * Importing user defined components.
 */
import { AuthContext } from '../../utils/store';
import { AuthAPI } from '../../utils/api';

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */

/**
 * Declaring constants.
 */
const formFotterLayout = {
  wrapperCol: { offset: 18, span: 6 }
};

function Login() {
  const [_, setAuth] = useContext(AuthContext);
  const { isLoading, mutate } = useMutation(AuthAPI.login, { onSuccess: setAuth });

  return (
    <Form layout='vertical' onFinish={mutate} requiredMark={false}>
      <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username !' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password !' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item className='mb-0 mt-3' {...formFotterLayout}>
        <Button block loading={isLoading} type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
