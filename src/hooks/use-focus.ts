import { useRef } from 'react'

export const useFocus = (): [React.RefObject<HTMLElement>, () => void] => {
  const elementRef = useRef<HTMLElement>(null);
  const setFocus = () => elementRef.current && elementRef.current.focus();

  return [elementRef, setFocus];
};
