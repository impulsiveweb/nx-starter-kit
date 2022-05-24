// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  publicRuntimeConfig: {
    WEB_API_URL: process.env.WEB_API_URL,
    WEB_LOGIN_URL: process.env.WEB_LOGIN_URL,
    WEB_DASHBOARD_URL: process.env.WEB_DASHBOARD_URL,
  },
  env: {
    WEB_API_URL: process.env.WEB_API_URL,
    WEB_LOGIN_URL: process.env.WEB_LOGIN_URL,
    WEB_DASHBOARD_URL: process.env.WEB_DASHBOARD_URL,
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

module.exports = withNx(nextConfig);
