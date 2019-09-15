/* @flow */
import { execFile as _execFile, execFileSync } from 'child_process';
//import { promisify } from 'util';
import { resolve } from 'path';
//const execFile = promisify(_execFile);

export type TypeAlias = {
  kind: 'TypeAlias',
  body: Types
};

export type Num = {
  kind: 'Num'
};

export type Str = { kind: 'Str' };

export type Field = { kind: 'field', type: Types, polarity: string, optional: boolean };

export type NamedProp = {
  kind: 'NamedProp',
  prop: Field
};

export type Obj = {
  kind: 'Obj',
  exact: boolean,
  frozen: boolean,
  literal: boolean,
  props: NamedProp[]
};

export type Types = TypeAlias | Obj | Num | Str;

//export type TypeKinds = Types.kind

export type ExpandedType = {
  kind: string, // TODO should be string literal union
  name: {
    provenance: {
      kind: string,
      loc: string
    },
    name: string
  },
  typeParams: any[] | null,
  body: {}
};

export type LineOfCode = {
  line: number,
  column: number,
  offset: number
};

export type Location = {
  source: string | null,
  type: string | null, // should be string literal union
  start: LineOfCode,
  end: LineOfCode
};

export type TypeAtPos = {
  expanded_type: ?ExpandedType,
  type: string,
  reasons: any[],
  loc: Location,
  path: string,
  line: number,
  endline: number,
  start: number,
  end: number
};

export const getFlowType = (
  filename: string,
  loc: {| line: number, column: number |}
): TypeAtPos => {
  try {
    const stdout = execFileSync(
      'node',
      [
        './node_modules/flow-bin/cli.js',
        'type-at-pos',
        filename,
        loc.line.toString(),
        loc.column.toString(),
        '--json',
        '--lazy',
        '--pretty',
        '--expand-type-aliases',
        '--expand-json-output'
      ],
      { cwd: resolve('./'), encoding: 'UTF-8' }
    );
    console.log(stdout);

    if (typeof stdout !== 'string') throw new Error('no buffer');

    return JSON.parse(stdout);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//getFlowType('./example.js', { line: 9, column: 29 });
