import React, { useState, createRef, useMemo } from 'react';

import { FocusItem, IFocusItemProps } from './FocusItem';
import { getDirection, getNextFocusIndex } from './get-next-focus-index';

interface IColumnConfig {
  width: string;
}

interface IRowConfig {
  height: string;
}

export interface IFocusContainerProps {
  gridGap?: string;
  onDownExit?: () => void;
  onLeftExit?: () => void;
  onRightExit?: () => void;
  onTopExit?: () => void;

  columnConfig: IColumnConfig[];
  items: Omit<IFocusItemProps, 'isActive' | 'onHover' | 'ref'>[];
  rowConfig: IRowConfig[];
}

const generateColumnTemplate = (columnConfig: IColumnConfig[]) =>
  columnConfig.reduce((accumulator, config) => `${accumulator} ${config.width}`, '');

const generateRowTemplate = (rowConfig: IRowConfig[]) =>
  rowConfig.reduce((accumulator, config) => `${accumulator} ${config.height}`, '');

export const FocusContainer = (props: IFocusContainerProps) => {
  const [ focusIndex, setFocusIndex ] = useState(0);
  const gridTemplateColumns = useMemo(() => generateColumnTemplate(props.columnConfig), [props.columnConfig]);
  const gridTemplateRows = useMemo(() => generateRowTemplate(props.rowConfig), [props.rowConfig]);
  const refs = props.items.map(() => createRef<HTMLDivElement>());

  return (
    <div
      className='focus-container'
      onKeyDownCapture={({ key }) => {
        const direction = getDirection(key.toLowerCase());

        if (direction) {
          const nextFocusIndex = getNextFocusIndex(refs, props.columnConfig.length, focusIndex, direction);
          const focusItem = refs[nextFocusIndex];

          if (focusItem.current) {
            focusItem.current.focus();
            setFocusIndex(nextFocusIndex);
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
