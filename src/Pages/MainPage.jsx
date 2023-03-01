import React, { useState } from 'react';
import { useDeferredValue } from 'react';
import { useEffect } from 'react';
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

const MainPage = () => {
  const navigate = useNavigate();
  const [searchingMode, setSearchingMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);

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

  return (
    <PageContainer>
      <MainContainer>
        <WherewatchLogo />
        <SearchBoxContainer searchingMode={searchingMode}>
          <SearchBox
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            onSearchingModeChange={handleSearchingModeChange}
            onSubmit={handleSubmit}
          />
        </SearchBoxContainer>
      </MainContainer>
    </PageContainer>
  );
};

export default React.memo(MainPage);
