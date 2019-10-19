import React, { useState, createRef, useMemo } from 'react';

import { FocusItem, IFocusItemProps } from './FocusItem';
import { getDirection, getNextFocusIndex } from './get-next-focus-index';
import { useFocus } from '../../hooks/use-focus';
import { debounce } from '../../utils/debounce';

export interface IColumnConfig {
  width: string;
}

interface IRowConfig {
  height: string;
}

export type ItemsConfig = Pick<IFocusItemProps, 'width'> & {
  shouldDisable?: boolean;
};

export interface IFocusContainerProps {
  gridGap?: string;
  onDownExit?: () => void;
  onLeftExit?: () => void;
  onRightExit?: () => void;
  onTopExit?: () => void;

  columnConfig: IColumnConfig[];
  isFocused: boolean;
  items: ItemsConfig[];
  rowConfig: IRowConfig[];
}

const generateColumnTemplate = (columnConfig: IColumnConfig[]) =>
  columnConfig.reduce((accumulator, config) => `${accumulator} ${config.width}`, '');

const generateRowTemplate = (rowConfig: IRowConfig[]) =>
  rowConfig.reduce((accumulator, config) => `${accumulator} ${config.height}`, '');


export interface IGridItem {
  index: number;
  isDisabled: boolean;
}

/**
 * In order to accomodate multi-layout grids,
 * we need to create an intermediate map that keeps track
 * of the "pseudo-index" of an item that spans multiple indices
 * (consider case where item takes 2 grids, but is a single DOM Node)
 * so pseudo-index 3 is just index 2
 */
const generateGridMapping = (itemsConfig: ItemsConfig[]) => {
  const grid: IGridItem[] = [];
  const gridMap = new Map<number, number>();

  for (let i = 0; i < itemsConfig.length; i++) {
    const width = itemsConfig[i].width || 1;
    for (let j = 0; j < width; j++) {
      if (!gridMap.has(i)) {
        gridMap.set(i, grid.length);
      }
      grid.push({
        index: i,
        isDisabled: !!itemsConfig[i].shouldDisable,
      });
    }
  }

  return {
    grid,
    gridMap,
  };
};

// TODO: Improve to check for right amount of columns too
const checkIfInvalidConfig = (items: ItemsConfig[], itemsPerRow: number) =>
  !!items.find(item => item.width && item.width > itemsPerRow);

export const FocusContainer = (props: IFocusContainerProps) => {
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
          const nextFocusIndex = getNextFocusIndex(grid, itemsPerRow, gridIndex, direction);

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

          const gridMappingIndex = grid[nextFocusIndex].index;
          const focusItem = refs[gridMappingIndex];

          if (focusItem.current) {
            focusItem.current.focus();
            setFocusIndex(gridMappingIndex);
          }
        }
      }}
      onMouseMove={debounce(() => setContainerFocus(), 100).handler}
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
        <FocusItem
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
