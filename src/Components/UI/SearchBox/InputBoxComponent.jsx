import styled from 'styled-components';
import { DefaultStyle } from '../../UI';
import { MdSearch, MdKeyboardBackspace } from 'react-icons/md';

import { useFetchData } from './DataProvider';

/* #region Styles */
const InputBox = styled(DefaultStyle.Container)`
  width: 100%;
  height: 2.625rem;
  padding: 0.5rem 0;
  box-sizing: border-box;
`;

const InputBoxContent = styled(DefaultStyle.Container)`
  flex-direction: row;
  gap: 0.375rem;
  width: 100%;
  height: 100%;
  padding: 0 0.75rem;
`;

const BackButton = styled(DefaultStyle.Button)`
  min-width: 1.75rem;
  min-height: 1.75rem;

  path {
    color: #467ada;
  }
`;

const SearchInput = styled(DefaultStyle.Input)`
  width: 100%;
  height: 100%;
`;

const ResultCountLabel = styled.p`
  font-size: 0.75rem;
  color: #4d4d4d;
  min-width: fit-content;
`;

const SearchButton = styled(DefaultStyle.Button)`
  min-width: 1.75rem;
  min-height: 1.75rem;

  path {
    color: #467ada;
  }
`;
/* #endregion */

/* #region ResultCount - Sub-component */
const ResultCount = () => {
  const { data: searchData, loading, searchQuery } = useFetchData();

  if (loading) {
    return !!searchQuery && <ResultCountLabel>Loading..</ResultCountLabel>;
  }

  return (
    !!searchQuery && <ResultCountLabel>{searchData?.total_results || 0}개 결과</ResultCountLabel>
  );
};
/* #endregion */

export default function InputBoxComponent(props) {
  const { BackButtonVisible, ResultCountLabelVisible } = props;
  const { onSearchingMode, onBackButtonClicked, onSearchButtonClicked } = props;
  const { searchQuery, onSearchQueryChange } = props;

  const handleInputedQueryChange = (e) => {
    onSearchQueryChange(e.target.value);
  };

  const handleSearchInputKeyUp = (e) => {
    const KEY_ESCAPE = 27;
    if (e.keyCode === KEY_ESCAPE) {
      onSearchingMode(false);
      return;
    }

    const KEY_ENTER = 13;
    if (e.keyCode === KEY_ENTER) {
      onSearchButtonClicked();
      onSearchingMode(false);
      return;
    }

    onSearchingMode(true);
  };

  const handleSearchInputClick = () => {
    onSearchingMode(true);
  };

  const handleBackButtonClick = () => {
    onSearchingMode(false);
    onBackButtonClicked();
  };

  const handleSearchButtonClick = () => {
    onSearchButtonClicked();
  };

  const handleSearchInputBlur = () => {
    // onSearchingMode(false);
  };

  return (
    <InputBox>
      <InputBoxContent>
        {BackButtonVisible && (
          <BackButton onClick={handleBackButtonClick}>
            <MdKeyboardBackspace size="1rem" />
          </BackButton>
        )}
        <SearchInput
          placeholder="작품명을 입력하세요..."
          value={searchQuery}
          onChange={handleInputedQueryChange}
          onKeyUp={handleSearchInputKeyUp}
          onClick={handleSearchInputClick}
          onBlur={handleSearchInputBlur}
        />
        {ResultCountLabelVisible && <ResultCount />}
        <SearchButton onClick={handleSearchButtonClick}>
          <MdSearch size="1rem" />
        </SearchButton>
      </InputBoxContent>
    </InputBox>
  );
}
