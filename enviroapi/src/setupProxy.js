const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy dla IMGW Hydro API
  app.use(
    '/api/imgw/hydro',
    createProxyMiddleware({
      target: 'https://danepubliczne.imgw.pl',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api/imgw/hydro': '/api/data/hydro', // Przekierowanie na właściwą ścieżkę
      },
      onProxyRes(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    })
  );

  // Proxy dla IMGW Synoptyczne API
  app.use(
    '/api/imgw/synop',
    createProxyMiddleware({
      target: 'https://danepubliczne.imgw.pl',
      changeOrigin: true,
      secure: false,
      pathRewrite: (path, req) => {
        return path.replace('/api/imgw/synop', '/api/data/synop'); // Przekierowanie na właściwą ścieżkę
      },
      onProxyRes(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    })
  );

  // Proxy dla GIOS API - sensory stacji
  app.use(
    '/api/gios/station/sensors',
    createProxyMiddleware({
      target: 'https://api.gios.gov.pl',
      changeOrigin: true,
      secure: false,
      pathRewrite: (path, req) => {
        // Upewnienie się, że dynamiczne parametry są przekazywane poprawnie
        return path.replace('/api/gios/station/sensors', '/pjp-api/rest/station/sensors');
      },
      onProxyRes(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    })
  );

  // Proxy dla GIOS API - dane z sensorów
  app.use(
    '/api/gios/data/getData',
    createProxyMiddleware({
      target: 'https://api.gios.gov.pl',
      changeOrigin: true,
      secure: false,
      pathRewrite: (path, req) => {
        // Upewnienie się, że dynamiczne parametry są przekazywane poprawnie
        return path.replace('/api/gios/data/getData', '/pjp-api/rest/data/getData');
      },
      onProxyRes(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    })
  );
};
