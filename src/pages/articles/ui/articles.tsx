import { articleAPI } from '@shared/api';
import { Loader } from '@shared/ui/loader';
import { useQuery } from '@tanstack/react-query';
import { useDeleteArticle } from '../hooks/use-delete-article';

export const ArticlesPage = () => {
  const { data: articles, status } = useQuery({
    queryKey: ['fetch-articles'],
    queryFn: articleAPI.getArticles,
  });
  console.log(status);

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
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          {articles.map((item) => (
            <li
              key={item.id}
              style={{ border: '1px solid #ccc', padding: '12px' }}
            >
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
      )}
    </div>
  );
};
