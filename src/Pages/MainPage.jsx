import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { DefaultStyle, WherewatchLogo, SearchBox } from '../Components/UI';

const PageContainer = styled.div`
  position: relative;
  background: white;
  width: 100%;
  height: 100vh;
  max-width: 52.5rem;
  margin: 0 auto;
  box-shadow: 0 0 0.3rem 0 black;
`;

const MainContainer = styled(DefaultStyle.Container)`
  justify-content: flex-start;
  gap: 1.5rem;
  padding: 0 1.5rem;
  width: ${(props) => (props.isSearchBoxClicked ? '0vw' : '100%')};
  transition: 0.1s all cubic-bezier(0.075, 0.82, 0.165, 1);
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

const SearchBoxComponent = () => {
  const [searchResultResource, setSearchResultResource] = useState(null);

  const navigate = useNavigate();
  const [searchingMode, setSearchingMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

const MainPage = () => {
  return (
    <PageContainer>
      <MainContainer>
        <WherewatchLogo />
        <SearchBoxComponent />
      </MainContainer>
    </PageContainer>
  );
};

export default React.memo(MainPage);
