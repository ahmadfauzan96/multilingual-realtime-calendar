// @ts-check
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

// Cast the plugin object to avoid the React Hooks package's legacy/flat config type mismatch.
const reactHooksPlugin = reactHooks;

// const reactHooksRules =
//   (Array.isArray(reactHooksPlugin.configs?.flat?.recommended)
//     ? reactHooksPlugin.configs.flat.recommended[0]?.rules
//     : reactHooksPlugin.configs?.flat?.recommended?.rules) ??
//   reactHooksPlugin.configs?.recommended?.rules ??
//   {};

const reactHooksRules =
  reactHooksPlugin.configs.flat?.recommended.rules ?? reactHooksPlugin.configs.recommended.rules;

export default defineConfig([
  // 1. Global ignores (must be in its own object with only `ignores`)
  { ignores: ["dist", "node_modules", ".eslintcache"] },
  // 2. Base JS & TS recommended presets
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // 3. Project-specific overrides for TypeScript & React files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": /** @type {import("eslint").ESLint.Plugin} */ (reactHooksPlugin),
      "react-refresh": reactRefresh,
    },
    settings: { react: { version: "18.2" } },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooksRules,
      "react/jsx-no-target-blank": "off",
      "react/prop-types": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);
