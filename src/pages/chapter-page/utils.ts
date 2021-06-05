/**
 * Importing npm packages.
 */
import { useState, createRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

/**
 * Importing user defined packages.
 */
import { ChapterAPI, NovelAPI } from '../../utils/api';

/**
 * Importing and defining types.
 */
import type { NovelChapterURLParams } from '../../typescript/api';

interface Metadata {
  fontSize: number;
  width: number;
}

/**
 * Declaring the constants.
 */
const METADATA_KEY = 'shadow-novel-metadata';
const metadataFromStore = localStorage.getItem(METADATA_KEY);
const INITIAL_METADATA: Metadata = metadataFromStore ? JSON.parse(metadataFromStore) : { fontSize: 16, width: 1000 };

export function useChapterPage() {
  const { nid, cid } = useParams<NovelChapterURLParams>();
  const [metadata, setMetadata] = useState<Metadata>(INITIAL_METADATA);
  const { data: novel } = useQuery(['novel', nid], () => NovelAPI.get(nid));
  const { data: chapter, isLoading } = useQuery(['novel', nid, cid], () => ChapterAPI.get({ cid, nid }));

  const contentRef = createRef<HTMLDivElement>();

  useEffect(() => contentRef.current?.scrollTo(0, 0), [nid, cid]);

  function handleMetadataChange(metadata: Metadata) {
    localStorage.setItem(METADATA_KEY, JSON.stringify(metadata));
    setMetadata(metadata);
  }

  return { novel, chapter, metadata, isLoading, setMetadata: handleMetadataChange, contentRef };
}
