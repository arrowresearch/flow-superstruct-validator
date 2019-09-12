/* @flow */
import { declare } from '@babel/helper-plugin-utils';
import syntaxFlow from '@babel/plugin-syntax-flow';

export default declare((api, opts) => {
  api.assertVersion(7);

  return {
    name: 'flow-superstruct-validator',
    inherits: syntaxFlow,
    visitor: {
      Function(path) {
        //console.log(path);
        return path;
      }
    }
  };
});
