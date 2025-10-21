interface Is {
  obj: (x: unknown) => x is Record<string, unknown>;
  string: (x: unknown) => x is string;
  sameType: (x: unknown, y: unknown) => boolean;
  array: (x: unknown) => x is Array<unknown>;
}

export const is: Is = {
  obj: function (x): x is Record<string, unknown> {
    return x && typeof x === "object" && !Array.isArray(x) ? true : false;
  },

  string: function (x): x is string {
    return typeof x === "string";
  },

  sameType: function (x, y) {
    return typeof x === typeof y;
  },

  array: function (x): x is Array<unknown> {
    return Array.isArray(x);
  },
};
