import { Direction } from './directions';
import { IGridItem } from './FocusContainer';

const DIRECTIONAL_OFFSETS = {
  up: -1,
  down: 1,
  left: -1,
  right: 1,
}

/**
 * Given an index, this returns the left most index
 * for that grid item. This is particularly useful for grid
 * items with widths larger than 1.
 *
 * Consider a grid with a width of 3, spanning indices 2 -> 4.
 * getLeftMostIndex(grid, 2) // -> 2
 * getLeftMostIndex(grid, 3) // -> 2
 * getLeftMostIndex(grid, 4) // -> 2
 */
const getLeftMostIndex = (grid: IGridItem[], index: number) => {
  const originalItem = grid[index].index;
  let countIndex = index;

  while (grid[countIndex].index === originalItem && countIndex > 0) {
    countIndex--;
  }

  return countIndex + 1;
};

const isBottomRow = (grid: IGridItem[], itemsPerRow: number, index: number) => index >= grid.length - itemsPerRow;
const isLeftMostColumn = (itemsPerRow: number, index: number) => (index % itemsPerRow) === 0;
const isRightMostColumn = (grid: IGridItem[], itemsPerRow: number, index: number) =>  index % itemsPerRow === itemsPerRow - 1 || index === grid.length - 1;
const isTopRow = (itemsPerRow: number, index: number) => index <= itemsPerRow - 1;

/**
 * 
 */
const getAvailableAdjacentIndex = (grid: IGridItem[], itemsPerRow: number, startingIndex: number, direction: 'left' | 'right') => {
  let newIndex = startingIndex;
  let countIndex = newIndex;
  const offset = DIRECTIONAL_OFFSETS[direction];

  while (!!grid[countIndex]) {
    const offsetIndex = countIndex + offset;

    // Bail if it's an edge column
    if (direction === 'left' ? isLeftMostColumn(itemsPerRow, countIndex) : isRightMostColumn(grid, itemsPerRow, countIndex)) {
      break;
    } else if (!!grid[offsetIndex]) {
      if (!grid[offsetIndex].isDisabled && grid[offsetIndex].index !== grid[startingIndex].index) {
        newIndex = offsetIndex;
        break;
      }
    }

    countIndex += offset;
  }

  return newIndex;
};

const getAvailableVerticalIndex = (grid: IGridItem[], itemsPerRow: number, startingIndex: number, direction: 'up' | 'down') => {
  let newIndex = startingIndex;
  const offset = DIRECTIONAL_OFFSETS[direction];

  if (direction === 'up' ? !isTopRow(itemsPerRow, startingIndex) : !isBottomRow(grid, itemsPerRow, startingIndex)) {
    /**
     * If destination grid is disabled, check if it's a left most column.
     * If it is, select the tile adjacent right.
     */
    do {
      newIndex += (itemsPerRow * offset);

      if (grid[newIndex].isDisabled) {
        const leftMostIndex = getLeftMostIndex(grid, newIndex);

        if (isLeftMostColumn(itemsPerRow, leftMostIndex)) {
          newIndex = getAvailableAdjacentIndex(grid, itemsPerRow, leftMostIndex, 'right');
        } else {
          newIndex = getAvailableAdjacentIndex(grid, itemsPerRow, newIndex, 'left');
        }
      }
    } while (grid[newIndex].isDisabled)
  }

  return newIndex;
}

export const getNextGridIndex = (grid: IGridItem[], itemsPerRow: number, startingIndex: number, direction: Direction) => {
  switch (direction) {
    case 'up': return getAvailableVerticalIndex(grid, itemsPerRow, startingIndex, 'up');
    case 'down': return getAvailableVerticalIndex(grid, itemsPerRow, startingIndex, 'down');
    case 'left': return getAvailableAdjacentIndex(grid, itemsPerRow, startingIndex, 'left');
    case 'right': return getAvailableAdjacentIndex(grid, itemsPerRow, startingIndex, 'right');
    default: return startingIndex;
  }
};
