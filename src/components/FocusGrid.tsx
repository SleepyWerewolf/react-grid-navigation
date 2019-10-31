import React, { useState, createRef, useMemo } from 'react';

import { getDirection } from '../constants/directions';
import { FocusGridItem, IFocusGridItemProps } from './FocusGridItem';
import { getNextGridIndex, IGridItem } from '../grid';
import { useFocus } from '../hooks/use-focus';

export interface IColumnConfig {
  width: string;
}

interface IRowConfig {
  height: string;
}

export type GridItemConfig = Pick<IFocusGridItemProps, 'width'> & {
  shouldDisable?: boolean;
};

export interface IFocusGridProps {
  gridGap?: string;
  onDownExit?: () => void;
  onLeftExit?: () => void;
  onRightExit?: () => void;
  onTopExit?: () => void;

  columnConfig: IColumnConfig[];
  isFocused: boolean;
  items: GridItemConfig[];
  rowConfig: IRowConfig[];
}

const generateColumnTemplate = (columnConfig: IColumnConfig[]) =>
  columnConfig.reduce((accumulator, config) => `${accumulator} ${config.width}`, '');

const generateRowTemplate = (rowConfig: IRowConfig[]) =>
  rowConfig.reduce((accumulator, config) => `${accumulator} ${config.height}`, '');

/**
 * In order to accomodate variable-width layout grids,
 * we need to create an intermediate map that keeps track
 * of the "pseudo-index" of an item that spans multiple indices
 * (consider case where item takes 2 grids, but is a single DOM Node)
 * so pseudo-index 3 is just index 2
 */
const generateGridMapping = (GridItemConfig: GridItemConfig[]) => {
  const grid: IGridItem<number>[] = [];
  const gridMap = new Map<number, number>();

  for (let i = 0; i < GridItemConfig.length; i++) {
    const width = GridItemConfig[i].width || 1;
    for (let j = 0; j < width; j++) {
      if (!gridMap.has(i)) {
        gridMap.set(i, grid.length);
      }
      grid.push({
        value: i,
        isDisabled: !!GridItemConfig[i].shouldDisable,
      });
    }
  }

  return {
    grid,
    gridMap,
  };
};

// TODO: Improve to check for right amount of columns too
const checkIfInvalidConfig = (items: GridItemConfig[], itemsPerRow: number) =>
  !!items.find(item => item.width && item.width > itemsPerRow);

/**
 * This component uses the underlying Grid data structure as well
 * as CSS Grids to construct focus-able UI.
 *
 * The 2 main props to call out are `columnConfig` and `rowColumn`.
 * They are essentially an array of CSS Grid properties that are used
 * to layout the grid. The dimensions of the grid are also determined
 * by these two properties. For example, if `columnConfig` has 2 entries
 * and `rowColumn` has 5, this will create a 2x5 grid.
 */
export const FocusGrid = (props: IFocusGridProps) => {
  const [ focusIndex, setFocusIndex ] = useState(0);
  const [ containerRef, setContainerFocus ] = useFocus();
  const gridTemplateColumns = useMemo(() => generateColumnTemplate(props.columnConfig), [props.columnConfig]);
  const gridTemplateRows = useMemo(() => generateRowTemplate(props.rowConfig), [props.rowConfig]);
  const { grid, gridMap } = useMemo(() => generateGridMapping(props.items), [props.items]);
  const refs = props.items.map(() => createRef<HTMLDivElement>());
  const itemsPerRow = props.columnConfig.length;
  const isInvalidConfig = useMemo(() => checkIfInvalidConfig(props.items, itemsPerRow), [props.items, itemsPerRow]);

  if (props.isFocused) {
    setContainerFocus();
  }

  if (isInvalidConfig) {
    throw new Error(`Invalid grid configuration; grid items cannot be longer than ${itemsPerRow} width`);
  }

  return (
    <div
      className='focus-container'
      onKeyDownCapture={({ key }) => {
        const direction = getDirection(key.toLowerCase());
        const gridIndex = gridMap.get(focusIndex);

        if (direction && typeof gridIndex !== 'undefined') {
          const nextGridIndex = getNextGridIndex(grid, itemsPerRow, gridIndex, direction);
          const nextFocusIndex = grid[nextGridIndex].value;

          /**
           * If the focus index is unchanged, it means we've hit an edge column.
           * In that case, we "propagate" the event up, enabling custom behaviors
           * like inter-grid focusing
           */
          if (nextFocusIndex === focusIndex) {
            switch (direction) {
              case 'down': {
                props.onDownExit && props.onDownExit();
                break;
              }

              case 'left': {
                props.onLeftExit && props.onLeftExit();
                break;
              }

              case 'right': {
                props.onRightExit && props.onRightExit();
                break;
              }

              case 'up': {
                props.onTopExit && props.onTopExit();
                break;
              }
            }

            return;
          }

          const focusItem = refs[nextFocusIndex];

          if (focusItem.current) {
            focusItem.current.focus();
            setFocusIndex(nextFocusIndex);
          }
        }
      }}
      ref={containerRef as React.RefObject<HTMLDivElement>}
      style={{
        border: '3px solid black',
        display: 'grid',
        gridTemplateColumns,
        gridTemplateRows,
        gridGap: props.gridGap || '5px',
        margin: '10px',
        padding: '5px',
        width: '100%',
      }}
      tabIndex={0}
    >
      {props.items.map((focusItemProps, index) =>
        <FocusGridItem
          {...focusItemProps}

          id={gridMap.get(index) || index}
          isActive={focusIndex === index}
          isDisabled={!!focusItemProps.shouldDisable}
          itemsPerRow={itemsPerRow}
          key={index}
          onHover={() => {
            if (focusIndex !== index) {
              setFocusIndex(index)
            }
          }}
          ref={refs[index]}
        />
      )}
    </div>
  );
};
