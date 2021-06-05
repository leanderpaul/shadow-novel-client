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
import { Tags } from '../../typescript/api';
import { convertTag } from '../../utils/lib';

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
const tags = Object.keys(Tags);

function TagSelector<T extends SelectValue = SelectValue>(props: SelectProps<T>) {
  return (
    <Select {...props} mode='multiple'>
      {tags.map((tag) => (
        <Select.Option key={tag} value={tag}>
          {convertTag(tag)}
        </Select.Option>
      ))}
    </Select>
  );
}

export default TagSelector;
