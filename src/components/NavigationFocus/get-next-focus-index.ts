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

const getItemWidth = (grid: number[], startingIndex: number) => {
  const originalItem = grid[startingIndex];

  if (typeof originalItem === 'undefined') {
    return 0;
  }

  let count = 1;
  let countIndex = startingIndex;

  while (grid[++countIndex] === originalItem) {
    count++;
  }

  return count;
};

export const getNextFocusIndex = (grid: number[], itemsPerRow: number, activeIndex: number, direction: Direction) => {
  const gridLength = grid.length;

  switch (direction) {
    case 'up': {
      const isTopRow = activeIndex <= itemsPerRow - 1;
      if (!isTopRow) {
        activeIndex -= itemsPerRow;
      }

      break;
    }

    case 'down': {
      const isBottomRow = activeIndex >= gridLength - itemsPerRow;
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
      // This variable accounts for grid items that are larger than 1 width
      const itemWidth = getItemWidth(grid, activeIndex);
      const trueRightIndex = activeIndex + (itemWidth - 1);
      const isRightColumn = trueRightIndex % itemsPerRow === itemsPerRow - 1 || /* final item */ trueRightIndex === gridLength - 1;

      if (!isRightColumn) {
        activeIndex += itemWidth;
      }

      break;
    }
  }

  return activeIndex;
};
