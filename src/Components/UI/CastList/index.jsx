import styled from 'styled-components';
import ListComponent from '../ListComponent';

const CastItemContainer = styled.div`
  display: inline-block;
  min-width: 185px;
  border-radius: 0.25rem;
  overflow: hidden;
  vertical-align: top;

  & + & {
    margin-left: 0.5rem;
  }
`;

const CastItemImg = styled.img``;

const NoCastItemImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #252525, black);
  width: 185px;
  aspect-ratio: 185 / 278;
  color: white;
  font-weight: 800;
`;

const CastItemInfoContainer = styled.div`
  height: 100%;
`;

const CastItemActorName = styled.p`
  color: white;
  font-weight: 800;
`;

const CastItemCharacterName = styled.p`
  color: white;
  font-size: 0.75rem;
`;

const CastItem = ({ castImage, name, character }) => {
  return (
    <CastItemContainer>
      {(castImage && <CastItemImg src={`https://image.tmdb.org/t/p/w185${castImage}`} />) || (
        <NoCastItemImage>No Profile</NoCastItemImage>
      )}
      <CastItemInfoContainer>
        <CastItemActorName>{name}</CastItemActorName>
        <CastItemCharacterName>{character}</CastItemCharacterName>
      </CastItemInfoContainer>
    </CastItemContainer>
  );
};

export default function CastList({ creditData }) {
  const castItems = creditData.cast.map(({ profile_path, name, character }) => (
    <CastItem key={name} castImage={profile_path} name={name} character={character} />
  ));

  return <ListComponent gap="0.5rem" onItemClick={console.log} itemList={castItems} />;
}
