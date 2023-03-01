import { useEffect, useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';

const ListContent = styled.ul`
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => gap};
  width: 100%;
  text-decoration: none;
  overflow: auto;
  white-space: nowrap;

  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-corner {
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #a9a9a9;
    border: 4px solid transparent;
    border-radius: 50px;
    background-clip: content-box;
    overflow: hidden;
  }
`;

export default function ListComponent({ gap, itemList }) {
  const containerRef = useRef(null);
  const [isScrollingHorizontally, setIsScrollingHorizontally] = useState(false);

  const handleWheel = (event) => {
    if (isScrollingHorizontally) {
      const container = containerRef.current;
      const isScrollStartPos = container.scrollLeft === 0 && event.deltaY < 0;
      const isScrollEndPos = container.scrollLeft + container.offsetWidth >= container.scrollWidth && event.deltaY > 0; // prettier-ignore

      if (isScrollStartPos || isScrollEndPos) {
        return;
      }

      event.preventDefault();
      container.scrollLeft += event.deltaY;
    }
  };
  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => window.removeEventListener('wheel', handleWheel);
  }, [isScrollingHorizontally]);

  const handleMouseOver = () => {
    setIsScrollingHorizontally(true);
  };

  const handleMouseOut = () => {
    setIsScrollingHorizontally(false);
  };

  const EventList = {
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
  };

  const listContainerConfigure = {
    gap,
    ...EventList,
  };

  return (
    <ListContent ref={containerRef} {...listContainerConfigure}>
      {itemList}
    </ListContent>
  );
}
