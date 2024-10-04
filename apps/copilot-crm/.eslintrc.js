/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: [
    "@typescript-eslint",
    "prettier",
    "react",
    "react-hooks",
    "only-warn",
  ],
  rules: {
    "react/no-unescaped-entities": "off", // this was preventing me from using a single quote in a string, it would be pretty annoying to have to escape every single quote
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "react/react-in-jsx-scope": "off", // Next.js already includes React
    "react/prop-types": "off", // Optional: Turn this off if you're using TypeScript
  },
};
