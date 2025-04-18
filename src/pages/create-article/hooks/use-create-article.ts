import { articleAPI, ArticleFormValues, QUERY_KEYS } from '@shared/api';
import { routes } from '@shared/services';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ArticleFormValues) =>
      articleAPI.createArticle({
        ...data,
        content:
          data.content.type === 'draft'
            ? { type: 'draft' }
            : {
                type: 'published',
                description: data.content.description,
                isNew: data.content.isNew || false,
              },
      }),

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.fetchArticles });
      navigate(routes.articles.getLink());
    },
  });
};
