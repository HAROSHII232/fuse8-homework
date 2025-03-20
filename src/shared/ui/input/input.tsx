import cn from 'classnames';
import { ChangeEvent, ComponentPropsWithoutRef, KeyboardEvent } from 'react';
import styles from './input.module.scss';

type Props = ComponentPropsWithoutRef<'input'> & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  type?: 'password' | 'search' | 'text';
  error?: string;
};

export const Input = ({
  type = 'text',
  onChangeText,
  onEnter,
  className,
  error,
  onFocus,
  ...rest
}: Props) => {
  const classNames = cn(styles.input, className, {
    [styles.inputError]: error,
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText?.(e.currentTarget.value);
  };

  const handleOnEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        onChange={handleOnChange}
        className={classNames}
        type={type}
        onKeyDown={handleOnEnterPress}
        onFocus={onFocus}
        {...rest}
      />
      <div className={cn(styles.error, { [styles.visible]: error })}>
        {error || ' '}
      </div>
    </div>
  );
};
