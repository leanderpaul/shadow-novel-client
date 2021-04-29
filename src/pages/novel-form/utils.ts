/**
 * Importing npm packages.
 */
import { useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { Form } from 'antd';

/**
 * Importing user defined packages.
 */
import { NovelAPI } from '../../utils/api';
import { convertHTMLToDesc } from '../../utils/lib';

/**
 * Importing and defining types.
 */
import type React from 'react';
import type SunEditor from 'suneditor-react';
import type { SunEditorReactProps } from 'suneditor-react';
import type { NovelURLParams } from '../../typescript/api';

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
  reader.onloadend = () => setImage(reader.result?.toString());
  reader.readAsDataURL(file);
}

export function useNovelForm() {
  /** Novel form states. */
  const editorRef = useRef<SunEditor>(null);
  const [novelCover, setNovelCover] = useState<string>();
  const [form] = Form.useForm();
  const history = useHistory();

  /** API states. */
  const { nid = '' } = useParams<Partial<NovelURLParams>>();
  const { isLoading } = useQuery(nid, () => NovelAPI.get(nid), { enabled: nid ? true : false, onSuccess: console.log });
  const { mutate, isLoading: isMutating } = useMutation(NovelAPI.create, { onSuccess: (data) => history.push(`/novel/${data.nid}`) });

  /** Event handlers. */
  const handleCoverChange: CoverChange = (e) => loadImage(e.target.files, setNovelCover);
  const getNovelDesc = () => convertHTMLToDesc(editorRef.current?.editor.getContents(true));
  const getFormData = () => form.validateFields().then((values) => ({ ...values, desc: getNovelDesc(), cover: novelCover }));
  const mutateForm = () => getFormData().then((newNovel) => mutate(newNovel));
  const handleSubmit = () => mutateForm().catch(console.log);

  return { isLoading, isMutating, handleCoverChange, handleSubmit, form, editorRef, novelCover };
}
