const string = {
  isNullOrWhiteSpace(str: string | null | undefined) {
    return string.isNullOrEmpty(str) || /^\s*$/.test(str);
  },

  isNullOrEmpty(str: string | null | undefined) {
    return str === null || str === undefined || str === "";
  },
} as const;

export default string;
