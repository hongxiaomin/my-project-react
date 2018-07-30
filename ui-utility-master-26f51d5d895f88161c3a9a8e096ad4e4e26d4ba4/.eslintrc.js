module.exports = {
  "env": {
    "mocha": true,
    "node": true,
  },
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [
    "react",
  ],
  globals: {
    Paho: true,
  },
  "rules": {
    "react/prefer-es6-class": 1,
    "react/jsx-pascal-case": 1,
    "react/jsx-closing-bracket-location": 1,
    "react/wrap-multilines": 1,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "react/jsx-filename-extension": 0,
    "no-eval": 0,
  }
};
