/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

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

function PageNotFound() {
  const GoHome = (
    <Link to='/'>
      <Button type='primary'>Back to Home</Button>
    </Link>
  );
  return (
    <div className='d-flex justify-content-center align-items center'>
      <Result status='404' title='404' subTitle='Sorry, the page you have requested for does not exist !' extra={GoHome} />
    </div>
  );
}

export default PageNotFound;
