export const Languages = {
  English: "en",
  Polish: "pl",
  German: "de",
} as const;

export type Language = (typeof Languages)[keyof typeof Languages];

export const AllLanguages = Object.values(Languages);

export const getLangData = (
  lang: Language
): {
  labelNative: string;
  labelEN: string;
} => {
  switch (lang) {
    case Languages.English:
      return { labelNative: "English", labelEN: "English" };
    case Languages.Polish:
      return { labelNative: "polski", labelEN: "Polish" };
    case Languages.German:
      return { labelNative: "Deutsch", labelEN: "German" };
    default:
      return { labelNative: "", labelEN: "" };
  }
};
