import Image from 'next/image';
import { ICONS_CONFIG } from '@/shared/config';

type ProxyImageProps = Omit<
  React.ComponentProps<typeof Image>,
  'src' | 'alt' | 'height' | 'width'
> & {
  filename?: keyof typeof ICONS_CONFIG;
  src?: string;
  alt?: string;
  height: number | 'auto';
  width: number | 'auto';
};

export const Icon = ({
  filename,
  src,
  alt,
  width,
  height,
  ...rest
}: ProxyImageProps) => {
  const _src = src ? src : filename ? ICONS_CONFIG[filename] : '';

  if (width === 'auto' || height === 'auto') {
    return (
      <Image
        src={_src}
        alt={alt ?? ''}
        width={0}
        height={0}
        style={{ width, height }}
        unoptimized
        {...rest}
      />
    );
  }

  return (
    <Image src={_src} alt={alt ?? ''} width={width} height={height} {...rest} />
  );
};
