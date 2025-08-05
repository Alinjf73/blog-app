import {
  createNewCategory,
  getCategoriesApi,
  removeCategoryApi,
  updateCategory,
} from "@/services/categoryService";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
  });

  const { categories: rawCategories = [] } = data || {};

  const categories = rawCategories.map((item) => ({
    label: item.title,
    value: item._id,
    englishTitle: item.englishTitle,
    description: item.description,
    createdAt: item.createdAt,
  }));

  const transformedCategories = rawCategories.map((item) => ({
    label: item.title,
    value: item.englishTitle,
  }));

  return { isLoading, categories, transformedCategories };
}

export const useGetCategoryById = (id) =>
  useQuery({
    queryKey: ["get-category", id],
    queryFn: () => getCategoryById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useCreateCategory = () =>
  useMutation({ mutationFn: createNewCategory });

export const useUpdateCategory = () =>
  useMutation({ mutationFn: updateCategory });

export const useRemoveCategory = () => {
  return useMutation({ mutationFn: removeCategoryApi });
};
