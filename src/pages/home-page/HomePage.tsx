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
import LatestUpdates from '../../containers/latest-updates/LatestUpdates';
import NovelGallery from '../../containers/novel-gallery/NovelGallery';

/**
 *  Importing user defined modules.
 */
import { Genres } from '../../typescript/api';

/**
 * Importing styled components.
 */
import { Container } from './styles';

/**
 * Importing types.
 */

function HomePage() {
  return (
    <Container>
      <NovelGallery title='Hot Novel' query={{ sortOrder: 'desc', sortField: 'views' }} />
      <NovelGallery title='Contemporary Romance' query={{ genre: Genres.CONTEMPORARY_ROMANCE, sortOrder: 'desc', sortField: 'views' }} />
      <NovelGallery title='Fantasy' query={{ genre: Genres.FANTASY, sortOrder: 'desc', sortField: 'views' }} />
      <NovelGallery title='Fantasy Romance' query={{ genre: Genres.FANTASY_ROMANCE, sortOrder: 'desc', sortField: 'views' }} />
      <NovelGallery title='Magical Realism' query={{ genre: Genres.MAGICAL_REALISM, sortOrder: 'desc', sortField: 'views' }} />
      <NovelGallery title='Science Fiction' query={{ genre: Genres.SCI_FI, sortOrder: 'desc', sortField: 'views' }} />
      <NovelGallery title='Xianxia' query={{ genre: Genres.XIANXIA, sortOrder: 'desc', sortField: 'views' }} />
      <LatestUpdates />
    </Container>
  );
}

export default HomePage;
