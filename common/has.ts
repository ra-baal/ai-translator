import { is } from "./is";

interface Has {
  key: <Key extends string>(x: unknown, key: Key) => x is Record<Key, unknown>;
}

export const has: Has = {
  key: <Key extends string>(
    x: unknown,
    key: Key
  ): x is Record<Key, unknown> => {
    return is.obj(x) && key in x;
  },
} as const;
