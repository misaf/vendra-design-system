// Retired journal articles, kept apart from the article content (journal-content.js) so the router
// reads them without loading every article into each page. Each retired article and the newer post that replaced it (journal/care/ → journal/bouquet-last-longer/).
// The router opens the newer post and writes its address back; the server answers the old address
// with a 301 (deployment/nginx.conf).
export const VF_POST_MOVED = {
  care: 'bouquet-last-longer',
  bridal: 'bridal-bouquet-guide',
  orchids: 'orchid-care'
};
