import React, {createContext, useContext} from 'react';
import type {ComponentPropsWithoutRef, ComponentType} from 'react';

type LinkProps = ComponentPropsWithoutRef<'a'>;

export const StorefrontLinkContext = createContext<'a' | ComponentType<LinkProps>>('a');

export function StorefrontLink(props: LinkProps) {
  const Link = useContext(StorefrontLinkContext);
  return <Link {...props} />;
}
