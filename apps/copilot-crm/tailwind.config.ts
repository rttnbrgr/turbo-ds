import baseConfig from "@repo/ui/tailwind.config";

const overrideConfig = {
  presets: [baseConfig],
  theme: {
    extend: {
      colors: {
        custom: "var(--custom)",
        // primary: {
        //   foreground: "green",
        // },
      },
    },
  },
};

export default overrideConfig;
