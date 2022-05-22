import { RefObject } from 'react'

import useEventListener  from './useEventListener'

type Handler = (event: MouseEvent) => void

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  scopeRef:RefObject<T> | undefined = undefined,
  excludeRef:RefObject<T> | undefined = undefined,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
 
  useEventListener(mouseEvent, event => {

  
    const excludeEl = excludeRef?.current
    const el = ref?.current
    const scopeEl = scopeRef?.current

    const target = event.target as Node
   
    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(target)) {
      return
    }

    // Check elements that won't trigger outside func
    if(excludeEl && excludeEl.contains(target)){
       return
    }

     // Check elements that won't trigger outside func
     if(scopeEl && scopeEl !== target){
        return
     }


    handler(event)
  })
}

export default useOnClickOutside