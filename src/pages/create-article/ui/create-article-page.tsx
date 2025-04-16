import { articleAPI, ArticleFormValues } from '@shared/api';
import { useCreateArticleForm } from '@shared/hooks';
import { routes } from '@shared/services';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ArticleForm } from './article-form/article-form';

export const CreateArticlePage = () => {
  const form = useCreateArticleForm();
  const navigate = useNavigate();

  const { mutate: createArticle, isPending } = useMutation({
    mutationFn: articleAPI.createArticle,
  });

  const submitHandler = form.handleSubmit((data: ArticleFormValues) => {
    createArticle(
      {
        ...data,
        content:
          data.content.type === 'draft'
            ? { type: 'draft' }
            : {
                type: 'published',
                description: data.content.description,
                isNew: data.content.isNew || false,
              },
      },
      {
        onSuccess: () => navigate(routes.articles.getLink()),
      }
    );
  });

  return (
    <div>
      <h1>Создать статью</h1>
      <ArticleForm
        form={form}
        isSubmitting={isPending}
        onSubmit={submitHandler}
      />
    </div>
  );
};
