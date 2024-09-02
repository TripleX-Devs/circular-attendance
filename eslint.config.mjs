import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: { globals: globals.browser },
    rules: {
      // Indentation rule: 2 spaces
      "indent": ["error", 2],
      // Space before function parenthesis
      "space-before-function-paren": ["error", "always"],
      // No space inside parentheses
      "space-in-parens": ["error", "never"]
    }
  },
  { ignores: ["dist", "node_modules"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];