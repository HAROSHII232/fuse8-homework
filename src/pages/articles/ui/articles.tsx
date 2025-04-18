import { articleAPI, QUERY_KEYS } from '@shared/api';
import { Loader } from '@shared/ui/loader';
import { useQuery } from '@tanstack/react-query';
import { useDeleteArticle } from '../hooks';
import { Button } from '@shared/ui/button';

import styles from './articles.module.scss';

export const ArticlesPage = () => {
  const {
    data: articles,
    status,
    error: fetchError,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.fetchArticles,
    queryFn: articleAPI.getArticles,
  });

  const { mutate: deleteArticle, error: deleteError } = useDeleteArticle();

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'error') {
    return (
      <div className={styles.fetchError}>
        Произошла ошибка при загрузке статей
        {fetchError instanceof Error && (
          <p className={styles.errorDetails}>{fetchError.message}</p>
        )}
        <Button onClick={() => refetch()}>Попробовать снова</Button>
      </div>
    );
  }

  return (
    <div>
      {articles.length === 0 &&
        'Пока что здесь нет статей, попробуй создать 🤔'}

      {articles.length > 0 && (
        <ul className={styles.articles}>
          {articles.map((item) => (
            <li key={item.id} className={styles.article}>
              <Button type="button" onClick={() => deleteArticle(item.id)}>
                Удалить
              </Button>
              {deleteError && (
                <p className={styles.errorDetails}>Не удалось удалить статью</p>
              )}
              <p>id: {item.id}</p>
              <p>заголовок: {item.title}</p>
              <p>тип: {item.content.type}</p>
              <div>
                {item.content.type === 'draft' ? (
                  <div>
                    <p>Черновик</p>
                  </div>
                ) : (
                  <div>
                    <p>Опубликована {item.content.isNew && 'Новая статья'}</p>
                    <p>{item.content.description}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
