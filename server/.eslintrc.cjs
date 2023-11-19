module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  ignorePatterns: ["jest.config.js"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
};