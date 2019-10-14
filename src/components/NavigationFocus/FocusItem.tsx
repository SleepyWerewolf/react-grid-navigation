import React, { forwardRef } from 'react';

import { debounce } from '../../utils/debounce';

export interface IFocusItemProps {
  onEnter?: () => void;
  width?: string;

  isActive: boolean;
  onHover: () => void;
}

export const FocusItem = forwardRef<HTMLDivElement, IFocusItemProps>((props, ref) => (
  <div
    className='focus-item'
    onMouseMove={debounce(() => props.onHover(), 100).handler}
    ref={ref}
    style={{ border: `${props.isActive ? 4 : 1}px solid black` }}
  >
    {props.children}
  </div>
));
