/* eslint global-require: "off" */
const globby = require('globby');
const path = require('path');

module.exports = function apiMiddlewares(app, options) {
  apiRoutes(app, options);
};

function apiRoutes(app) {
  globby([`${__dirname}/../features/*/**/*.policy.js`]).then(policies => {
    policies.forEach(policyPath => {
      /* eslint import/no-dynamic-require: "off" */
      require(path.resolve(policyPath)).invokeRolesPolicies();
    });
  });

  // ========= Public routes
  // App public routes
  require('../features/app/app.routes')(app);
  // Content public routes
  require('../features/content/content-public.routes')(app);
  // ========= Secure routes
  require('../features/auth')(app);

  // Content public routes
  require('../features/content/content.routes')(app);

  // Examples
  // Shop routes
  require('../features/shop/customer/customer.routes')(app);
  require('../features/shop/productcategory/productcategory.routes')(app);
  require('../features/shop/product/product.routes')(app);
  require('../features/shop/order/order.routes')(app);
}
