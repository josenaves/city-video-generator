import { config } from "@remotion/eslint-config-flat";

export default [
  ...config,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "prefer-const": "off",
      "@remotion/non-pure-animation": "off",
    },
  },
  {
    files: ["src/Root.tsx"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];
