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

const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [pageQuery, setPageQuery] = useState('');
  const [searchingMode, setSearchingMode] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const URLQuery = searchParams.get('query');

    if (!URLQuery) {
      navigate('/');
      return;
    }

    setSearchQuery(URLQuery);
    setPageQuery(URLQuery);
  }, [location]);

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearchingModeChange = (value) => {
    setSearchingMode(value);

    if (!value) {
      setSearchQuery(pageQuery);
    }
  };

  const handleSubmit = (searchQuery) => {
    navigate(`/search?query=${searchQuery}`);
  };

  const handleItemClick = (itemId, itemType) => {
    // console.log(itemId);
    navigate(`/detail?id=${itemId}&type=${itemType}`);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <HomeButton onClick={() => navigate('/')}>B</HomeButton>
        <SearchBoxContainer searchingMode={searchingMode}>
          <SearchBox
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            onSearchingModeChange={handleSearchingModeChange}
            onSubmit={handleSubmit}
          />
        </SearchBoxContainer>
      </HeaderContainer>

      <DataComponent searchQuery={pageQuery} onItemClick={handleItemClick} />
    </PageContainer>
  );
};

export default SearchResultPage;
