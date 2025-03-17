import { HTMLAttributes } from 'react';
import styles from './card.module.scss';
import cn from 'classnames';

type Props = {
  title: string;
  description: string;
} & HTMLAttributes<HTMLDivElement>;

export const Card = ({
  title,
  description,
  children,
  className,
  ...rest
}: Props) => {
  const classNames = cn(styles.cardItem, className);
  return (
    <div className={classNames} {...rest}>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
};
