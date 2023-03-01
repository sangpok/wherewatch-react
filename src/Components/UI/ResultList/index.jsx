import React from 'react';
import styled from 'styled-components';
import { DefaultStyle, SectionWithTitle, ListComponent } from '..';

import ResultItem from './ResultItem';

/* #region Style */
const TypeHeaderContainer = styled(DefaultStyle.Container)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const SectionName = styled.p`
  font-weight: 700;
`;

const SectionResultCount = styled.p`
  font-size: 1rem;
  color: #4d4d4d;
`;
/* #endregion */

const returnResultItemProps = (result, onItemClick) => {
  const itemNameMap = {
    tv: result.name,
    movie: result.title,
  };

  const itemDateMap = {
    tv: new Date(result.first_air_date).getFullYear() || '-',
    movie: new Date(result.release_date).getFullYear() || '-',
  };

  const ResultItemComponentProps = {
    itemId: result.id,
    itemImagePath: result.poster_path,
    itemName: itemNameMap[result.media_type],
    itemDate: itemDateMap[result.media_type],
    itemRatio: result.vote_average ? result.vote_average.toFixed(1) : '평점없음',
    onClick: (itemId) => onItemClick(itemId, result.media_type),
  };

  return ResultItemComponentProps;
};

const descendingSortByDate = (a, b) => b.itemDate - a.itemDate;

export default function ResultList({ sectionName, results, onItemClick }) {
  if (!results.length) {
    return;
  }

  const typeHeader = (
    <TypeHeaderContainer>
      <SectionName>{sectionName}</SectionName>
      <SectionResultCount>{results.length}개 결과</SectionResultCount>
    </TypeHeaderContainer>
  );

  const resultItems = results
    .map((result) => returnResultItemProps(result, onItemClick))
    .sort(descendingSortByDate)
    .map((componentProps) => <ResultItem key={componentProps.itemId} {...componentProps} />);

  return (
    <SectionWithTitle title={typeHeader}>
      <ListComponent gap="0.5rem" itemList={resultItems} />
    </SectionWithTitle>
  );
}
