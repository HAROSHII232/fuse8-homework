import { ElementType, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './button.module.scss';

type Props<T extends ElementType> = {
  as?: T;
} & HTMLAttributes<HTMLElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = <T extends ElementType = 'button'>({
  as,
  ...rest
}: Props<T>) => {
  const { className, children } = rest;
  const Tag: ElementType = as || 'button';
  return (
    <Tag className={cn(styles.button, className)} {...rest}>
      {children}
    </Tag>
  );
};
