import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArticleFormSchema, ArticleFormValues } from '@shared/api';

export const useCreateArticleForm = () => {
  return useForm<ArticleFormValues>({
    resolver: zodResolver(ArticleFormSchema),
    defaultValues: {
      title: '',
      content: {
        type: 'draft',
      },
    },
  });
};
