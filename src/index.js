/* @flow */
import { declare } from '@babel/helper-plugin-utils';
import syntaxFlow from '@babel/plugin-syntax-flow';
import type { Node, NodePath } from '@babel/traverse';
import { getFlowType } from './get-flow-type';
//import type {} frin '.getflow

export default declare((api, opts) => {
  api.assertVersion(7);

  return {
    name: 'flow-superstruct-validator',
    inherits: syntaxFlow,
    visitor: {
      CallExpression(path: NodePath, state) {
        if (
          !!path.node.typeArguments &&
          path.node.typeArguments.params &&
          path.node.typeArguments.params.length >= 1
        ) {
          const typeArgLoc = path.node.typeArguments.loc;
          const flowType = getFlowType(state.filename, { line: 9, column: 32 });
          const a = flowType.expanded_type;
        }
      }
    }
  };
});
