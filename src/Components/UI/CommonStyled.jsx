import styled, { css } from 'styled-components';

const ResetStyle = css`
  background: none;
  border: none;
  outline: none;
  appearance: none;
`;

const FlexBoxStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DefaultStyleContainer = styled.div`
  ${FlexBoxStyle}
`;

const DefaultStyleButton = styled.button`
  ${ResetStyle}
  ${FlexBoxStyle}

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #9b9b9b;
  }

  cursor: pointer;

  border-radius: 5rem;
  overflow: hidden;
`;

const DefaultStyleInput = styled.input`
  ${ResetStyle}

  width: 100%;
`;

const DefaultStyleUl = styled.ul`
  ${FlexBoxStyle}

  text-decoration: none;
`;

const DefaultStyleLi = styled.li`
  ${FlexBoxStyle}
`;

const DefaultStyle = {
  Container: DefaultStyleContainer,
  Button: DefaultStyleButton,
  Input: DefaultStyleInput,
  Ul: DefaultStyleUl,
  Li: DefaultStyleLi,
};

export { ResetStyle, DefaultStyle };
