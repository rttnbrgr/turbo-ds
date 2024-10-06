import type { StorybookConfig } from "@storybook/nextjs";
import { join, dirname } from "path";

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("storybook-addon-pseudo-states"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  // LEGZ
  // this was in theory supposed to work in tandem with pointing at the global.css file in the root of the project.
  // instead I've setup the build:css script in the ui package.json to compile the global.css file into a dist/output.css file.
  // webpackFinal: async (config) => {
  //   if (config.module && config.module.rules) {
  //     config.module.rules.push({
  //       test: /\.css$/,
  //       use: [
  //         "style-loader",
  //         {
  //           loader: "css-loader",
  //           options: {
  //             importLoaders: 1,
  //           },
  //         },
  //         "postcss-loader",
  //       ],
  //       include: [join(__dirname, "..", "src")],
  //     });
  //   }
  //   return config;
  // },
};

export default config;
