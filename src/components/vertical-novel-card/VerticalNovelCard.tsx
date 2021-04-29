/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */

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
import type { NovelBrief } from '../../typescript/api';

interface LoadingCard {
  loading: true;
  novel?: NovelBrief;
}

interface NovelCard {
  loading: false;
  novel: NovelBrief;
}

type VerticalNovelCardProps = LoadingCard | NovelCard;

function VerticalNovelCard(props: VerticalNovelCardProps) {
  return (
    <div>
      <h1>Card</h1>
    </div>
  );
}

VerticalNovelCard.defaultProps = {
  loading: false
};

export default VerticalNovelCard;
