/**
 * Object models.
 */
export interface User {
  uid: string;
  username: string;
  firstName?: string;
  lastName?: string;
  password: string;
  library: string[];
  webnovelCookie?: string;
}

export enum NovelStatus {
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING'
}

export enum Genres {
  CONTEMPORARY_ROMANCE = 'CONTEMPORARY_ROMANCE',
  FANTASY = 'FANTASY',
  FANTASY_ROMANCE = 'FANTASY_ROMANCE',
  MAGICAL_REALISM = 'MAGICAL_REALISM',
  SCI_FI = 'SCI_FI',
  XIANXIA = 'XIANXIA'
}

export enum Tags {
  ACTION = 'ACTION',
  ADULT = 'ADULT',
  ADVENTURE = 'ADVENTURE',
  COMEDY = 'COMEDY',
  DRAMA = 'DRAMA',
  ECCHI = 'ECCHI',
  FANTASY = 'FANTASY',
  FEMALE_PROTAGONIST = 'FEMALE_PROTAGONIST',
  GENDER_BENDER = 'GENDER_BENDER',
  HAREM = 'HAREM',
  HISTORICAL = 'HISTORICAL',
  HORROR = 'HORROR',
  JOSEI = 'JOSEI',
  MALE_PROTAGONIST = 'MALE_PROTAGONIST',
  MARTIAL_ARTS = 'MARTIAL_ARTS',
  MATURE = 'MATURE',
  MECHA = 'MECHA',
  MYSTERY = 'MYSTERY',
  PSYCHOLOGICAL = 'PSYCHOLOGICAL',
  ROMANCE = 'ROMANCE',
  R_18 = 'R_18',
  SCHOOL_LIFE = 'SCHOOL_LIFE',
  SCI_FI = 'SCI_FI',
  SEINEN = 'SEINEN',
  SHOUJO = 'SHOUJO',
  SHOUJO_AI = 'SHOUJO_AI',
  SHOUNEN = 'SHOUNEN',
  SHOUNEN_AI = 'SHOUNEN_AI',
  SLICE_OF_LIFE = 'SLICE_OF_LIFE',
  SMUT = 'SMUT',
  SPORTS = 'SPORTS',
  SUPERNATURAL = 'SUPERNATURAL',
  TRAGEDY = 'TRAGEDY',
  WUXIA = 'WUXIA',
  XIANXIA = 'XIANXIA',
  XUANHUAN = 'XUANHUAN',
  YAOI = 'YAOI',
  YURI = 'YURI'
}

export interface EditorContent {
  tag: 'p' | 'strong';
  text: string;
}

export interface NovelVolume {
  vid: string;
  name?: string;
  chapterCount: number;
}

export enum NovelOrigin {
  TRANSLATED = 'TRANSLATED',
  WEBNOVEL = 'WEBNOVEL'
}

export interface Novel {
  nid: string;
  cover?: string;
  title: string;
  uid: string;
  desc: EditorContent[];
  status: NovelStatus;
  genre: Genres;
  tags: Tags[];
  volumes?: NovelVolume[];
  views: number;
  chapterCount: number;
  createdAt: Date;
  lastUpdated?: Date;
  webnovelBookId?: string;
  origin: NovelOrigin;
}

export interface NovelChapter {
  nid: string;
  vid?: string;
  cid: string;
  index: number;
  title: string;
  content: EditorContent[];
  matureContent: boolean;
  createdAt: string;
}

/**
 * Common responses.
 */
export interface ErrorResponse {
  code: string;
  msg: string;
  err?: any;
}

export interface Pagination {
  offset: number;
  limit: number;
  totalCount: number;
  sort: { [k: string]: number };
}

export interface NovelURLParams {
  nid: string;
}

export interface NovelVolumeURLParams extends NovelURLParams {
  vid: string;
}

export interface NovelChapterURLParams extends NovelURLParams {
  cid: string;
}

/**
 * Auth responses.
 */
export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export interface Login {
  body: {
    username: string;
    password: string;
  };
  response: AuthResponse;
}

export interface Register {
  body: {
    username: string;
    password: string;
  };
  response: AuthResponse;
}

export interface VerifySession {
  body: {
    token: string;
  };
  response: AuthResponse;
}

/**
 * Profile responses
 */

