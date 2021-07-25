module.exports = {
  env: {
    browser: false,
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
};
