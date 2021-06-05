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
import { NovelStatus } from '../../typescript/api';
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
const novelStatus = Object.keys(NovelStatus);

function NovelStatusSelector<T extends SelectValue = SelectValue>(props: SelectProps<T>) {
  return (
    <Select {...props}>
      {novelStatus.map((status) => (
        <Select.Option key={status} value={status}>
          {capitalizeWord(status)}
        </Select.Option>
      ))}
    </Select>
  );
}

export default NovelStatusSelector;
