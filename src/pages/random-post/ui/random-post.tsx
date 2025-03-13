import { Loader } from '@shared/ui/loader';
import { useGetRandomPost } from '../api/use-get-random-post';

export const RandomPostPage = () => {
  const { fetchRandomPost, error, loading, post } = useGetRandomPost();

  return (
    <>
      <h1>Рандомный пост</h1>

      {!post && !loading && !error && (
        <button onClick={fetchRandomPost} disabled={loading}>
          Получить
        </button>
      )}

      {loading && <Loader />}
      {error && <span>{error}</span>}
      {post && <span>{post.title}</span>}
    </>
  );
};
