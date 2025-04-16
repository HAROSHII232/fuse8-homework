import { articleAPI } from '@shared/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const ArticlesPage = () => {
  const { data: articles, status } = useQuery({
    queryKey: ['fetch-articles'],
    queryFn: articleAPI.getArticles,
  });
  console.log(articles);

  const { mutate: deleteArticle } = useMutation({
    mutationFn: articleAPI.deleteArticle,
  });

  if (status !== 'success') {
    return null;
  }

  return (
    <ul>
      {articles.map((item) => (
        <li key={item.id} style={{ border: '1px solid #ccc', padding: '12px' }}>
          <button type="button" onClick={() => deleteArticle(item.id)}>
            Удалить
          </button>
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
  );
};
