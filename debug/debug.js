/* @flow */
const babel = require('@babel/core');
const fs = require('fs');

// require('@babel/register');

const flowSuperstructValidatorPlugin = require('../dist/index');

babel.transformFile(
  './debug/example.js',
  {
    presets: ['@babel/preset-flow'],
    plugins: [flowSuperstructValidatorPlugin, '@babel/plugin-transform-modules-commonjs']
  },
  (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Code transpiled');
    console.log('===============');
    console.log(result.code);
    console.log('===============');
  }
);
