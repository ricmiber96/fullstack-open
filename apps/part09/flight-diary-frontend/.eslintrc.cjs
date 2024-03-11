module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
     "error",
       2
     ],
   "linebreak-style": [
     "error",
     "unix"
   ],
   "quotes": [
     "error",
     "single"
   ],
   "semi": [
     "error",
     "never"
   ],
   "eqeqeq": "error",
   "no-trailing-spaces": "error",
   "object-curly-spacing": [
     "error", "always"
   ],
   "arrow-spacing": [
     "error", { "before": true, "after": true }
   ],
   "no-console": "warn",
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/semi": ["error"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { "argsIgnorePattern": "^_" }
      ],
      "no-case-declarations": "off"
   }
}
