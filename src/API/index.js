import { useFetch } from '../Hooks';

const API_PATH = 'https://api.themoviedb.org/3';
const API_KEY = 'ed6cc14023a74712f2b2ca3d7695bc00';
const API_DEFAULT_OPTION = '&language=ko-KR&page=1&include_adult=false&region=ko';

export function useSearchQuery(query, encoded = false) {
  return useFetch(
    `${API_PATH}/search/multi?api_key=${API_KEY}&query=${
      encoded ? query : encodeURI(query)
    }${API_DEFAULT_OPTION}`,
    query
  );
}

// api.themoviedb.org/3/tv/135897?api_key=ed6cc14023a74712f2b2ca3d7695bc00&language=ko-KR&append_to_response=watch%2Fproviders
export function useDetail(itemId, itemType) {
  return useFetch(
    `${API_PATH}/${itemType}/${itemId}?api_key=${API_KEY}${API_DEFAULT_OPTION}&append_to_response=watch%2Fproviders`,
    itemId
  );
}

export function useCredit(itemId, itemType) {
  return useFetch(
    `${API_PATH}/${itemType}/${itemId}/credits?api_key=${API_KEY}${API_DEFAULT_OPTION}`,
    itemId
  );
}
