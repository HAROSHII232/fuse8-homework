import { Article, articleAPI, QUERY_KEYS } from '@shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: articleAPI.deleteArticle,

    onMutate: async (articleId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.fetchArticles });
      const previousArticles = queryClient.getQueryData(
        QUERY_KEYS.fetchArticles
      );
      queryClient.setQueryData(QUERY_KEYS.fetchArticles, (old: Article[]) =>
        old.filter((article: Article) => article.id !== articleId)
      );

      return { previousArticles };
    },

    onError: (_err, _articleId, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.fetchArticles,
        context?.previousArticles
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.fetchArticles });
    },
  });
};
