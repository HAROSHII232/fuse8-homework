import { Article, articleAPI } from '@shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: articleAPI.deleteArticle,

    onMutate: async (articleId) => {
      await queryClient.cancelQueries({ queryKey: ['fetch-articles'] });
      const previousArticles = queryClient.getQueryData(['fetch-articles']);
      queryClient.setQueryData(['fetch-articles'], (old: Article[]) =>
        old.filter((article: Article) => article.id !== articleId)
      );

      return { previousArticles };
    },

    onError: (_err, _articleId, context) => {
      queryClient.setQueryData(['fetch-articles'], context?.previousArticles);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-articles'] });
    },
  });
};
