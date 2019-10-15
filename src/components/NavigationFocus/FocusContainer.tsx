import React, { useState, createRef, useMemo } from 'react';

import { FocusItem, IFocusItemProps } from './FocusItem';
import { getDirection, getNextFocusIndex } from './get-next-focus-index';

export interface IColumnConfig {
  width: string;
}

interface IRowConfig {
  height: string;
}

export type ItemsConfig = Omit<IFocusItemProps, 'id' | 'isActive' | 'onHover' | 'ref'>

export interface IFocusContainerProps {
  gridGap?: string;
  onDownExit?: () => void;
  onLeftExit?: () => void;
  onRightExit?: () => void;
  onTopExit?: () => void;

  columnConfig: IColumnConfig[];
  items: ItemsConfig[];
  rowConfig: IRowConfig[];
}

const generateColumnTemplate = (columnConfig: IColumnConfig[]) =>
  columnConfig.reduce((accumulator, config) => `${accumulator} ${config.width}`, '');

const generateRowTemplate = (rowConfig: IRowConfig[]) =>
  rowConfig.reduce((accumulator, config) => `${accumulator} ${config.height}`, '');

/**
 * In order to accomodate multi-layout grids,
 * we need to create an intermediate map that keeps track
 * of the "pseudo-index" of an item that spans multiple indices
 * (consider case where item takes 2 grids, but is a single DOM Node)
 * so pseudo-index 3 is just index 2
 */
const generateGridMapping = (itemsConfig: ItemsConfig[]) => {
  const gridMapping: number[] = [];

  for (let i = 0; i < itemsConfig.length; i++) {
    const width = itemsConfig[i].width || 1;
    for (let j = 0; j < width; j++) {
      gridMapping.push(i);
    }
  }

  return gridMapping;
};

export const FocusContainer = (props: IFocusContainerProps) => {
  const [ focusIndex, setFocusIndex ] = useState(0);
  const gridTemplateColumns = useMemo(() => generateColumnTemplate(props.columnConfig), [props.columnConfig]);
  const gridTemplateRows = useMemo(() => generateRowTemplate(props.rowConfig), [props.rowConfig]);
  const gridMapping = useMemo(() => generateGridMapping(props.items), [props.items]);
  const refs = props.items.map(() => createRef<HTMLDivElement>());

  return (
    <div
      className='focus-container'
      onKeyDownCapture={({ key }) => {
        const direction = getDirection(key.toLowerCase());

        if (direction) {
          const nextFocusIndex = getNextFocusIndex(gridMapping, props.columnConfig.length, focusIndex, direction);
          const gridMappingIndex = gridMapping[nextFocusIndex];
          const focusItem = refs[gridMappingIndex];

          if (focusItem.current) {
            focusItem.current.focus();
            setFocusIndex(gridMappingIndex);
          }
        }
      }}
      ref={div => div && div.focus()}
      style={{
        display: 'grid',
        gridTemplateColumns,
        gridTemplateRows,
        gridGap: props.gridGap || '5px',
      }}
      tabIndex={0}
    >
      {props.items.map((focusItemProps, index) =>
        <FocusItem
          {...focusItemProps}

          id={index}
          isActive={focusIndex === index}
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
