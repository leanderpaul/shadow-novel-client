/**
 * Importing npm packages.
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Button, Dropdown, Menu } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
interface CreateButtonProps {
  createURL: string;
  hasVolume?: boolean;
}

function CreateButton(props: CreateButtonProps) {
  return props.hasVolume ? (
    <Dropdown.Button
      type='primary'
      size='large'
      icon={<DownOutlined />}
      overlay={
        <Menu style={{ width: 170 }}>
          <Menu.Item key='volume'>Volume</Menu.Item>
          <Menu.Item key='chapter'>
            <Link to={props.createURL}>Chapter</Link>
          </Menu.Item>
        </Menu>
      }
    >
      <span style={{ width: 100 }}>Create</span>
    </Dropdown.Button>
  ) : (
    <Link to={props.createURL}>
      <Button size='large' icon={<PlusOutlined />} type='primary'>
        Create Chapter
      </Button>
    </Link>
  );
}

export default CreateButton;
