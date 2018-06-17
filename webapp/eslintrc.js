module.exports = {
    "extends": ["airbnb", "plugin:flowtype/recommended"],
    "plugins": [
      "react",
      "jsx-a11y",
      "import"
    ],
    "rules": {
      "react/jsx-filename-extension": 0,
      "camelcase": 0,
      "arrow-parens": [2, "always"],
      "jsx-a11y/href-no-hash": "off",
      "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
    },
    "globals": {
      "fetch": true,
      "window": true,
      "document": true,
      "localStorage": true
    }
  };