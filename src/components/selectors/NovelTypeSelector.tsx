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

function NovelTypeSelector<T extends SelectValue = SelectValue>(props: SelectProps<T>) {
  return (
    <Select {...props}>
      <Select.Option value='book'>Book</Select.Option>
      <Select.Option value='series'>Series</Select.Option>
    </Select>
  );
}

export default NovelTypeSelector;
