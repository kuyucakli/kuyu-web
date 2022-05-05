module.exports = ({ env }) => [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', `https://maps.gstatic.com`],
          'media-src': ["'self'", 'data:', 'blob:', `https://${env('AWS_BUCKET')}.s3.amazonaws.com`],
          'script-src':["'self'",  "'unsafe-inline'", "'unsafe-eval'", "https://api.mapbox.com"],
          'worker-src':['*',  'data:', "'unsafe-eval'", "unsafe-inline", 'blob:', "http://localhost:1337"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
