# UI Package

This package provides a base set of Tailwind CSS configurations and global CSS properties for all applications within the monorepo. It serves as the foundation for styling, ensuring consistency across apps. However, each app that consumes this package can override or extend the styles to meet specific needs.

## Features

- **Base Tailwind CSS Config**: The package includes a base Tailwind configuration (`tailwind.config.js`) that defines foundational design tokens like colors, typography, and spacing.
- **Global CSS**: The global CSS properties, such as root variables, are included to set consistent theming options like color schemes are defined in the `global.css` file.

## Usage

### Base Tailwind Configuration

Each consuming app can use the base Tailwind configuration provided by the UI package. To do this, import the base configuration and apply any necessary overrides.

#### Example Tailwind Config Override

To extend or modify the base configuration from the UI package, you can import the base config and override specific parts:

```js
// apps/myapp/tailwind.config.js
import baseConfig from "@repo/ui/tailwind.config";

const overrideConfig = {
  presets: [baseConfig], // Extend from the base configuration
  theme: {
    extend: {
      colors: {
        custom: "magenta", // Add a custom color
        primary: {
          foreground: "green", // Override the primary foreground color
        },
      },
    },
  },
};

export default overrideConfig;
```

In this example:

- The `baseConfig` is used as a starting point.
- The `extend` field allows you to modify or add custom values, such as overriding the `primary` color.

### Base CSS Properties

Global CSS variables and styles are also provided through this package. These styles define base-level theming options, like the `--primary` color, which can be overridden by each app if necessary.

#### Example CSS Override

You can override CSS properties like this in a `overrides.css` file:

```css
/* apps/mayapp/overrides.css */
@tailwind base;

@layer base {
  :root {
    --primary: 51, 100%, 50%; /* Override the primary color custom property value*/
  }
}
```

In this example:

- The base Tailwind styles are imported with `@tailwind base`.
- Root-level CSS variables (such as `--primary`) are overridden within the `@layer base` directive.

### How to Apply Overrides

1. **CSS Overrides**: Add the override rules in your custom CSS file, typically named something like `overrides.css`, and ensure this file is loaded in your app’s entry point.
2. **Tailwind Config Overrides**: Override the Tailwind config by importing the base config and adding your customizations within the `theme.extend` field.

## Development Notes

- The `@repo/ui` package acts as the source of truth for global design tokens, ensuring a cohesive design system across apps.
- Overrides should be applied sparingly to ensure consistency and avoid design drift between apps.

## Adding UI Components

Use the pre-made script to add UI components:

```sh
pnpm ui add <component-name>
```

This works similarly to the `shadcn/ui` CLI, but will ensure the component is installed at the correct location and you can run it directly from the root of the monorepo

```js
// ✅ Preferred
pnpm ui add toast

// ❌ Not Recommended
npx shadcn@latest add toast
```

> The `npx shadcn@latest` command can be used if run from inside the component library package, but the `pnpm ui add` streamlines this and prevents user error.

## Development with Storybook

This package includes several npm scripts to aid in development, testing, and building. Here's an overview of the available scripts:

### Development

Starts the development server for Storybook (For local development)

```
pnpm storybook
```

This is a custom storybook command that will watch the `tailwind.config.ts`, `globals.css` file as well as the components directory automatically rebuilding the output tailwind css as you work. It does this by running the `storybook:watch` and `tailwind:watch` commands concurrently.

`build-storybook`: Builds a static version of Storybook for deployment.

```
pnpm build-storybook
```
