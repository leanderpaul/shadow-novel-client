/**
 * Importing npm packages.
 */
import { useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { Form } from 'antd';
import { pickKeys } from '@leanderpaul/ts-utils';

/**
 * Importing user defined packages.
 */
import { NovelAPI } from '../../utils/api';
import { convertHTMLToEditorContent, convertEditorContentToHTML } from '../../utils/lib';

/**
 * Importing and defining types.
 */
import type React from 'react';
import type { SunEditorReactProps } from 'suneditor-react';
import type { FormInstance } from 'antd/lib/form';
import type { Novel, NovelURLParams } from '../../typescript/api';

type SunEditorOptions = SunEditorReactProps['setOptions'];
type CoverChange = React.ChangeEventHandler<HTMLInputElement>;

/**
 * Declaring the constants.
 */
export const suneditorOptions: SunEditorOptions = {
  buttonList: [['undo', 'redo'], ['formatBlock'], ['-right', 'fullScreen', 'preview', 'print']],
  charCounter: true,
  maxCharCount: 5000,
  formats: ['p', { name: 'Strong', tag: 'strong', command: 'replace', class: '__se__format__replace_xxx' }]
};

export function loadImage(files: FileList | null, setImage: (image?: string) => void) {
  if (!files) return;
  const file = files[0];
  const reader = new FileReader();
  reader.onloadend = () => setImage(reader.result as string);
  reader.readAsDataURL(file);
}

function handleEditNovel(novel: Novel, form: FormInstance, setNovelDesc: (desc: string) => void, setNovelCover: (cover?: string) => void) {
  const novelForm = pickKeys(novel, ['title', 'genre', 'tags', 'status', 'origin', 'webnovelBookId']);
  form.setFieldsValue({ ...novelForm });
  const descHTML = convertEditorContentToHTML(novel.desc);
  setNovelDesc(descHTML);
  setNovelCover(novel.cover);
}

export function useNovelForm() {
  /** Novel form states */
  const [novelCover, setNovelCover] = useState<string>();
  const [novelDesc, setNovelDesc] = useState('');
  const [form] = Form.useForm();
  const history = useHistory();

  /** API states */
  const { nid = '' } = useParams<Partial<NovelURLParams>>();
  const handleSuccess = (data: Novel) => history.push(`/workspace/${data.nid}`);
  const { mutate: createNovel, isLoading: isCreating } = useMutation(NovelAPI.create, { onSuccess: handleSuccess });
  const { mutate: updateNovel, isLoading: isUpdating } = useMutation(NovelAPI.update, { onSuccess: handleSuccess });
  const { isLoading } = useQuery(['novel', nid], () => NovelAPI.get(nid), {
    enabled: nid ? true : false,
    refetchOnWindowFocus: false,
    onSuccess: (values) => handleEditNovel(values, form, setNovelDesc, setNovelCover)
  });

  /** Event handlers */
  const handleCoverChange: CoverChange = (e) => loadImage(e.target.files, setNovelCover);
  const getFormData = () => form.validateFields().then((values) => ({ ...values, desc: convertHTMLToEditorContent(novelDesc), cover: novelCover }));
  const mutateForm = () => getFormData().then((novelData) => (nid ? updateNovel({ nid, novel: novelData }) : createNovel(novelData)));
  const handleSubmit = () => mutateForm().catch(console.error);

  const isMutating = isUpdating || isCreating;
  const submitText = nid ? 'Update' : 'Create';

  return { isLoading, isMutating, handleCoverChange, handleSubmit, form, novelCover, novelDesc, setNovelDesc, submitText, history, nid };
}
