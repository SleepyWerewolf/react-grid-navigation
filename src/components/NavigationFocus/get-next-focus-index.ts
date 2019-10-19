import { IGridItem } from './FocusContainer';

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

const getItemWidth = (grid: IGridItem[], startingIndex: number) => {
  const originalItem = grid[startingIndex].index;

  if (typeof originalItem === 'undefined') {
    return 0;
  }

  let leftCount = 1;
  let leftCountIndex = startingIndex;

  if (grid[leftCountIndex - 1]) {
    while (grid[--leftCountIndex].index === originalItem && leftCountIndex - 1 > 0) {
      leftCount++;
    }
  }

  let rightCount = 1;
  let rightCountIndex = startingIndex;

  if (grid[rightCountIndex + 1]) {
    while (grid[++rightCountIndex].index === originalItem && rightCountIndex + 1 < grid.length) {
      rightCount++;
    }
  }

  return leftCount + rightCount - 1;
};

const isLeftMostColumn = (itemsPerRow: number, index: number) => (index % itemsPerRow) === 0;
const isRightMostColumn = (gridLength: number, itemsPerRow: number, index: number) =>  index % itemsPerRow === itemsPerRow - 1 || /* final item */ index === gridLength - 1;

const getLeftMostIndex = (grid: IGridItem[], index: number) => {
  const originalItem = grid[index].index;
  let countIndex = index;

  while (grid[countIndex].index === originalItem && countIndex > 0) {
    countIndex--;
  }

  return countIndex + 1;
};

export const getNextFocusIndex = (grid: IGridItem[], itemsPerRow: number, activeIndex: number, direction: Direction) => {
  const gridLength = grid.length;

  switch (direction) {
    case 'up': {
      const isTopRow = activeIndex <= itemsPerRow - 1;
      if (!isTopRow) {
        activeIndex -= itemsPerRow;

        if (grid[activeIndex].isDisabled) {
          const itemWidth = getItemWidth(grid, activeIndex);
          const leftMostIndex = getLeftMostIndex(grid, activeIndex);
          if (isLeftMostColumn(itemsPerRow, leftMostIndex)) {
            activeIndex = leftMostIndex - itemWidth;
          } else {
            activeIndex--;
          }
        }
      }

      break;
    }

    case 'down': {
      const isBottomRow = activeIndex >= gridLength - itemsPerRow;
      if (!isBottomRow) {
        activeIndex += itemsPerRow;

        if (grid[activeIndex].isDisabled) {
          const itemWidth = getItemWidth(grid, activeIndex);
          const leftMostIndex = getLeftMostIndex(grid, activeIndex);
          if (isLeftMostColumn(itemsPerRow, leftMostIndex)) {
            activeIndex = leftMostIndex + itemWidth;
          } else {
            activeIndex--;
          }
        }
      }
      break;
    }

    case 'left': {
      let index = activeIndex;

      while (!!grid[index]) {
        if (isLeftMostColumn(itemsPerRow, index)) {
          break;
        } else if (!!grid[index - 1]) {
          if (!grid[index - 1].isDisabled && grid[index - 1].index !== grid[activeIndex].index) {
            activeIndex = index - 1;
            break;
          }
        }

        index--;
      }

      break;
    }

    case 'right': {
      let index = activeIndex;

      while (!!grid[index]) {
        if (isRightMostColumn(gridLength, itemsPerRow, index)) {
          break;
        } else if (!!grid[index + 1]) {
          if (!grid[index + 1].isDisabled && grid[index + 1].index !== grid[activeIndex].index) {
            activeIndex = index + 1;
            break;
          }
        }

        index++;
      }

      break;
    }
  }

  return activeIndex;
};
