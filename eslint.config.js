import eslintPluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import babelEslintParser from "@babel/eslint-parser";

export default [
  {
    ignores: ["node_modules", "dist"], // Add any directories to ignore
  },
  {
    files: ["src/**/*.js", "src/**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelEslintParser,  // Set the parser to Babel ESLint parser
      parserOptions: {
        requireConfigFile: false, // Disable config file check
        babelOptions: {
          presets: ["@babel/preset-react"], // Enable JSX support
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {},
    plugins: {
      react: eslintPluginReact,
      prettier: eslintConfigPrettier,
    },
  },
  {
    extends: "eslint:recommended",
  }
];