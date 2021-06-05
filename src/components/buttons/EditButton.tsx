/**
 * Importing npm packages.
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Importing npm design components.
 */
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

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
interface EditButtonProps {
  to: string;
}

function EditButton(props: EditButtonProps) {
  return (
    <Link to={props.to}>
      <Button size='large' icon={<EditOutlined />}>
        Edit Novel
      </Button>
    </Link>
  );
}

export default EditButton;
