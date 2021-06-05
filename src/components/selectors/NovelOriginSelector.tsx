/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Select } from 'antd';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */
import { NovelOrigin } from '../../typescript/api';
import { capitalizeWord } from '../../utils/lib';

/**
 * Importing styled components.
 */

/**
 * Importing types.
 */
import type { SelectProps, SelectValue } from 'antd/lib/select';

/**
 * Constants.
 */
const novelOrigins = Object.keys(NovelOrigin);

function NovelOriginSelector<T extends SelectValue = SelectValue>(props: SelectProps<T>) {
  return (
    <Select {...props}>
      {novelOrigins.map((origin) => (
        <Select.Option key={origin} value={origin}>
          {capitalizeWord(origin)}
        </Select.Option>
      ))}
    </Select>
  );
}

export default NovelOriginSelector;
