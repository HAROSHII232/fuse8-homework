import { useGetRandomPost } from '../api/use-get-random-post';

export const RandomPostPage = () => {
  const { fetchRandomPost, error, loading, post } = useGetRandomPost();
  return (
    <div>
      <h1>Рандомный пост</h1>
      {!post && (
        <button onClick={fetchRandomPost}>
          {loading ? 'Загрузка...' : 'Получить'}
        </button>
      )}
      {error && <span>{error}</span>}
      {post && (
        <p>
          <span>{post.title}</span>
          <span>{post.body}</span>
        </p>
      )}
    </div>
  );
};
