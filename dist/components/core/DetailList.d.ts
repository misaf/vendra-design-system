import * as React from 'react';
export interface DetailListRow { /** Lucide icon name, decorative */ icon?: string; label: React.ReactNode; value: React.ReactNode; }
export interface DetailListProps { rows: (DetailListRow | null | false)[]; className?: string; style?: React.CSSProperties; }
/** <dl> of label/value rows; icon aria-hidden in --text-accent; values use overflow-wrap:anywhere. Falsy rows are skipped. */
export declare function DetailList(props: DetailListProps): React.JSX.Element;
