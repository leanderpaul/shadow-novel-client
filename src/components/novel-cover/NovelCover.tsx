/**
 * Importing npm packages.
 */
import React from 'react';

/**
 * Importing npm design components.
 */
import { Image, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * Importing user defined components.
 */

/**
 *  Importing user defined modules.
 */

/**
 * Importing styled components.
 */
import { Container } from './styles';

/**
 * Importing types.
 */
type TSize = 'sm' | 'auto' | 'lg' | 'xl' | 'xs' | 'full';

type ISizes = {
  [k in TSize]: { width?: number | string; height?: number | string };
};

interface INovelCoverProps {
  loading?: boolean;
  size?: TSize;
  image?: string | null;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  preview?: boolean;
}

/**
 * Constants.
 */
const DEFAULT_NOVEL_COVER = 'https://raw.githubusercontent.com/leanderpaul/shadow-novel-electron-app/master/src/assets/img/default-novel-cover.jpg';
const sizes: ISizes = {
  xs: { width: 75, height: 100 },
  sm: { width: 150, height: 200 },
  auto: { width: 225, height: 300 },
  lg: { width: 300, height: 400 },
  xl: { width: 450, height: 600 },
  full: { width: '100%', height: '100%' }
};

function NovelCover(props: INovelCoverProps) {
  const size = sizes[props.size || 'auto'];
  const src = props.image || DEFAULT_NOVEL_COVER;
  const preview = props.preview || false;
  const alt = props.alt || 'undefined';
  const style = props.style ? { ...size, ...props.style } : size;

  const placeholder = (
    <div className='d-flex justify-content-center align-items-center'>
      <Image width={size.width} height={size.height} src={DEFAULT_NOVEL_COVER} alt={props.alt} />
      <Spin className='position-absolute' indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
    </div>
  );

  return (
    <Container style={style} className={props.className}>
      <Image style={size} src={src} alt={alt} preview={preview} placeholder={placeholder} />
    </Container>
  );
}

export default NovelCover;
