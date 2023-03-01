import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styled, { css } from 'styled-components';
import { DefaultStyle, ResultList, SearchBox } from '../Components/UI';

const PageContainer = styled.div`
  background: white;
  width: 100%;
  height: 100vh;
  padding: 1rem;
`;

const PageTitle = styled.h3`
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const useTodos = ({ page }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [page]);

  return data;
};

const PaginationContainer = styled.div`
  width: 100%;
`;

const PaginationList = styled.ul`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const PagenationItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;

  ${({ current }) =>
    current &&
    css`
      font-weight: 800;
      color: green;
    `}
`;

const Pagination = ({ page, maxPage, onPage }) => {
  return (
    <PaginationContainer>
      <PaginationList>
        {new Array(maxPage).fill().map((_, index) => (
          <PagenationItem
            onClick={() => onPage(index + 1)}
            key={index}
            current={index + 1 === page}
          >
            {index + 1}
          </PagenationItem>
        ))}
      </PaginationList>
    </PaginationContainer>
  );
};

const TodoItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem 0;

  & + & {
    border-top: 1px solid #e9e9e9;
  }
`;

const TodoPosts = ({ page }) => {
  const todos = useTodos({ page });

  if (!todos) {
    return;
  }

  return todos.map((todo) => (
    <TodoItem key={todo.id}>
      <p>{todo.id}</p>
      <p>{todo.title}</p>
    </TodoItem>
  ));
};

const TestPage = () => {
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    maxPage: 10,
  });

  const handlePage = (page) => {
    setPaginationInfo((prevState) => ({
      ...prevState,
      page,
    }));
  };

  return (
    <PageContainer>
      <PageTitle>Pagination Test</PageTitle>
      <div className="Todo-Post-Section">
        <TodoPosts {...paginationInfo} />
        <Pagination {...paginationInfo} onPage={handlePage} />
      </div>
    </PageContainer>
  );
};

export default TestPage;
