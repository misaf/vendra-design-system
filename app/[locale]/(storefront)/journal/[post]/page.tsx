import {storefrontPage} from '@storefront/server/route-page';
import PostScreen from './PostScreen.jsx';
import {VF_POSTS} from '@storefront/i18n/journal-content.js';

export function generateStaticParams() {
  return VF_POSTS.map(({id}) => ({post: id}));
}

export default storefrontPage(
  ({post}: {post: string}) => 'journal/' + encodeURIComponent(post),
  PostScreen
);
