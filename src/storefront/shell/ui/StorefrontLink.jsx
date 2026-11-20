import React, {createContext, useContext} from 'react';

export const StorefrontLinkContext = createContext('a');

export function StorefrontLink(props) {
  const Link = useContext(StorefrontLinkContext);
  return <Link {...props} />;
}
