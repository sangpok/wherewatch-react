import styled from 'styled-components';

const SectionContainer = styled.div`
  width: 100%;
`;

const SectionTitle = styled.div`
  margin-bottom: 0.5rem;
`;

const SectionContent = styled.div``;

export default function SectionWithTitle({ title, children }) {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent>{children}</SectionContent>
    </SectionContainer>
  );
}
