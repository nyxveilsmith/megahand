import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type Article, type InsertArticle } from "@shared/schema";

export function useArticles() {
  const queryClient = useQueryClient();

  const articlesQuery = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const createArticleMutation = useMutation({
    mutationFn: async (newArticle: InsertArticle) => {
      const res = await apiRequest("POST", "/api/articles", newArticle);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: async ({ id, article }: { id: number; article: Partial<InsertArticle> }) => {
      const res = await apiRequest("PUT", `/api/articles/${id}`, article);
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: [`/api/articles/${variables.id}`] });
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/articles/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
    },
  });

  return {
    articles: articlesQuery.data || [],
    isLoading: articlesQuery.isLoading,
    isError: articlesQuery.isError,
    createArticle: createArticleMutation.mutate,
    isCreating: createArticleMutation.isPending,
    updateArticle: updateArticleMutation.mutate,
    isUpdating: updateArticleMutation.isPending,
    deleteArticle: deleteArticleMutation.mutate,
    isDeleting: deleteArticleMutation.isPending,
  };
}

export function useArticle(id: number | null) {
  const enabled = id !== null;
  
  const articleQuery = useQuery<Article>({
    queryKey: [`/api/articles/${id}`],
    enabled,
  });

  return {
    article: articleQuery.data,
    isLoading: articleQuery.isLoading,
    isError: articleQuery.isError,
  };
}
