import { useGetRandomPost } from '../api/use-get-random-post';

export const RandomPostPage = () => {
  const { fetchRandomPost, error, loading, post } = useGetRandomPost();
  return (
    <>
      <h1>Рандомный пост</h1>
      {!post && (
        <button onClick={fetchRandomPost} disabled={loading}>
          {loading ? 'Загрузка...' : 'Получить'}
        </button>
      )}
      {error && <span>{error}</span>}
      {post && <span>{post.title}</span>}
    </>
  );
};
