import { apiClient } from '@shared/services/request';
import { Post } from './types';

export const fetchPostsApi = async () => {
  try {
    const response = await apiClient.get<Post[]>('/posts');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
};
