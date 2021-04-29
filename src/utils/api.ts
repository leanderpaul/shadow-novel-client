/**
 * Importing npm packages.
 */
import { message } from 'antd';

/**
 * Importing user defined packages.
 */
import { authToken } from './store';

/**
 * Importing and defining types.
 */
import type { QueryFunctionContext } from 'react-query';
import type { Register, Login, VerifySession } from '../typescript/api';
import type { CreateNovel, GetNovel, FindNovel, UpdateNovel } from '../typescript/api';

/**
 * Declaring the constants.
 */
/**
 * Declaring the constants.
 */
function getOptions(method: 'get' | 'post' | 'put' | 'delete', body?: Object, isPrivate: boolean = false) {
  const options: RequestInit = { method };
  const headers: Record<string, string> = {};
  if (isPrivate && authToken) headers.Authorization = authToken;
  if (body) {
    options.body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }
  options.headers = headers;
  return options;
}

function handleError(err: any, notifyError: boolean = true) {
  if (err.code === undefined) {
    console.log(err);
    err = { code: 'NETWORK_ERROR', msg: 'Network Error ! \nPlease check your internet connection' };
    notifyError = true;
  } else console.warn(err);
  if (notifyError) message.error(err.msg || 'Unexpected server error has occured !');
  // console.error(err);
  return err;
}

/**
 * Auth APIs
 */
async function register(input: Register['body']): Promise<Login['response']> {
  try {
    const res = await fetch('/api/auth/register', getOptions('post', input));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function login(input: Login['body']): Promise<Login['response']> {
  try {
    const res = await fetch('/api/auth/login', getOptions('post', input));
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
    const closeMessage = message.loading('verifying user session', 10000);
    const body = { token: authToken };
    const res = await fetch('/api/auth/verify-session', getOptions('post', body));
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
 * Novel APIs
 */
async function createNovel(body: CreateNovel['body']): Promise<CreateNovel['response']> {
  try {
    const res = await fetch('/api/novels', getOptions('post', body, true));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Novel created successfully !`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function listNovels(context: QueryFunctionContext, uid?: string): Promise<FindNovel['response']> {
  try {
    const params = new URLSearchParams(window.location.search);
    if (uid) params.set('uid', uid);
    if (context.pageParam) params.set('offset', (context.pageParam * 20).toString());
    const res = await fetch(`/api/novels?${params.toString()}`, getOptions('get'));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

async function getNovel(nid: string): Promise<GetNovel['response']> {
  try {
    const res = await fetch(`/api/novels/${nid}`, getOptions('get'));
    const data = await res.json();
    if (res.status >= 400) throw data;
    return data;
  } catch (err) {
    throw handleError(err, false);
  }
}

async function updateNovel(nid: string, body: UpdateNovel['body']): Promise<UpdateNovel['response']> {
  try {
    const res = await fetch(`/api/novels/${nid}`, getOptions('put', body, true));
    const data = await res.json();
    if (res.status >= 400) throw data;
    message.success(`Novel updated successfully !`);
    return data;
  } catch (err) {
    throw handleError(err);
  }
}

export const NovelAPI = { create: createNovel, list: listNovels, get: getNovel, update: updateNovel };
