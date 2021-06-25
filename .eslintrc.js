module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:import/recommended",
    "prettier",
  ],
  plugins: ["import"],
  parserOptions: {
    ecmaVersion: 12,
  },

  rules: {},
};
