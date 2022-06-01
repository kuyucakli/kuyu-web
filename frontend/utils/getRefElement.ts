import { RefObject } from 'react';

export const getRefElement = <T>(
  element?: RefObject<Element> | T
): Element | T | undefined | null => {
  if( typeof element === 'string' ){
    const el = document.querySelector(element);
    return el;
  }
  if (element && 'current' in element) {
    return element.current;
  }

  return element;
};