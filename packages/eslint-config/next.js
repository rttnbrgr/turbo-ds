const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    require.resolve("@vercel/style-guide/eslint/next"),
    "turbo",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ["only-warn"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  react: {
    version: "detect", // Automatically detect the react version
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
};

// const { resolve } = require("node:path");

// const project = resolve(process.cwd(), "tsconfig.json");

// /** @type {import("eslint").Linter.Config} */
// module.exports = {
//   extends: [
//     "eslint:recommended",
//     require.resolve("@vercel/style-guide/eslint/next"),
//     "turbo",
//     "plugin:react/recommended",
//     "plugin:react-hooks/recommended",
//   ],
//   globals: {
//     React: true,
//     JSX: true,
//   },
//   env: {
//     node: true,
//     browser: true,
//   },
//   plugins: ["only-warn"],
//   settings: {
//     "import/resolver": {
//       typescript: {
//         project,
//       },
//     },
// react: {
//   version: "detect", // Automatically detect the react version
// },
//   },
//   ignorePatterns: [
//     // Ignore dotfiles
//     ".*.js",
//     "node_modules/",
//   ],
//   overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
// };
