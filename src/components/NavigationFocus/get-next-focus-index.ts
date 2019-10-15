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
  let gridIndex = grid.findIndex(item => item === activeIndex);

  switch (direction) {
    case 'up': {
      const isTopRow = gridIndex <= itemsPerRow - 1;
      if (!isTopRow) {
        gridIndex -= itemsPerRow;
      }

      break;
    }

    case 'down': {
      const isBottomRow = gridIndex >= gridLength - itemsPerRow;
      if (!isBottomRow) {
        gridIndex += itemsPerRow;
      }
      break;
    }

    case 'left': {
      const isLeftColumn = gridIndex % itemsPerRow === 0;
      if (!isLeftColumn) {
        gridIndex--;
      }
      break;
    }

    case 'right': {
      // This variable accounts for grid items that are larger than 1 width
      const itemWidth = getItemWidth(grid, gridIndex);
      const trueRightIndex = gridIndex + (itemWidth - 1);
      const isRightColumn = trueRightIndex % itemsPerRow === itemsPerRow - 1 || /* final item */ trueRightIndex === gridLength - 1;

      if (!isRightColumn) {
        gridIndex += itemWidth;
      }

      break;
    }
  }

  return gridIndex;
};
