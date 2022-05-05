'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('map-field')
      .service('myService')
      .getWelcomeMessage();
  },
};
