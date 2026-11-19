import {storefrontPage} from '../../../../../../route-page.jsx';
import View from '../../../../../../../../pages/post/Page.jsx';
import {VF_POSTS} from '../../../../../../../../shared/translations/journal-content.js';

export function generateStaticParams() {
  return VF_POSTS.map(({id}) => ({post: id}));
}

export default storefrontPage(({post}) => 'journal/' + encodeURIComponent(post), View);
