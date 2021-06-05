/**
 * Importing npm packages.
 */
import { message } from 'antd';

/**
 * Importing user defined packages.
 */
import { authToken, serverURL } from './store';
import { appendObjectToParams, convertHTMLToEditorContent } from './lib';

/**
 * Importing and defining types.
 */
import type { Register, Login, VerifySession } from '../typescript/api';
import type { GetProfile, UpdateProfile, UpdatePassword, AddNovelToLibrary } from '../typescript/api';
import type { CreateNovel, GetNovel, ListNovel, UpdateNovel, GetLatestUpdates } from '../typescript/api';
import type { CreateChapter, GetChapter, ListChapters, UpdateChapter, DeleteChapter } from '../typescript/api';
import type { CreateVolume, UpdateVolume, DeleteVolume } from '../typescript/api';
import type { ScrapeNovel, ScraperMetadata, ScraperTaskStatus, UpdateScraperTask } from '../typescript/api';

type Chapter<T> = Omit<T, 'content'> & { content: string };

/**
 * Declaring the constants.
 */
const NETWORK_ERROR_MSG_KEY = 'network-error';

function getOptions(method: 'get' | 'post' | 'put' | 'delete', body?: Object) {
  const options: RequestInit = { method };
  const headers: Record<string, string> = {};
  if (authToken) headers.Authorization = authToken;
  if (body) {
    options.body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }
  options.headers = headers;
  return options;
}

function handleError(err: any, notifyError: boolean = true) {
  let key: undefined | string = undefined;
  if (err.code === undefined) {
    console.log(err);
    err = { code: 'NETWORK_ERROR', msg: 'Network Error ! \nPlease check your internet connection' };
    notifyError = true;
    key = NETWORK_ERROR_MSG_KEY;
  } else console.warn(err);
  if (notifyError) message.error({ content: err.msg || 'Unexpected server error has occured !', key });
  // console.error(err);
  return err;
}

/**
 * Auth APIs
 */
