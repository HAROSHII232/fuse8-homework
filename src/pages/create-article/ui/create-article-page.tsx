import { zodResolver } from '@hookform/resolvers/zod';
import {
  articleAPI,
  createArticleFormSchema,
  CreateArticleFormValues,
  delay,
} from '@shared/api';
import { routes } from '@shared/services';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const CreateArticlePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateArticleFormValues>({
    resolver: zodResolver(createArticleFormSchema),
    defaultValues: {
      title: '',
    },
  });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: articleAPI.createArticle,
  });

  const submitHandler = handleSubmit(async (data: CreateArticleFormValues) => {
    await delay(1000);

    mutate({
      ...data,
      content: {
        type: 'draft',
      },
    });
    navigate(routes.articles.getLink());
  });

  return (
    <div>
      <h1>Создать статью</h1>
      <form
        onSubmit={submitHandler}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Заголовок статьи
          <input type="text" {...register('title')} />
        </label>

        {errors.title && (
          <div style={{ color: 'red' }}>{errors.title.message}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ marginTop: '8px' }}
        >
          {isSubmitting ? 'Создание...' : 'Создать'}
        </button>
      </form>
    </div>
  );
};
