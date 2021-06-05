import GenreSelector from './GenreSelector';
import NovelOriginSelector from './NovelOriginSelector';
import NovelStatusSelector from './NovelStatusSelector';
import NovelTypeSelector from './NovelTypeSelector';
import TagSelector from './TagSelectors';

const Selector = {
  Genre: GenreSelector,
  Tag: TagSelector,
  NovelOrigin: NovelOriginSelector,
  NovelStatus: NovelStatusSelector,
  NovelType: NovelTypeSelector
};

export { GenreSelector, TagSelector, NovelOriginSelector, NovelStatusSelector, NovelTypeSelector };
export default Selector;
