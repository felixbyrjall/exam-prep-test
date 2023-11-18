module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier"],
  ignorePatterns: ["dist", "jest.config.js"],
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
  plugins: ["@stylistic", "prettier"],
  rules: {
    "@stylistic/quotes": ["error", "double"],
    "prettier/prettier": ["error"],
  },
};
