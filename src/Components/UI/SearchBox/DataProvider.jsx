import { createContext, useContext } from 'react';
import { useSearchQuery } from '../../../API';

const FetchDataContext = createContext(null);

export function useFetchData() {
  return useContext(FetchDataContext);
}

export function DataProvider({ searchQuery, children }) {
  const { data, loading, error } = useSearchQuery(searchQuery);

  return (
    <FetchDataContext.Provider value={{ data, loading, error, searchQuery }}>
      {children}
    </FetchDataContext.Provider>
  );
}
