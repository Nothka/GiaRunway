// useSearchItems.js
import useFetch from '../hooks/useFetch';

const useSearchItems = (searchTerm) => {
  const { data: items, isLoading, error } = useFetch(`/products?filters[title_contains]=${searchTerm}`);
  
  return { items, isLoading, error };
};

export default useSearchItems;
