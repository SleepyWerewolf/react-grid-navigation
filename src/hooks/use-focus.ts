import { useRef } from 'react'

/**
 * React Hook for focusing on a DOM Element
 */
export const useFocus = (): [React.RefObject<HTMLElement>, () => void] => {
  const elementRef = useRef<HTMLElement>(null);
  const setFocus = () => elementRef.current && elementRef.current.focus({ preventScroll: true });

  return [ elementRef, setFocus ];
};
