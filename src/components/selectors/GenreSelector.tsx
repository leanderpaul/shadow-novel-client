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
import { Genres } from '../../typescript/api';
import { convertGenre } from '../../utils/lib';

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
const genres = Object.keys(Genres);

function GenreSelector<T extends SelectValue = SelectValue>(props: SelectProps<T>) {
  return (
    <Select {...props}>
      {genres.map((genre) => (
        <Select.Option key={genre} value={genre}>
          {convertGenre(genre)}
        </Select.Option>
      ))}
    </Select>
  );
}

export default GenreSelector;
