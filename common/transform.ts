export const transform = <T, G>(x: T, f: (x: T) => G): G => {
  return f(x);
};
