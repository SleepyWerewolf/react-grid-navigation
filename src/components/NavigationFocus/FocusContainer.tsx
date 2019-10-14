import React, { useState, createRef } from 'react';
import { FocusItem, IFocusItemProps } from './FocusItem';
import { getNextFocusIndex, getDirection } from './get-next-focus-index';

export interface IFocusContainerProps {
  items: Omit<IFocusItemProps, 'isActive' | 'ref'>[];
}

export const FocusContainer = (props: IFocusContainerProps) => {
  const [ focusIndex, setFocusIndex ] = useState(0);
  const refs = props.items.map(() => createRef<HTMLDivElement>());
  return (
    <div
      className='focus-container'
      onKeyDownCapture={({ key }) => {
        const direction = getDirection(key.toLowerCase());

        if (direction) {
          const nextFocusIndex = getNextFocusIndex(refs, focusIndex, direction);
          setFocusIndex(nextFocusIndex);
        }
      }}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 2fr',
        gridGap: '5px',
        gridAutoRows: 'minmax(100px, auto)',
      }}
      tabIndex={0}
    >
      {props.items.map((focusItemProps, index) =>
        <FocusItem
          {...focusItemProps}

          isActive={focusIndex === index}
          key={index}
          ref={refs[index]}
        />
      )}
    </div>
  );
};
