import React, { useState } from 'react';
import { useDeferredValue } from 'react';

/** Style imported */
import styled, { css } from 'styled-components';
import { DefaultStyle } from '../../UI';

/** Context Provider imported */
import { DataProvider } from './DataProvider';

/** Components imported */
import InputBoxComponent from './InputBoxComponent';
import RelatedListComponent from './RelatedListBoxComponent';

/* #region SearchBox Style */
const SearchBoxStyle = styled(DefaultStyle.Container)`
  width: 100%;
  border: 0.0625rem solid #467ada;

  ${(props) =>
    props.searchingMode
      ? css`
          border-radius: 0.25rem;
        `
      : css`
          border-radius: 5rem;
        `}
`;
/* #endregion */

const SearchBox = ({ searchQuery, onSearchQueryChange, onSearchingModeChange, onSubmit }) => {
  const [searchingMode, setSearchingMode] = useState(false);
  const [relatedListVisible, setRealtedListVisible] = useState(false);
  const deferredQuery = useDeferredValue(searchQuery);

  /* #region SearchBoxComponent Events */
  const handleSearchQueryChange = (query) => {
    onSearchQueryChange(query);
  };

  const handleSearchingMode = (value) => {
    setRealtedListVisible(value);
    setSearchingMode(value);
    setComponentPropertise((prevState) => ({
      ...prevState,
      BackButtonVisible: value,
      ResultCountLabelVisible: value,
    }));

    if (onSearchingModeChange && searchingMode !== value) {
      onSearchingModeChange(value);
    }
  };

  const handleBackButtonClicked = () => {
    setComponentPropertise((prevState) => ({
      ...prevState,
      BackButtonVisible: false,
      ResultCountLabelVisible: false,
    }));
  };

  const handleSearchButtonClicked = () => {
    if (onSubmit) {
      onSubmit(searchQuery);
    }
  };

  const ComponentEvents = {
    onSearchQueryChange: handleSearchQueryChange,
    onSearchingMode: handleSearchingMode,
    onBackButtonClicked: handleBackButtonClicked,
    onSearchButtonClicked: handleSearchButtonClicked,
  };
  /* #endregion */

  /* #region SearchBoxComponent Properties */
  const [ComponentProperties, setComponentPropertise] = useState({
    BackButtonVisible: false,
    ResultCountLabelVisible: false,
  });
  /* #endregion */

  return (
    <DataProvider searchQuery={deferredQuery}>
      <SearchBoxStyle searchingMode={searchingMode}>
        <InputBoxComponent
          searchQuery={searchQuery}
          {...ComponentProperties}
          {...ComponentEvents}
        />
        {relatedListVisible && <RelatedListComponent />}
      </SearchBoxStyle>
    </DataProvider>
  );
};

export default SearchBox;
