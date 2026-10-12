import * as React from 'react';
import type {ToastContent} from '../Toast/Toast.js';
/** React Aria's toast queue: add(content, {timeout}) returns a key; close(key) removes it. */
export declare class ToastQueue {
  constructor(options?: {maxVisibleToasts?: number});
  add(content: ToastContent, options?: {timeout?: number; onClose?: () => void}): string;
  close(key: string): void;
  clear(): void;
}
export interface ToastRegionProps {
  queue: ToastQueue;
  /** Names the landmark. Default: React Aria's "Notifications" in the page language */
  label?: string;
  closeLabel?: string;
  /** Places the region, e.g. above a sticky mobile bar */
  className?: string;
}
/** React Aria toast region: a landmark (F6) fixed at the bottom inline-end corner; timers pause on hover and focus. */
export declare function ToastRegion(props: ToastRegionProps): React.JSX.Element;