export interface GetProfile {
  response: Omit<User, 'password' | 'library'>;
}

export interface UpdateProfile {
  body: Partial<Omit<User, 'password' | 'library'>>;
  response: Omit<User, 'password'>;
}

export interface UpdatePassword {
  body: {
    oldPassword: string;
    newPassword: string;
  };
}

export interface AddNovelToLibrary {
  body: {
    nid: string;
  };
  response: User['library'];
}

/**
 * Novel Response
 */
export type NovelInput = Omit<Novel, 'nid' | 'createdAt' | 'uid' | 'volumes' | 'views' | 'chapterCount' | 'lastUpdated'>;

export type NovelBrief = Pick<Novel, 'nid' | 'cover' | 'title' | 'genre' | 'desc' | 'status'>;

export interface CreateNovel {
  body: NovelInput & {
    type: 'book' | 'series';
  };
  response: Novel;
}

export interface ListNovel {
  query: {
    title?: string;
    uid?: string;
    genre?: Genres;
    status?: NovelStatus;
    tags?: Tags[];
    sortField?: string;
    sortOrder?: string;
    offset?: string;
    limit?: string;
  };
  response: {
    pagination: Pagination;
    items: NovelBrief[];
  };
}

export interface GetLatestUpdates {
  response: {
    items: (Pick<Novel, 'nid' | 'title' | 'genre'> & {
      author: Pick<User, 'uid' | 'username'>;
      chapter: Pick<NovelChapter, 'cid' | 'index' | 'title' | 'createdAt'>;
    })[];
  };
}

export interface GetNovel {
  url: NovelURLParams;
  response: Novel & { chapters: Pick<NovelChapter, 'cid' | 'index' | 'title' | 'createdAt'>[]; author: string };
}

export interface UpdateNovel {
  url: NovelURLParams;
  body: NovelInput;
  response: Novel;
}

export interface GetLatestUpdates {
  response: {
    items: (Pick<Novel, 'nid' | 'title' | 'genre'> & {
      author: Pick<User, 'uid' | 'username'>;
      chapter: Pick<NovelChapter, 'cid' | 'index' | 'title' | 'createdAt'>;
    })[];
  };
}

/**
 * Novel volume responses
 */
export interface CreateVolume {
  url: NovelURLParams;
  body: {
    name?: string;
  };
  response: NovelVolume;
}

export interface UpdateVolume {
  url: NovelVolumeURLParams;
  body: {
    name: string;
  };
  response: NovelVolume;
}

export interface DeleteVolume {
  url: NovelVolumeURLParams;
}

/**
 * Novel chapter responses.
 */

export type ChapterDetails = Omit<NovelChapter, 'nid'>;

export type NovelChapterInput = Pick<NovelChapter, 'vid' | 'title' | 'content' | 'matureContent'>;

export interface CreateChapter {
  url: NovelURLParams;
  body: NovelChapterInput;
  response: NovelChapter;
}

export interface ListChapters {
  url: NovelURLParams;
  response: {
    chapters: Pick<NovelChapter, 'cid' | 'index' | 'title' | 'createdAt'>[];
  };
}

export interface DownloadChapters {
  url: NovelURLParams;
  query: {
    sortOrder?: string;
    offset?: string;
    limit?: string;
  };
  response: {
    pagination: Pagination;
    items: ChapterDetails[];
  };
}

export interface GetChapter {
  url: NovelChapterURLParams;
  response: ChapterDetails;
}

export interface UpdateChapter {
  url: NovelChapterURLParams;
  body: Omit<NovelChapterInput, 'vid'>;
  response: ChapterDetails;
}

export interface DeleteChapter {
  url: NovelChapterURLParams;
}

/**
 * Scraper responses
 */
export interface ScraperMetadata {
  nid: string;
  chapterCount: number;
  totalChapters: number;
  status: ScraperTaskStatus;
}

export interface NovelURLParams {
  nid: string;
}

export interface ScrapeNovel {
  url: NovelURLParams;
  body: {
    startURL: string;
  };
  response: ScraperMetadata;
}

export interface ScraperTaskStatus {
  url: NovelURLParams;
  response: ScraperMetadata | null;
}

export interface UpdateScraperTask {
  url: NovelURLParams;
  body: {
    op: 'stop';
  };
  response: ScraperMetadata | null;
}
