const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "turbo"],
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
};

// const { resolve } = require("node:path");

// const project = resolve(process.cwd(), "tsconfig.json");

// /** @type {import("eslint").Linter.Config} */
// module.exports = {
//   extends: [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:prettier/recommended",
//     "plugin:react/recommended",
//     "plugin:react-hooks/recommended",
//     "turbo",
//   ],
//   plugins: [
//     "@typescript-eslint",
//     "prettier",
//     "react",
//     "react-hooks",
//     "only-warn",
//   ],
// rules: {
//   "react/no-unescaped-entities": "off", // this was preventing me from using a single quote in a string, it would be pretty annoying to have to escape every single quote
//   "@typescript-eslint/no-empty-object-type": "off",
//   "@typescript-eslint/no-explicit-any": "off",
//   "@typescript-eslint/no-unused-vars": "off",
//   "prettier/prettier": ["error", {}, { usePrettierrc: true }],
//   "react/react-in-jsx-scope": "off", // Next.js already includes React
//   "react/prop-types": "off", // Optional: Turn this off if you're using TypeScript
// },
//   globals: {
//     React: true,
//     JSX: true,
//   },
//   env: {
//     node: true,
//   },
//   settings: {
//     "import/resolver": {
//       typescript: {
//         project,
//       },
//     },
//   },
//   ignorePatterns: [
//     // Ignore dotfiles
//     ".*.js",
//     "node_modules/",
//     "dist/",
//   ],

//   overrides: [
//     {
//       files: ["*.js?(x)", "*.ts?(x)"],
//     },
//   ],
// };
