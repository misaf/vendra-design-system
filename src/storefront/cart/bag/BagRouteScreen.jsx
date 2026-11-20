'use client';

import dynamic from 'next/dynamic';

// The bag and the guarded checkout entry share this client boundary.
export const BagRouteScreen = dynamic(() => import('./BagScreen.jsx'));
