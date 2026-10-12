import React from 'react';
import {Focusable, Tooltip as AriaTooltip, TooltipTrigger} from 'react-aria-components';
import {cx} from '../utils/cx.js';

// A tooltip on React Aria (WCAG 1.4.13): it shows on hover and keyboard focus, describes its trigger
// (aria-describedby) while shown, and Esc dismisses it. React Aria ignores touch, so a tap on the
// trigger toggles it too, and a tap anywhere else hides it. The trigger is a React Aria button
// (Button, IconButton) or a native focusable element.
export function Tooltip({content, placement = 'top', open, children}) {
  const [tapped, setTapped] = React.useState(false);
  const wrapperRef = React.useRef(null);
  React.useEffect(() => {
    if (!tapped) return;
    const onPointerDown = event => {
      if (!wrapperRef.current || !wrapperRef.current.contains(event.target)) setTapped(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [tapped]);
  // Template runtimes pass even a single child as an array, so unwrap a lone element first. A
  // native element (a plain <button>) needs Focusable to reach React Aria's trigger props.
  const childList = React.Children.toArray(children);
  const onlyChild =
    childList.length === 1 && React.isValidElement(childList[0]) ? childList[0] : null;
  const trigger =
    onlyChild && typeof onlyChild.type === 'string' ? <Focusable>{onlyChild}</Focusable> : children;
  return (
    <TooltipTrigger
      isOpen={open || tapped ? true : undefined}
      onOpenChange={isOpen => !isOpen && setTapped(false)}
      delay={300}
      closeDelay={200}
    >
      <span
        ref={wrapperRef}
        className="ag-tip"
        onPointerUp={event => event.pointerType === 'touch' && setTapped(shown => !shown)}
      >
        {trigger}
      </span>
      <AriaTooltip
        placement={placement === 'bottom' ? 'bottom' : 'top'}
        offset={8}
        className={cx('ag-tip__bubble', placement === 'bottom' && 'ag-tip__bubble--bottom')}
      >
        {content}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
