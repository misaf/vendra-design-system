import * as React from 'react';
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** default = warm white + hairline; sunken = linen fill; raised = soft shadow */
  variant?: 'default' | 'sunken' | 'raised';
  padding?: number | string;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): React.JSX.Element;