async function register(input: Register['body']): Promise<Login['response']> {
  try {
    const res = await fetch(`${serverURL}/api/auth/register`, getOptions('post', input));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function login(input: Login['body']): Promise<Login['response']> {
  try {
    const res = await fetch(`${serverURL}/api/auth/login`, getOptions('post', input));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function verifySession(): Promise<VerifySession['response'] | undefined> {
  try {
    if (!authToken) return;
    const closeMessage = message.loading('verifying user session');
    const body = { token: authToken };
    const res = await fetch(`${serverURL}/api/auth/verify-session`, getOptions('post', body));
    const data = await res.json();
    closeMessage();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

export const AuthAPI = { login, register, verifySession };

/**
 * Profile APIs
 */
async function getProfile(): Promise<GetProfile['response']> {
  try {
    const res = await fetch(`${serverURL}/api/profile`, getOptions('get'));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function updateProfile(body: UpdateProfile['body']): Promise<UpdateProfile['response']> {
  try {
    const res = await fetch(`${serverURL}/api/profile`, getOptions('put', body));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Profile updated successfully !`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function updatePassword(body: UpdatePassword['body']) {
  try {
    const res = await fetch(`${serverURL}/api/profile/update-password`, getOptions('post', body));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Password updated successfully !`);
    return;
  } catch (err) {
    throw handleError(err);
  }
}

async function addNovelToLibrary(body: AddNovelToLibrary['body']): Promise<AddNovelToLibrary['response']> {
  try {
    const res = await fetch(`${serverURL}/api/profile/library`, getOptions('post', body));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Novel added to library !`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

export const ProfileAPI = { get: getProfile, update: updateProfile, updatePassword, addToLibrary: addNovelToLibrary };

/**
 * Novel APIs
 */
async function createNovel(body: CreateNovel['body']): Promise<CreateNovel['response']> {
  try {
    const res = await fetch(`${serverURL}/api/novels`, getOptions('post', body));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Novel created successfully !`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function listNovels(query?: ListNovel['query']): Promise<ListNovel['response']> {
  try {
    const params = new URLSearchParams(window.location.search);
    if (query) appendObjectToParams(params, query);
    const res = await fetch(`${serverURL}/api/novels?${params.toString()}`, getOptions('get'));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function latestUpdates(): Promise<GetLatestUpdates['response']> {
  try {
    const res = await fetch(`${serverURL}/api/novels/latest-updates`, getOptions('get'));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function getNovel(nid: string): Promise<GetNovel['response']> {
  try {
    const res = await fetch(`${serverURL}/api/novels/${nid}`, getOptions('get'));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err, false);
  }
}

async function updateNovel(input: { nid: String; novel: UpdateNovel['body'] }): Promise<UpdateNovel['response']> {
  try {
    const res = await fetch(`${serverURL}/api/novels/${input.nid}`, getOptions('put', input.novel));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Novel updated successfully !`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

export const NovelAPI = { create: createNovel, list: listNovels, get: getNovel, update: updateNovel, latestUpdates };

/**
 * Volume API's
 */
async function createVolume(input: { nid: string; volume: CreateVolume['body'] }) {
  try {
    const res = await fetch(`${serverURL}/api/novels/${input.nid}/volumes`, getOptions('post', input.volume));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Volume created successfully !`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function updateVolume(input: { nid: string; vid: string; volume: UpdateVolume['body'] }) {
  try {
    const res = await fetch(`${serverURL}/api/novels/${input.nid}/volumes/${input.vid}`, getOptions('put', input.volume));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Volume updated successfully !`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function deleteVolume(input: DeleteVolume['url']) {
  try {
    const res = await fetch(`${serverURL}/api/novels/${input.nid}/volumes/${input.vid}`, getOptions('delete'));
    if (res.status >= 400) throw await res.json();
    message.success(`Volume deleted successfully !`);
    return;
  } catch (err) {
    throw handleError(err);
  }
}

export const VolumeAPI = { create: createVolume, update: updateVolume, delete: deleteVolume };

/**
 * Chapter API's
 */
async function createChapter(input: { nid: string; chapter: Chapter<CreateChapter['body']> }): Promise<CreateChapter['response']> {
  try {
    const content = convertHTMLToEditorContent(input.chapter.content);
    const res = await fetch(`${serverURL}/api/novels/${input.nid}/chapters`, getOptions('post', { ...input.chapter, content }));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Chapter created successfully !`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function downloadChapter() {
  try {
  } catch (err) {
    throw handleError(err);
  }
}

async function getChapter(input: GetChapter['url']): Promise<GetChapter['response']> {
  try {
    const res = await fetch(`${serverURL}/api/novels/${input.nid}/chapters/${input.cid}`, getOptions('get'));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function updateChapter(input: { nid: string; cid: string; chapter: Chapter<UpdateChapter['body']> }): Promise<UpdateChapter['response']> {
  try {
    const content = convertHTMLToEditorContent(input.chapter.content);
    const res = await fetch(`${serverURL}/api/novels/${input.nid}/chapters/${input.cid}`, getOptions('put', { ...input.chapter, content }));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Chapter updated successfully !`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function deleteChapter(input: DeleteChapter['url']): Promise<void> {
  try {
    const res = await fetch(`${serverURL}/api/novels/${input.nid}/chapters/${input.cid}`, getOptions('delete'));
    if (res.status >= 400) throw await res.json();
    message.success(`Chapter deleted successfully !`);
    return;
  } catch (err) {
    throw handleError(err);
  }
}

export const ChapterAPI = { create: createChapter, update: updateChapter, get: getChapter, delete: deleteChapter, download: downloadChapter };

/**
 * Scraper APIs
 */
async function scrapeNovel(input: ScrapeNovel['body'] & ScrapeNovel['url']): Promise<ScrapeNovel['response']> {
  try {
    const res = await fetch(`${serverURL}/api/scrape/${input.nid}`, getOptions('post', { startURL: input.startURL }));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function getScrapingTask(nid: string): Promise<ScraperTaskStatus['response']> {
  try {
    const res = await fetch(`${serverURL}/api/scrape/${nid}`, getOptions('get'));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function stopScraping(nid: string): Promise<UpdateScraperTask['response']> {
  try {
    const res = await fetch(`${serverURL}/api/scrape/${nid}`, getOptions('put', { op: 'stop' }));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

export const ScraperAPI = { start: scrapeNovel, stop: stopScraping, status: getScrapingTask };
