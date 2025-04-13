import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
} from "@/components/datatable/datatable-constants";
import { useDebounce } from "@/hooks/use-debounce";
import { categoryServices } from "@/services/category/category-services";

const useCategory = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounce = useDebounce();

  const currentPage = searchParams.get("page") || String(PAGE_DEFAULT);
  const currentLimit = searchParams.get("limit") || String(LIMIT_DEFAULT);
  const currentSearch = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(currentSearch);

  // Utility buat build URL params
  const buildParams = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(overrides).forEach(([key, value]) => {
        params.set(key, value);
      });
      return params.toString();
    },
    [searchParams]
  );

  // Update full URL
  const setURL = () => {
    const query = buildParams({
      page: currentPage,
      limit: currentLimit,
      search: currentSearch,
    });

    router.replace(`${pathname}?${query}`);
  };

  const handleChangePage = (page: number) => {
    const query = buildParams({
      page: String(page),
      limit: currentLimit,
      search: currentSearch,
    });

    router.replace(`${pathname}?${query}`);
  };

  const handleChangeLimit = (limit: string) => {
    const query = buildParams({
      page: String(PAGE_DEFAULT),
      limit,
      search: currentSearch,
    });

    router.replace(`${pathname}?${query}`);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Debounce untuk update search params
  useEffect(() => {
    debounce(() => {
      const query = buildParams({
        page: String(PAGE_DEFAULT),
        limit: currentLimit,
        search: searchInput,
      });

      router.replace(`${pathname}?${query}`);
    }, 500);
  }, [
    buildParams,
    searchInput,
    currentLimit,
    debounce,
    pathname,
    router,
    searchParams,
  ]);

  // Fetch categories
  const getCategories = async () => {
    const query = `page=${currentPage}&limit=${currentLimit}${
      currentSearch ? `&search=${currentSearch}` : ""
    }`;

    const res = await categoryServices.getCategories(query);
    return res.data.data;
  };

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["category", currentPage, currentLimit, currentSearch],
    queryFn: getCategories,
    placeholderData: keepPreviousData,
  });

  return {
    currentPage,
    currentLimit,
    currentSearch: searchInput,
    categoryData,
    isLoadingCategory,
    isRefetchingCategory,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    setURL,
    refetchCategory,
  };
};

export default useCategory;
