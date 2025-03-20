import cn from 'classnames';
import { ComponentPropsWithoutRef, ElementType } from 'react';

import styles from './button.module.scss';

type Props<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = 'button'>({
  as,
  className,
  children,
  ...rest
}: Props<T>) => {
  const Tag: ElementType = as || 'button';
  const classNames = cn(styles.button, className);

  return (
    <Tag className={classNames} {...rest}>
      {children}
    </Tag>
  );
};
