/**
 * This file has 2 primary exports: the `getNextGridIndex` helper and the `IGridItem` interface.
 *
 * `getNextGridIndex` composes various other helpers (also defined in this file)
 * to determine the next item to focus on in a grid, factoring various things like
 * multi-width layouts and whether grid items are enabled or not.
 *
 * `IGridItem` should be used to construct a Grid; it's essentially an array of `IGridItem`s.
 * It's a simple interface, requiring a generic `value` and a `isDisabled` boolean.
 * Adjacent grid items with the same `value` are considered to be a single "tile",
 * which enables variable-width layouts (as opposed to a grid consisting of only single items).
 * If a GridItem is disabled, it will be passed over in the navigation algorithm.
 */

import { Direction, DIRECTIONAL_OFFSETS } from './constants/directions';

export interface IGridItem<T> {
  value: T;
  isDisabled: boolean;
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
const getLeftMostIndex = (grid: IGridItem<number>[], index: number) => {
  const originalItem = grid[index].value;
  let countIndex = index;

  while (grid[countIndex].value === originalItem && countIndex > 0) {
    countIndex--;
  }

  return countIndex + 1;
};

const isBottomRow = (grid: IGridItem<number>[], itemsPerRow: number, index: number) => index >= grid.length - itemsPerRow;
const isLeftMostColumn = (itemsPerRow: number, index: number) => (index % itemsPerRow) === 0;
const isRightMostColumn = (grid: IGridItem<number>[], itemsPerRow: number, index: number) =>  index % itemsPerRow === itemsPerRow - 1 || index === grid.length - 1;
const isTopRow = (itemsPerRow: number, index: number) => index <= itemsPerRow - 1;

const isEdgeColumn = (grid: IGridItem<number>[], itemsPerRow: number, index: number, direction: Direction) => {
  switch (direction) {
    case 'up': return isTopRow(itemsPerRow, index);
    case 'down': return isBottomRow(grid, itemsPerRow, index);
    case 'left': return isLeftMostColumn(itemsPerRow, index);
    case 'right': return isRightMostColumn(grid, itemsPerRow, index);
    default: return false;
  }
};

/**
 * Given a direction (left or right), this function iterates through
 * a row until it finds a new grid item that is not disabled.
 */
const getAvailableAdjacentIndex = (grid: IGridItem<number>[], itemsPerRow: number, startingIndex: number, direction: 'left' | 'right') => {
  let newIndex = startingIndex;
  let countIndex = newIndex;
  const offset = DIRECTIONAL_OFFSETS[direction];

  while (!!grid[countIndex] && !isEdgeColumn(grid, itemsPerRow, countIndex, direction)) {
    const offsetIndex = countIndex + offset;

    if (!!grid[offsetIndex] && !grid[offsetIndex].isDisabled && grid[offsetIndex].value !== grid[startingIndex].value) {
      newIndex = offsetIndex;
      break;
    }

    countIndex += offset;
  }

  return newIndex;
};

/**
 * Given a direction (up or down), this function finds an enabled item
 * on a row in the given direction. 
 */
const getAvailableVerticalIndex = (grid: IGridItem<number>[], itemsPerRow: number, startingIndex: number, direction: 'up' | 'down') => {
  let newIndex = startingIndex;
  const offset = DIRECTIONAL_OFFSETS[direction];

  if (!isEdgeColumn(grid, itemsPerRow, startingIndex, direction)) {
    /**
     * If destination grid is disabled, check if it's a left most column.
     * If it is, iterate right until we find an enabled grid item.
     * If it's not, iterate left until we find an enabled grid item.
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

/**
 * Given a direction (up, down, left, right), this function iterates through
 * a grid to find the next item to receive focus, factoring in layouts with
 * variable widths and the fact that grid items can be disabled.
 */
export const getNextGridIndex = (grid: IGridItem<number>[], itemsPerRow: number, startingIndex: number, direction: Direction) => {
  switch (direction) {
    case 'up': return getAvailableVerticalIndex(grid, itemsPerRow, startingIndex, 'up');
    case 'down': return getAvailableVerticalIndex(grid, itemsPerRow, startingIndex, 'down');
    case 'left': return getAvailableAdjacentIndex(grid, itemsPerRow, startingIndex, 'left');
    case 'right': return getAvailableAdjacentIndex(grid, itemsPerRow, startingIndex, 'right');
    default: return startingIndex;
  }
};
