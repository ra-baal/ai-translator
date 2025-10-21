import { is } from "./is";

const msg = "Invalid type";

interface Ensure {
  array: (x: unknown) => unknown[];
  object: (x: unknown) => Record<string, unknown>;
  objectWithFields<T extends NonNullable<object>>(x: unknown, t: T): T;
  objectWithKeys<T extends NonNullable<object>>(x: unknown, t: T): T;
}

export const ensure: Ensure = {
  array: function (x: unknown): unknown[] {
    if (is.array(x)) {
      return x;
    }

    throw new Error(msg);
  },

  object: function (x: unknown): Record<string, unknown> {
    if (is.obj(x)) {
      return x;
    }

    throw new Error(msg);
  },

  objectWithFields: function <T extends NonNullable<object>>(x: unknown, t: T) {
    const obj = ensure.object(x);

    Object.keys(t).forEach((key: string) => {
      const hasKey = key in obj;

      if (!hasKey) {
        throw new Error(msg);
      }

      const val_in_obj = obj[key];
      const val_in_t = t[key as keyof T];
      const isSameType = is.sameType(val_in_obj, val_in_t);

      if (!isSameType) {
        throw new Error(msg);
      }
    });

    return x as T;
  },

  objectWithKeys: function <T extends NonNullable<object>>(x: unknown, t: T) {
    const obj = ensure.object(x);

    Object.keys(t).forEach((key: string) => {
      const hasKey = key in obj;

      if (!hasKey) {
        throw new Error(msg);
      }
    });

    return x as T;
  },
};
