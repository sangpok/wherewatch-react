import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { DefaultStyle } from '../../UI';

/* #region Styles */
const ResultList = styled(DefaultStyle.Ul)`
  width: 100%;
  padding: ${(props) => (props.isResultExist ? '0.375rem' : '0')} 0;
`;

const ResultItemStyle = styled(DefaultStyle.Li)`
  width: 100%;
  height: 3rem;
  padding: 0.375rem 0;

  &:hover {
    background-color: #e6e6e6;
  }

  cursor: pointer;
`;

const ResultItemContent = styled(DefaultStyle.Container)`
  flex-direction: row;
  gap: 1rem;
  padding: 0 0.75rem;
  width: 100%;
`;

const ItemImageWrapper = styled.div`
  min-width: 2rem;
  height: 2rem;
  border-radius: 3rem;
  overflow: hidden;
`;

const ItemImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoItemImage = styled.div`
  background-color: #467ada;
  width: 100%;
  height: 100%;
`;

const ItemInfoContainer = styled.div`
  width: 100%;
`;

const ItemInfoTitle = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ItemInfoDate = styled.p`
  font-size: 0.75rem;
  color: #525252;
`;

const ItemTypeWrapper = styled(DefaultStyle.Container)`
  width: 2.2rem;
  height: 100%;
`;

const ItemType = styled.p`
  font-size: 0.75rem;
`;
/* #endregion */

/* #region ResultItem -- sub-component */
const ResultItem = React.memo(({ id, image, name, date, type, media_type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail?id=${id}&type=${media_type}`);
  };

  return (
    <ResultItemStyle onClick={handleClick}>
      <ResultItemContent>
        <ItemImageWrapper>
          {(image && <ItemImage src={`https://image.tmdb.org/t/p/w300${image}`} />) || (
            <NoItemImage />
          )}
        </ItemImageWrapper>
        <ItemInfoContainer>
          <ItemInfoTitle>{name}</ItemInfoTitle>
          <ItemInfoDate>{date}</ItemInfoDate>
        </ItemInfoContainer>
        <ItemTypeWrapper>
          <ItemType>{type}</ItemType>
        </ItemTypeWrapper>
      </ResultItemContent>
    </ResultItemStyle>
  );
});
/* #endregion */

const ResultListComponent = ({ searchResultResource }) => {
  const searchResult = searchResultResource.read();
  const isResultExist = !!searchResult.length;

  return (
    <ResultList isResultExist={isResultExist}>
      {searchResult.results
        .map((result) => {
          const mediaTypeMap = {
            tv: 'TV',
            movie: '영화',
            person: '인물',
          };

          const imageMap = {
            tv: result.poster_path,
            movie: result.poster_path,
            person: result.profile_path,
          };

          const nameMap = {
            tv: result.name,
            movie: result.title,
            person: result.name,
          };

          const dateMap = {
            tv: new Date(result.first_air_date).getFullYear() || '-',
            movie: new Date(result.release_date).getFullYear() || '-',
            person: result.known_for_department,
          };

          const mutatedResult = {
            id: result.id,
            image: imageMap[result.media_type],
            name: nameMap[result.media_type],
            date: dateMap[result.media_type],
            type: mediaTypeMap[result.media_type],
            media_type: result.media_type,
          };

          return mutatedResult;
        })
        .sort((a, b) => b.date - a.date)
        .map((result) => (
          <ResultItem key={result.id} {...result} />
        ))}
    </ResultList>
  );
};

export default function RelatedListComponent({ searchResultResource }) {
  return (
    <Suspense fallback={<ResultList>Loading...</ResultList>}>
      {searchResultResource && <ResultListComponent searchResultResource={searchResultResource} />}
    </Suspense>
  );
}
