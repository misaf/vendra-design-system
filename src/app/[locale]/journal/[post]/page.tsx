import {storefrontPage} from '@storefront/src/app/_routing/route-page';
import PostScreen from '../../../../storefront/content/journal/post/PostScreen.jsx';
import {VF_POSTS} from '@storefront/src/storefront/content/journal-content.js';

export function generateStaticParams() {
  return VF_POSTS.map(({id}) => ({post: id}));
}

export default storefrontPage(
  ({post}: {post: string}) => 'journal/' + encodeURIComponent(post),
  PostScreen
);
