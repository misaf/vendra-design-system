import type {ToastContent} from '../../molecules/Toast/Toast.js';
/** The shortest time, in milliseconds, a timed toast without an action stays (10 s). */
export declare const TOAST_MIN_TIMEOUT: number;
/** React Aria's toast queue: add(content, {timeout}) returns a key; close(key) removes it. */
export declare class ToastQueue {
  constructor(options?: {maxVisibleToasts?: number});
  /**
   * Queues a toast. A toast with an `action` ignores `timeout` and stays until it is used or
   * dismissed; any other timed toast stays at least TOAST_MIN_TIMEOUT. No timeout: it stays.
   */
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
export declare function ToastRegion(props: ToastRegionProps): JSX.Element;
