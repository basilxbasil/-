const path = require("path");
require("dotenv").config();

const isDevServer = process.env.NODE_ENV !== "production";
const config = { enableHealthCheck: process.env.ENABLE_HEALTH_CHECK === "true" };

let webpackConfig = {
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },
  webpack: {
    alias: { '@': path.resolve(__dirname, 'src') },
    configure: (webpackConfig) => {
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: ['**/node_modules/**', '**/.git/**', '**/build/**', '**/dist/**', '**/coverage/**', '**/public/**'],
      };
      return webpackConfig;
    },
  },
};

module.exports = webpackConfig;
