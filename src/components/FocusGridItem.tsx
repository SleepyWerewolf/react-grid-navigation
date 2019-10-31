import React, { forwardRef } from 'react';

import { debounce } from '../utils/debounce';

/**
 * Simple presentational component to visualize
 * the state of a given Grid Item (focused, disabled, etc.)
 */
export interface IFocusGridItemProps {
  onEnter?: () => void;
  height?: number;
  width?: number;

  id: number;
  isActive: boolean;
  isDisabled: boolean;
  itemsPerRow: number;
  onHover: () => void;
}

export const FocusGridItem = forwardRef<HTMLDivElement, IFocusGridItemProps>((props, ref) =>(
  <div
    className={`focus-item ${props.isDisabled && 'disabled'}`}
    onMouseMove={debounce(() => !props.isDisabled && props.onHover(), 100).handler}
    ref={ref}
    style={{
      border: `${props.isActive ? 4 : 1}px solid ${props.isDisabled ? 'grey' : 'black'}`,
      gridColumn: props.width && `${(props.id % props.itemsPerRow) + 1} / span ${props.width}`,
      gridRow: props.height && `${props.id + 1} / span ${props.height}`,
    }}
  >
    {props.children}
  </div>
));
