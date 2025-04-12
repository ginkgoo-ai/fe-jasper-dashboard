module.exports = {
  parser: "typescript",
  overrides: [
    {
      files: ["*.css", "*.scss"],
      options: {
        parser: "css",
      },
    },
    {
      files: "*.json",
      options: {
        parser: "json",
      },
    },
    {
      files: ["*.md", "*.markdown"],
      options: {
        parser: "markdown",
      },
    },
    {
      files: ["*.js", "*.jsx"],
      options: {
        parser: "babel",
        semi: true,
        trailingComma: "es5",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      options: {
        parser: "typescript",
        semi: true,
        trailingComma: "es5",
      },
    },
  ],
  jsxSingleQuote: false,
  singleQuote: false,
  printWidth: 140,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "es5",
  bracketSameLine: false,
  bracketSpacing: true,
  arrowParens: "always",
  quoteProps: "preserve",
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  importOrder: ["^react$", "^next", "^@/(.*)$", "^[./]"],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};
