/**
 * Importing npm packages.
 */
import { useState } from 'react';
import { Form } from 'antd';
import { useHistory, useParams } from 'react-router';
import { useQuery, useMutation } from 'react-query';

/**
 * Importing user defined packages.
 */
import { ChapterAPI, NovelAPI } from '../../utils/api';
import { convertEditorContentToHTML } from '../../utils/lib';

/**
 * Importing and defining types.
 */
import type { GetChapter } from '../../typescript/api';
import type { SunEditorReactProps } from 'suneditor-react';
import type { FormInstance } from 'antd';

type SunEditorOptions = SunEditorReactProps['setOptions'];

interface URLParams {
  nid: string;
  cid?: string;
}

/**
 * Declaring the constants.
 */
const formFields = ['title', 'content', 'matureContent', 'vid'];
export const suneditorOptions: SunEditorOptions = {
  buttonList: [['undo', 'redo'], ['formatBlock'], ['-right', 'fullScreen', 'preview', 'print']],
  charCounter: true,
  maxCharCount: 50000,
  formats: ['p', { name: 'Strong', tag: 'strong', command: 'replace', class: '__se__format__replace_xxx' }]
};

function setFormData(chapter: GetChapter['response'], form: FormInstance) {
  const contentHTML = convertEditorContentToHTML(chapter.content);
  form.setFieldsValue({ title: chapter.title, matureContent: chapter.matureContent, content: contentHTML });
}

export function useChapterForm() {
  /** Chapter form states */
  const [form] = Form.useForm();
  const history = useHistory();

  /** API States */
  const { nid, cid = '' } = useParams<URLParams>();
  const handleSuccess = () => history.push(`/workspace/${nid}`);
  const { mutate: createChapter, isLoading: isCreating } = useMutation(ChapterAPI.create, { onSuccess: handleSuccess });
  const { mutate: updatechapter, isLoading: isUpdating } = useMutation(ChapterAPI.update, { onSuccess: handleSuccess });
  const { data } = useQuery(['novel', nid], () => NovelAPI.get(nid));
  const { isLoading } = useQuery(['novel', nid, cid], () => ChapterAPI.get({ nid, cid }), { enabled: cid ? true : false, onSuccess: (values) => setFormData(values, form) });

  /** Event handlers */
  const mutateForm = () => form.validateFields(formFields).then((chapter) => (cid ? updatechapter({ nid, cid, chapter }) : createChapter({ nid, chapter })));
  const handleSubmit = () => mutateForm().catch(console.log);

  const isMutating = isUpdating || isCreating;
  const submitText = cid ? 'Update' : 'Create';
  const titleText = `${data?.title || ''} - Chapter Information`;

  return { isLoading, isMutating, handleSubmit, form, submitText, titleText, volumes: data?.volumes };
}
