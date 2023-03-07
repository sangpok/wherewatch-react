import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styled, { css } from 'styled-components';
import { DefaultStyle, ResultList, SearchBox } from '../Components/UI';

import { useSearchQuery } from '../API';

/* #region Style */
const PageContainer = styled(DefaultStyle.Container)`
  position: relative;
  background: white;
  width: 100%;
  max-width: 52.5rem;
  height: fit-content;
  padding: 1.5rem;
  margin: 0 auto;
  gap: 1.5rem;
`;

const HeaderContainer = styled(DefaultStyle.Container)`
  flex-direction: row;
  gap: 0.75rem;
  width: 100%;
`;

const HomeButton = styled(DefaultStyle.Button)`
  color: #467ada;
  min-width: 2.125rem;
  min-height: 2.125rem;
  border-radius: 50px;
`;

const SearchBoxContainer = styled(DefaultStyle.Container)`
  width: 100%;

  transition: 0.1s all cubic-bezier(0.075, 0.82, 0.165, 1);
  ${(props) =>
    props.searchingMode
      ? css`
          justify-content: flex-start;
          position: absolute;
          padding: 0.75rem;
          top: 0;
          left: 0;
          height: 100vh;
          background-color: white;
        `
      : ''};
`;
/* #endregion */

const DataComponent = ({ searchQuery, onItemClick }) => {
  const { data, loading, error } = useSearchQuery(searchQuery);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error다 Error!: {error.message}</div>;
  }

  if (!data) {
    return;
  }

  const searchResults = data.results;
  if (!searchResults.length) {
    return <div>검색 결과가 업서용 ㅠ</div>;
  }

  const TVResults = searchResults.filter((result) => result.media_type === 'tv');
  const movieResults = searchResults.filter((result) => result.media_type === 'movie');

  const handleItemClick = (itemId, itemType) => {
    onItemClick(itemId, itemType);
  };

  return (
    <>
      <ResultList sectionName="TV 프로그램" results={TVResults} onItemClick={handleItemClick} />
      <ResultList sectionName="영화" results={movieResults} onItemClick={handleItemClick} />
    </>
  );
};

const createResource = (fetchPromise) => {
  let status = 'pending'; // pending, fulfillment, error
  let fetchResult = null;

  const onFulfillment = (response) => {
    status = 'fulfillment';
    fetchResult = response;
  };

  const onRejected = (error) => {
    status = 'error';
    fetchResult = error;
  };

  const suspender = fetchPromise.then(onFulfillment, onRejected);

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw fetchResult;
      default:
        return fetchResult;
    }
  };

  return { read };
};

const API_PATH = 'https://api.themoviedb.org/3';
const API_KEY = 'ed6cc14023a74712f2b2ca3d7695bc00';
const API_DEFAULT_OPTION = '&language=ko-KR&page=1&include_adult=false&region=ko';

const fetchSearch = async (searchQuery, encoded = false) => {
  return fetch(
    `${API_PATH}/search/multi?api_key=${API_KEY}&query=${
      encoded ? searchQuery : encodeURI(searchQuery)
    }${API_DEFAULT_OPTION}`
  )
    .then((res) => res.json())
    .then((data) => data);
};

const createSearchResultResource = (searchQuery) => {
  return createResource(fetchSearch(searchQuery));
};

const SearchBoxComponent = ({ initialQuery }) => {
  const [searchResultResource, setSearchResultResource] = useState(null);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [searchingMode, setSearchingMode] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResultResource(null);
    }

    setSearchResultResource(createSearchResultResource(searchQuery));
  }, [searchQuery]);

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearchingModeChange = (value) => {
    setSearchingMode(value);

    if (!value) {
      setSearchQuery('');
    }
  };

  const handleSubmit = (searchQuery) => {
    navigate(`/search?query=${searchQuery}`);
  };

  if (!searchResultResource) {
    return;
  }

  return (
    <SearchBoxContainer searchingMode={searchingMode}>
      <SearchBox
        searchQuery={searchQuery}
        searchResultResource={searchResultResource}
        onSearchQueryChange={handleSearchQueryChange}
        onSearchingModeChange={handleSearchingModeChange}
        onSubmit={handleSubmit}
      />
    </SearchBoxContainer>
  );
};

const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageQuery, setPageQuery] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const URLQuery = searchParams.get('query');

    if (!URLQuery) {
      navigate('/');
      return;
    }

    setPageQuery(URLQuery);
  }, [location]);

  const handleItemClick = (itemId, itemType) => {
    navigate(`/detail?id=${itemId}&type=${itemType}`);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <HomeButton onClick={() => navigate('/')}>B</HomeButton>
        <SearchBoxComponent initialQuery={pageQuery} />
      </HeaderContainer>

      <DataComponent searchQuery={pageQuery} onItemClick={handleItemClick} />
    </PageContainer>
  );
};

export default SearchResultPage;
