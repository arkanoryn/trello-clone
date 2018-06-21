module.exports = {
  "extends": ["airbnb"],
  "plugins": [
    "import"
  ],
  "rules": {
    "react/jsx-filename-extension": 0,
    "camelcase": 0,
    "arrow-parens": [2, "always"],
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
    "no-multi-spaces": [
      "error",
      {
        exceptions: {
          "ImportDeclaration": true,
          "VariableDeclarator": true,
        }
      }
    ],
    "max-len": [2, { "code": 120 }],
    "indent": ["error", 2, {
      "VariableDeclarator": 2,
      "SwitchCase": 1,
      "MemberExpression": 1,
      "FunctionDeclaration": { "body": 1, "parameters": "first" },
      "CallExpression": { "arguments": "first" },
      "ArrayExpression": "first",
      "ObjectExpression": "first",
      ImportDeclaration: "first",
    }],
    "arrow-body-style": ["error", "always"],
    "key-spacing": [1, { "align": "value" }],
    "react/prop-types": 0,
    "jsx-a11y/href-no-hash": 0,
  },
  "globals": {
    "fetch": true,
    "window": true,
    "document": true,
    "localStorage": true
  }
};
