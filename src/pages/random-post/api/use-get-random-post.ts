import { fetchPostsApi } from '@shared/api/fetch-posts';
import { Post } from '@shared/api/types';
import { getRandomIndex } from '@shared/helpers/get-random-index';
import { useState } from 'react';

export const useGetRandomPost = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchRandomPost = async () => {
    try {
      setLoading(true);
      setError('');
      setPost(null);

      const posts = await fetchPostsApi();
      const randomPostNumber = getRandomIndex(posts);
      const randomPost = posts[randomPostNumber];

      setPost(randomPost);
    } catch (error) {
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  return { fetchRandomPost, post, loading, error };
};
