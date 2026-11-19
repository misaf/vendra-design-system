import {storefrontPage} from '@storefront/next/app/route-page.jsx';
import PostScreen from '@storefront/features/post/PostScreen.jsx';
import {VF_POSTS} from '@storefront/shared/translations/journal-content.js';

export function generateStaticParams() {
  return VF_POSTS.map(({id}) => ({post: id}));
}

export default storefrontPage(({post}) => 'journal/' + encodeURIComponent(post), PostScreen);
