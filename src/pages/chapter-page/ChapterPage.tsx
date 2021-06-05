/**
 * Importing npm packages.
 */
import React, { useEffect } from 'react';

/**
 * Importing npm design components.
 */
import { Skeleton, Typography } from 'antd';

/**
 * Importing user defined components.
 */
import ChapterNavbar from '../../components/chapter-navbar/ChapterNavbar';
import ChapterContainer from '../../components/chapter-container/ChapterContainer';

/**
 *  Importing user defined modules.
 */
import { useChapterPage } from './utils';

/**
 * Importing styled components.
 */
import { Container, Chapter,} from './styles';

/**
 * Importing types.
 */

function ChapterPage() {
  const { chapter, isLoading, metadata, novel, setMetadata, contentRef } = useChapterPage();

  const handleFontSizeChange = (fontSize: number) => setMetadata({ ...metadata, fontSize });
  const handleWidthChange = (width: number) => setMetadata({ ...metadata, width });

  const contentHTML = chapter?.content.map((block, index) => (
    <Typography.Paragraph key={index} strong={block.tag === 'strong'}>
      {block.text}
    </Typography.Paragraph>
  ));

  return (
    <Container width={metadata.width}>
      <ChapterNavbar onFontSizeChange={handleFontSizeChange} onWidthChange={handleWidthChange} novel={novel} chapter={chapter} metadata={metadata} />
      <div className='wrapper' ref={contentRef}>
        <ChapterContainer novel={novel} chapter={chapter}>
          <Chapter fontSize={metadata.fontSize}>
            {isLoading ? (
              <Skeleton title paragraph={{ rows: 50 }} active />
            ) : (
              <>
                <Typography.Title className='mb-4' level={3}>
                  Chapter {chapter?.index}: {chapter?.title}
                </Typography.Title>
                <div>{contentHTML}</div>
              </>
            )}
          </Chapter>
        </ChapterContainer>
      </div>
    </Container>
  );
}

export default ChapterPage;
