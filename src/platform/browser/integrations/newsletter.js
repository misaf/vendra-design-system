// POST /api/marketing/newsletter-subscriptions {email, name} -> 204
/**
 * @param {{live: boolean}} client
 * @param {ReturnType<typeof import('./request.js').createRequest>} request
 * @param {string} email
 * @param {string} [name]
 */
export async function subscribeToNewsletter(client, request, email, name) {
  if (!client.live) {
    await new Promise(r => setTimeout(r, 600));
    return null;
  }
  return request('POST', '/api/marketing/newsletter-subscriptions', {email, name: name || null});
}
