import React, { forwardRef } from 'react';

export interface IFocusItemProps {
  isActive: boolean;
}

export const FocusItem = forwardRef<HTMLDivElement, IFocusItemProps>((props, ref) => (
  <div
    className='focus-item'
    ref={ref}
    style={{
      border: `${props.isActive ? 4 : 1}px solid black`
    }}
  >
    {props.children}
  </div>
));
