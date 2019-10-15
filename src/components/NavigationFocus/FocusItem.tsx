import React, { forwardRef } from 'react';

import { debounce } from '../../utils/debounce';

export interface IFocusItemProps {
  onEnter?: () => void;
  height?: number;
  width?: number;

  id: number;
  isActive: boolean;
  itemsPerRow: number;
  onHover: () => void;
}

export const FocusItem = forwardRef<HTMLDivElement, IFocusItemProps>((props, ref) =>(
  <div
    className='focus-item'
    onMouseMove={debounce(() => props.onHover(), 100).handler}
    ref={ref}
    style={{
      border: `${props.isActive ? 4 : 1}px solid black`,
      gridColumn: props.width && `${(props.id % props.itemsPerRow) + 1} / span ${props.width}`,
      gridRow: props.height && `${props.id + 1} / span ${props.height}`,
    }}
  >
    {props.children}
  </div>
));
