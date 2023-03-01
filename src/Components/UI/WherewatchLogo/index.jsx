import styled from 'styled-components';
import { DefaultStyle } from '..';

const WherewatchContainer = styled(DefaultStyle.Container)`
  gap: 0.5rem;
  margin-top: 10rem;
`;

const WherewatchText = styled.p`
  font-weight: 700;
  font-size: 3rem;
  line-height: 2.375rem;
  color: #467ada;
`;

const WherewatchDescribe = styled.p`
  font-weight: 700;
  font-size: 1.1rem;

  color: #282828;
`;

export default function WherewatchLogo() {
  return (
    <WherewatchContainer>
      <WherewatchText>Wherewatch</WherewatchText>
      <WherewatchDescribe>: Find the OTT provider by search!</WherewatchDescribe>
    </WherewatchContainer>
  );
}
