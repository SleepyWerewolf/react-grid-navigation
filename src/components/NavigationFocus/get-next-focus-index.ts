import { RefObject } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

const DirectionalKeyMap: { [key: string]: Direction | undefined } = {
  arrowup: 'up',
  w: 'up',
  arrowright: 'right',
  d: 'right',
  arrowdown: 'down',
  s: 'down',
  arrowleft: 'left',
  a: 'left',
};

export const getDirection = (key: string) => DirectionalKeyMap[key];

export const getNextFocusIndex = (refObjects: RefObject<HTMLDivElement>[], activeIndex: number, direction: Direction) => {
  if (!refObjects[0].current) {
    return activeIndex;
  }

  const gridNum = refObjects.length;
  const baseOffset = refObjects[0].current.offsetTop;
  const breakIndex = refObjects.findIndex(item => item.current ? item.current.offsetTop > baseOffset : false)
  const itemsPerRow = breakIndex === -1 ? gridNum : breakIndex;

  const isTopRow = activeIndex <= itemsPerRow - 1;
  const isBottomRow = activeIndex >= gridNum - itemsPerRow;
  const isLeftColumn = activeIndex % itemsPerRow === 0;
  const isRightColumn = activeIndex % itemsPerRow === itemsPerRow - 1 || activeIndex === gridNum - 1;

  switch (direction) {
    case 'up': return isTopRow ? activeIndex : activeIndex - itemsPerRow;
    case 'down': return isBottomRow ? activeIndex : activeIndex + itemsPerRow;
    case 'left': return isLeftColumn ? activeIndex : activeIndex - 1;
    case 'right': return isRightColumn ? activeIndex : activeIndex + 1;
    default: return activeIndex;
  }
}