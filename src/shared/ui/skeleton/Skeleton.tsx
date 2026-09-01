import { CSSProperties } from 'react';
import clsx from 'clsx';

import styles from './Skeleton.module.scss';

const DEFAULT_SKELETON_SIZE = {
  round: {
    radius: '10px',
  },
  square: {
    side: '20px',
  },
  rectangular: {
    width: '100%',
    height: '16px',
  },
} as const;

type AnimationType = 'wave' | 'pulse';

type CommonSkeletonProps = {
  animation?: AnimationType;
};

type RoundSkeletonProps = CommonSkeletonProps & {
  type: 'round';
  radius?: string;
  width?: never;
  height?: never;
  side?: never;
};

type SquareSkeletonProps = CommonSkeletonProps & {
  type: 'square';
  side?: string;
  radius?: never;
  width?: never;
  height?: never;
};

type RectangularSkeletonProps = CommonSkeletonProps & {
  type: 'rectangular';
  width?: string;
  height?: string;
  radius?: never;
  side?: never;
};

type SkeletonProps = RoundSkeletonProps | SquareSkeletonProps | RectangularSkeletonProps;

export function Skeleton(props: SkeletonProps) {
  const { type, animation } = props;
  let inlineStyles: CSSProperties;

  switch (type) {
    case 'round': {
      const radius = props.radius ?? DEFAULT_SKELETON_SIZE.round.radius;
      inlineStyles = {
        width: `calc(${radius} * 2)`,
        height: `calc(${radius} * 2)`,
        borderRadius: '50%',
      };
      break;
    }
    case 'square': {
      const side = props.side ?? DEFAULT_SKELETON_SIZE.square.side;
      inlineStyles = {
        width: side,
        height: side,
      };
      break;
    }
    case 'rectangular':
      inlineStyles = {
        width: props.width ?? DEFAULT_SKELETON_SIZE.rectangular.width,
        height: props.height ?? DEFAULT_SKELETON_SIZE.rectangular.height,
      };
      break;
  }

  return <div className={clsx(styles[type], animation && styles[animation])} style={inlineStyles} />;
}
