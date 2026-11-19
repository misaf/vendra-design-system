export const MORNING = new Date('2026-10-05T09:00:00+03:30');

// Everything the delivery step needs apart from the recipient, pin and address.
export async function fillSender(page) {
  await page.fill('#vf-sender', 'Sara Karimi');
  await page.fill('#vf-sender-phone', '09121112233');
}
