import {createContext, useContext} from 'react';

export const StorefrontPageContext = createContext(null);

export function useStorefrontPageProps(props) {
  const routed = useContext(StorefrontPageContext);
  return routed || props;
}
