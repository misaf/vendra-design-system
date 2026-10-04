Local React 18.3.1, ReactDOM 18.3.1 (production builds; swap in the .development.js UMDs from unpkg for readable errors while debugging) and @babel/standalone 7.29.0 for the preview pages (no unpkg.com needed).
They live under templates/ because files there are not compiled into _ds_bundle.js. A .js file anywhere else gets bundled, which puts a second React in the bundle and breaks every component ("Invalid hook call").
Keep the .js extension: the server sends nosniff, so a renamed file (.txt) won't run.
