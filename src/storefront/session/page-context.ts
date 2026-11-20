import {createContext, useContext} from 'react';
import type {useStorefrontSession} from './useStorefrontSession.js';
import type {VF_SEO} from '../shell/seo.js';

type StorefrontPageProps = Pick<
  ReturnType<typeof useStorefrontSession>,
  'routeInfo' | 'lang' | 'tenant' | 'go' | 'store' | 'ready' | 'setLang'
> & {
  updateHead: (head: Parameters<typeof VF_SEO.headTags>[0]) => void;
};

export const StorefrontPageContext = createContext<StorefrontPageProps | null>(null);

export function useStorefrontPageProps<Props>(props: Props) {
  return useContext(StorefrontPageContext) ?? props;
}
