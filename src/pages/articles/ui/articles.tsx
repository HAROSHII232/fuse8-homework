import { articleAPI } from '@shared/api';
import { Loader } from '@shared/ui/loader';
import { useQuery } from '@tanstack/react-query';
import { useDeleteArticle } from '../hooks';

import styles from './articles.module.scss';
import { Button } from '@shared/ui/button';

export const ArticlesPage = () => {
  const { data: articles, status } = useQuery({
    queryKey: ['fetch-articles'],
    queryFn: articleAPI.getArticles,
  });

  const { mutate: deleteArticle } = useDeleteArticle();

  if (status === 'pending') {
    return <Loader />;
  }

  if (status !== 'success') {
    return null;
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
