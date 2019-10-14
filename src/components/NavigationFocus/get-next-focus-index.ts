import { RefObject } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

// TODO: Add gamepad keys
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

export const getNextFocusIndex = (refObjects: RefObject<HTMLDivElement>[], itemsPerRow: number, activeIndex: number, direction: Direction) => {
  const gridNum = refObjects.length;
  const currentNode = refObjects[activeIndex].current;

  if (!currentNode) {
    return activeIndex;
  }

  switch (direction) {
    case 'up': {
      const isTopRow = activeIndex <= itemsPerRow - 1;
      if (!isTopRow) {
        activeIndex -= itemsPerRow;
      }

      break;
    }

    case 'down': {
      const isBottomRow = activeIndex >= gridNum - itemsPerRow;
      if (!isBottomRow) {
        activeIndex += itemsPerRow;
      }
      break;
    }

    case 'left': {
      const isLeftColumn = activeIndex % itemsPerRow === 0;
      if (!isLeftColumn) {
        activeIndex--;
      }
      break;
    }

    case 'right': {
      const isRightColumn = activeIndex % itemsPerRow === itemsPerRow - 1 || activeIndex === gridNum - 1;
      if (!isRightColumn) {
        activeIndex++;
      }
      break;
    }
  }

  return activeIndex;
};
