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

const isLeftColumn = (itemsPerRow: number, index: number) => index % itemsPerRow === 0;
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
          if (isLeftColumn(itemsPerRow, leftMostIndex)) {
            activeIndex = leftMostIndex + itemWidth;
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
          if (isLeftColumn(itemsPerRow, leftMostIndex)) {
            activeIndex = leftMostIndex + itemWidth;
          } else {
            activeIndex--;
          }
        }
      }
      break;
    }

    case 'left': {
      if (!isLeftColumn(itemsPerRow, activeIndex)) {
        let countIndex = activeIndex - 1;

        while (!isLeftColumn(itemsPerRow, countIndex) && (grid[countIndex].isDisabled || grid[countIndex].index === grid[activeIndex].index)) {
          countIndex--;
        }

        activeIndex = countIndex;
      }
      break;
    }

    case 'right': {
      // This variable accounts for grid items that are larger than 1 width
      // const itemWidth = getItemWidth(grid, activeIndex);
      // const trueRightIndex = activeIndex + (itemWidth - 1);

      if (!isRightMostColumn(gridLength, itemsPerRow, activeIndex)) {
        for (let i = activeIndex % itemsPerRow; i <= itemsPerRow; i++) {
          const offset = activeIndex + i - 1;
          if (!grid[offset].isDisabled && grid[offset].index !== grid[activeIndex].index) {
            console.log(offset);
            activeIndex = offset;
            break;
          }
        }
        // while (!isRightMostColumn(gridLength, itemsPerRow, countIndex) && grid[countIndex].isDisabled && grid[countIndex].index === grid[activeIndex].index) {
        //   countIndex++;
        // }

        // while (!isRightMostColumn(gridLength, itemsPerRow, countIndex) && (grid[countIndex].isDisabled || grid[countIndex].index === grid[activeIndex].index)) {
        //   console.log(countIndex);
        //   countIndex++;
        // }

        // console.log(newIndex);
        // if (newIndex) {
        //   activeIndex = newIndex;
        // }
      }

      break;
    }
  }

  return activeIndex;
};

// const getRightMove = (grid: IGridItem[], itemsPerRow: number, activeIndex: number, currentIndex: number) => {
//   if (isRightMostColumn(grid.length, itemsPerRow, currentIndex) &&) {

//   }
// };
