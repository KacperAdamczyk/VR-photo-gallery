// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface } from 'react-360-web';

function init(bundle, parent, options = {}) {
    const r360 = new ReactInstance(bundle, parent, {
        // Add custom options here
        fullScreen: true,
        ...options,
    });

    const cylinderSurface = new Surface(
      1000,
      1000,
      Surface.SurfaceShape.Cylinder
    );

    r360.renderToSurface(
      r360.createRoot('App'),
      cylinderSurface
    );
}

window.React360 = {init};
