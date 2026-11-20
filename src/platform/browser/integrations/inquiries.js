// POST /api/support/inquiries {name,email,message,phone,occasion,preferredLocale} -> 204 (throttled)
/**
 * @param {{live: boolean}} client
 * @param {ReturnType<typeof import('./idempotency.js').createIdempotentSubmission>['submit']} submit
 * @param {any} body
 */
export async function submitInquiry(client, submit, body) {
  if (!client.live) {
    await new Promise(r => setTimeout(r, 600));
    return null;
  }
  return submit('inquiry', '/api/support/inquiries', body);
}
