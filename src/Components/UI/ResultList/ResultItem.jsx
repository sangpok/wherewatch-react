import React from 'react';
import styled from 'styled-components';
import { DefaultStyle } from '..';

/* #region Style */
const ResultItemStyle = styled(DefaultStyle.Container)`
  border: 1px solid #e6e6e6;
  border-radius: 0.25rem;
  overflow: hidden;
  width: 100%;
  min-width: 11.25rem;
  cursor: pointer;
`;

const ItemImage = styled.div`
  background: #292929;
  width: 100%;
`;

const ItemImageContent = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
`;

const ItemInfo = styled(DefaultStyle.Container)`
  padding: 0.5rem 0;
  width: 100%;
`;

const ItemInfoContent = styled(DefaultStyle.Container)`
  align-items: flex-start;
  padding: 0 0.5rem;
  width: 100%;
  gap: 0.5rem;
`;

const NoItemImage = styled(DefaultStyle.Container)`
  width: 100%;
  aspect-ratio: 3 / 4;
  background: #292929;
  color: white;
`;

const TitleAndDateContainer = styled(DefaultStyle.Container)`
  align-items: flex-start;
  width: 100%;
`;

const ItemName = styled.p`
  font-size: 1rem;
  line-height: 1.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const ItemDate = styled.p`
  font-size: 0.75rem;
`;

const Ratio = styled.p`
  font-size: 0.75rem;
`;
/* #endregion */

export default function ResultItem({
  itemId,
  itemImagePath,
  itemName,
  itemDate,
  itemRatio,
  onClick,
}) {
  const handleClick = () => {
    onClick(itemId);
  };

  return (
    <ResultItemStyle onClick={handleClick}>
      <ItemImage>
        {(itemImagePath && (
          <ItemImageContent src={`https://image.tmdb.org/t/p/w300${itemImagePath}`} />
        )) || <NoItemImage>No Image</NoItemImage>}
        <div className="ottProviders"></div>
      </ItemImage>
      <ItemInfo>
        <ItemInfoContent>
          <TitleAndDateContainer>
            <ItemName>{itemName}</ItemName>
            <ItemDate>{itemDate}</ItemDate>
          </TitleAndDateContainer>
          <Ratio>{itemRatio}</Ratio>
        </ItemInfoContent>
      </ItemInfo>
    </ResultItemStyle>
  );
}
