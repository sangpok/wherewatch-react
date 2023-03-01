import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useCredit, useDetail } from '../API';
import { CastList, DefaultStyle, ParallaxHeader } from '../Components/UI';

const PageContainer = styled.body`
  background: #252525;
  height: 100vh;
`;

const ContentSection = styled.div`
  background: #252525;
  color: white;
  width: 100%;
`;

const SectionContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const SectionTitle = styled.p`
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  color: white;
  line-height: 1.5rem;
`;

const SectionWithTitle = ({ title, children }) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent>{children}</SectionContent>
    </SectionContainer>
  );
};

const OTTProviderListContainer = styled(DefaultStyle.Container)`
  gap: 1rem;
`;

const OTTProviderContainer = styled(DefaultStyle.Container)`
  flex-direction: row;
  gap: 1rem;
  background: ${({ backgroundColor }) => backgroundColor};
  width: 100%;
  padding: 4px 12px;
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 4px;
  box-shadow: 0 0 3px 0 ${({ borderColor }) => borderColor};
`;

const OTTImage = styled.img`
  width: 2.8125rem;
  height: 2.8125rem;
  object-fit: cover;
`;

const OTTName = styled.p`
  font-weight: 800;
  width: 100%;
  text-align: center;
  color: ${({ color }) => color};
`;

const NoOTTProvider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #252525, black);
  border-radius: 0.25rem;
  color: white;
  font-weight: 800;
  height: 3rem;
  width: 100%;
`;

const OTTProvider = ({ logo_path, provider_name }) => {
  const colorMap = {
    Netflix: {
      backgroundColor: 'black',
      content: 'white',
      border: 'black',
    },
    wavve: {
      backgroundColor: 'white',
      content: 'black',
      border: '#0c54fe',
    },
    'Netflix basic with Ads': {
      backgroundColor: 'white',
      content: 'black',
      border: '#e20b13',
    },
    Watcha: {
      backgroundColor: 'black',
      content: 'white',
      border: 'black',
    },
    'Disney Plus': {
      backgroundColor: '#0e367b',
      content: 'white',
      border: '#0e367b',
    },
    'Naver Store': {
      backgroundColor: '#01c73c',
      content: 'white',
      border: '#01c73c',
    },
    'Google Play Movies': {
      backgroundColor: 'white',
      content: 'black',
      border: '#08c1fa',
    },
  };

  return (
    <OTTProviderContainer
      borderColor={colorMap[provider_name]?.border || 'black'}
      backgroundColor={colorMap[provider_name]?.backgroundColor || 'white'}
    >
      <OTTImage src={`https://image.tmdb.org/t/p/w45${logo_path}`} alt={provider_name} />
      <OTTName color={colorMap[provider_name]?.content || 'black'}>{provider_name}</OTTName>
    </OTTProviderContainer>
  );
};

const DataComponent = ({ itemId, itemType }) => {
  const navigate = useNavigate();
  const { data: detailData } = useDetail(itemId, itemType);
  const { data: creditData } = useCredit(itemId, itemType);

  if (!detailData || !creditData) return;

  const parallaxHeaderConfig = {
    defaultHeight: 250,
    thresholdHeight: 74,
    url: `https://image.tmdb.org/t/p/w1280${detailData.backdrop_path || detailData.poster_path}`,
    itemName: detailData.name || detailData.title,
    onBackButtonClick: () => navigate(-1),
    onHomeButtonClick: () => navigate('/'),
  };

  const OTTProviderList = {
    ads: detailData['watch/providers']?.results?.KR?.ads || [],
    flatrate: detailData['watch/providers']?.results?.KR?.flatrate || [],
    buy: detailData['watch/providers']?.results?.KR?.buy || [],
    free: detailData['watch/providers']?.results?.KR?.free || [],
    rent: detailData['watch/providers']?.results?.KR?.rent || [],
  };

  const cannotWatch =
    Object.values(OTTProviderList).filter((results) => !!results.length).length === 0;

  const titleMap = {
    ads: '광고',
    flatrate: '요금제',
    buy: '구매',
    free: '무료',
    rent: '대여',
  };

  return (
    <>
      <ParallaxHeader {...parallaxHeaderConfig} />
      <ContentSection>
        {cannotWatch && (
          <SectionWithTitle title="미제공 콘텐츠">
            <OTTProviderListContainer>
              <NoOTTProvider>대한민국에 콘텐츠를 제공하지 않아용 ㅠ</NoOTTProvider>
            </OTTProviderListContainer>
          </SectionWithTitle>
        )}
        {Object.entries(OTTProviderList).map(
          ([key, value]) =>
            key &&
            value &&
            !!value.length && (
              <SectionWithTitle key={key} title={titleMap[key]}>
                <OTTProviderListContainer>
                  {OTTProviderList[key].map(({ logo_path, provider_name }) => (
                    <OTTProvider
                      key={provider_name}
                      logo_path={logo_path}
                      provider_name={provider_name}
                    />
                  ))}
                </OTTProviderListContainer>
              </SectionWithTitle>
            )
        )}
        {detailData.tagline && (
          <SectionWithTitle title="Tagline">{detailData.tagline}</SectionWithTitle>
        )}
        {detailData.overview && (
          <SectionWithTitle title="개요">{detailData.overview}</SectionWithTitle>
        )}
        <SectionWithTitle title="출연진">
          <CastList creditData={creditData} />
        </SectionWithTitle>
      </ContentSection>
    </>
  );
};

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemInfo, setItemInfo] = useState({ itemId: null, itemType: null });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const URLItemId = searchParams.get('id');
    const URLItemType = searchParams.get('type');

    if (!URLItemId || !URLItemType) {
      navigate('/');
      return;
    }

    setItemInfo({
      itemId: URLItemId,
      itemType: URLItemType,
    });
  }, []);

  return (
    <PageContainer>
      <DataComponent {...itemInfo} />
    </PageContainer>
  );
};

export default DetailPage;
