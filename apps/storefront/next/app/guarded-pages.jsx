'use client';

import dynamic from 'next/dynamic';

// The static pages show the first step a guest can use. Load the private controls
// once the layout has restored the account or confirmed the checkout session.
export const AccountPage = dynamic(() => import('../../pages/account/Page.jsx'));
export const CheckoutPage = dynamic(() => import('../../pages/checkout/Page.jsx'));
