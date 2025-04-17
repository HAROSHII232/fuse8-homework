import { ArticleFormValues } from '@shared/api';
import { Controller } from 'react-hook-form';

import styles from './article-form.module.scss';
import { Button } from '@shared/ui/button';
import {
  useCreateArticle,
  useCreateArticleForm,
} from '@pages/create-article/hooks';

export const ArticleForm = () => {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useCreateArticleForm();

  const { mutate: createArticle, isPending } = useCreateArticle();

  const submitHandler = handleSubmit((data: ArticleFormValues) => {
    createArticle(data);
  });

  const contentType = watch('content.type');

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <label>
        <span> Заголовок статьи</span>
        <input type="text" {...register('title')} />
      </label>
      {errors.title && (
        <span className={styles.fieldError}>{errors.title.message}</span>
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
                  <span className={styles.fieldError}>
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

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Создание...' : 'Создать'}
      </Button>
    </form>
  );
};
