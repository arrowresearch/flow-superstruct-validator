/* @flow */
import { validate } from '../src/index.js';

type User = {
  name: string,
  age: number
};

export const obj = validate<User>(JSON.parse('{ "name": "John Doe" }'));
