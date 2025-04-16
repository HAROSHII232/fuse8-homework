import { ArticleFormValues } from '@shared/api';
import { Controller, UseFormReturn } from 'react-hook-form';

import styles from './article-form.module.scss';

type Props = {
  form: UseFormReturn<ArticleFormValues>;
  isSubmitting: boolean;
  onSubmit: () => void;
};

export const ArticleForm = ({ form, isSubmitting, onSubmit }: Props) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const contentType = watch('content.type');

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <label>
        <span> Заголовок статьи</span>
        <input type="text" {...register('title')} />
      </label>
      {errors.title && (
        <span style={{ color: 'tomato' }}>{errors.title.message}</span>
      )}

      <label>
        <span>Тип</span>
        <select
          {...register('content.type')}
          onChange={(e) =>
            setValue('content.type', e.target.value as 'draft' | 'published')
          }
        >
          <option value="draft">Черновик</option>
          <option value="published">Опубликовано</option>
        </select>
      </label>

      {contentType === 'published' && (
        <>
          <Controller
            name="content.description"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <label>
                  <span>Описание</span>
                  <textarea
                    {...field}
                    rows={5}
                    className={styles.description}
                  />
                </label>
                {fieldState.error && (
                  <span style={{ color: 'tomato' }}>
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />

          <label className={styles.checkbox}>
            <input type="checkbox" {...register('content.isNew')} />
            <span>Отметить статью как новую</span>
          </label>
        </>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Создание...' : 'Создать'}
      </button>
    </form>
  );
};
