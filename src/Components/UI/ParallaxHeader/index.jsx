import styled, { css } from 'styled-components';
import { DefaultStyle } from '../../UI';
import { MdHome, MdKeyboardBackspace } from 'react-icons/md';
import { useEffect, useState } from 'react';

const ParallaxedHeaderStyle = styled.div`
  width: 100%;
  height: ${({ defaultHeight }) => defaultHeight + 'rem'};
  background-image: url(${({ url }) => url});
  background-attachment: fixed;
  background-size: contain;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
`;

const ParallaxedOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: ${({ height, thresholdHeight }) => (height === thresholdHeight ? 'absolute' : 'fixed')};
  top: 0;
  width: 100%;
  height: ${({ height }) => height + 'rem'};
  padding: 1rem;
  background: linear-gradient(to bottom, transparent, #252525);
`;

const ItemTitle = styled.p`
  color: white;
  font-weight: 800;
  font-size: 2rem;
`;

const ItemTitleMini = styled.p`
  color: white;
  font-weight: 800;
  font-size: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const MiniHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  height: ${({ thresholdHeight }) => thresholdHeight + 'rem'};
  padding: 1rem;
  background: #252525;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-blend-mode: overlay;
  transition: 0.3s top cubic-bezier(0.075, 0.82, 0.165, 1);

  ${({ height, thresholdHeight }) =>
    height === thresholdHeight
      ? css`
          top: '0rem';
          box-shadow: 0 0 2rem 0rem #252525;
        `
      : css`
          top: ${({ thresholdHeight }) => -thresholdHeight + 'rem'};
        `}
`;

const ButtonContainer = styled(DefaultStyle.Container)`
  justify-content: flex-start;
  flex-direction: row;

  path {
    color: white;
  }
`;

const BackButton = styled(DefaultStyle.Button)`
  width: 2.625rem;
  height: 2.625rem;
`;

const HomeButton = styled(DefaultStyle.Button)`
  width: 2.625rem;
  height: 2.625rem;
`;

const ButtonComponent = (props) => {
  const { onBackButtonClick, onHomeButtonClick } = props;

  const handleBackButtonClick = () => {
    onBackButtonClick();
  };

  const handleHomeButtonClick = () => {
    onHomeButtonClick();
  };

  return (
    <ButtonContainer>
      <BackButton onClick={handleBackButtonClick}>
        <MdKeyboardBackspace size="1.5rem" />
      </BackButton>
      <HomeButton onClick={handleHomeButtonClick}>
        <MdHome size="1.5rem" />
      </HomeButton>
    </ButtonContainer>
  );
};

export default function ParallaxHeader(props) {
  const { url, itemName } = props;
  const { defaultHeight, thresholdHeight } = props;
  const { onBackButtonClick, onHomeButtonClick } = props;

  const [headerHeight, setHeaderHeight] = useState(defaultHeight / 16);

  const handleWindowScroll = (e) => {
    const scrollY = window.scrollY;
    const scrollThreshold = defaultHeight - thresholdHeight;

    if (scrollY >= scrollThreshold) {
      setHeaderHeight(thresholdHeight / 16);
    } else {
      setHeaderHeight((defaultHeight - scrollY) / 16);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    handleWindowScroll();

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  const handleBackButtonClick = () => {
    onBackButtonClick();
  };

  const handleHomeButtonClick = () => {
    onHomeButtonClick();
  };

  return (
    <>
      <ParallaxedHeaderStyle defaultHeight={defaultHeight / 16} url={url}>
        <ParallaxedOverlay thresholdHeight={thresholdHeight / 16} height={headerHeight}>
          <ButtonComponent
            onBackButtonClick={handleBackButtonClick}
            onHomeButtonClick={handleHomeButtonClick}
          />
          <ItemTitle>{itemName}</ItemTitle>
        </ParallaxedOverlay>
      </ParallaxedHeaderStyle>

      <MiniHeader url={url} thresholdHeight={thresholdHeight / 16} height={headerHeight}>
        <ButtonComponent
          onBackButtonClick={handleBackButtonClick}
          onHomeButtonClick={handleHomeButtonClick}
        />
        <ItemTitleMini>{itemName}</ItemTitleMini>
      </MiniHeader>
    </>
  );
}
