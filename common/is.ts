interface Is {
  obj: (x: unknown) => x is Record<string, unknown>;
  string: (x: unknown) => x is string;
  sameType: (x: unknown, y: unknown) => boolean;
  array: (x: unknown) => x is Array<unknown>;
}

export const is: Is = {
  obj(x): x is Record<string, unknown> {
    return x !== null && typeof x === "object" && !Array.isArray(x);
  },

  string(x): x is string {
    return typeof x === "string";
  },

  sameType(x, y): boolean {
    const tx = Object.prototype.toString.call(x);
    const ty = Object.prototype.toString.call(y);
    return tx === ty;
  },

  array(x): x is Array<unknown> {
    return Array.isArray(x);
  },
} as const;
