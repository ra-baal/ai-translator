export const Languages = {
  English: "en",
  Polish: "pl",
  German: "de",
  Spanish: "es",
  French: "fr",
  Italian: "it",
  Portuguese: "pt",
  Russian: "ru",
  Chinese: "zh",
  Japanese: "ja",
  Korean: "ko",
  Arabic: "ar",
  Hindi: "hi",
  Bengali: "bn",
  Turkish: "tr",
  Vietnamese: "vi",
  Indonesian: "id",
  Dutch: "nl",
  Greek: "el",
  Swedish: "sv",
  Ukrainian: "uk",
  Thai: "th",
} as const;

export type Language = (typeof Languages)[keyof typeof Languages];

export const AllLanguages = Object.values(
  Languages
).sort() as readonly Language[];

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
    case Languages.Spanish:
      return { labelNative: "español", labelEN: "Spanish" };
    case Languages.French:
      return { labelNative: "français", labelEN: "French" };
    case Languages.Italian:
      return { labelNative: "italiano", labelEN: "Italian" };
    case Languages.Portuguese:
      return { labelNative: "português", labelEN: "Portuguese" };
    case Languages.Russian:
      return { labelNative: "русский", labelEN: "Russian" };
    case Languages.Chinese:
      return { labelNative: "中文", labelEN: "Chinese" };
    case Languages.Japanese:
      return { labelNative: "日本語", labelEN: "Japanese" };
    case Languages.Korean:
      return { labelNative: "한국어", labelEN: "Korean" };
    case Languages.Arabic:
      return { labelNative: "العربية", labelEN: "Arabic" };
    case Languages.Hindi:
      return { labelNative: "हिन्दी", labelEN: "Hindi" };
    case Languages.Bengali:
      return { labelNative: "বাংলা", labelEN: "Bengali" };
    case Languages.Turkish:
      return { labelNative: "Türkçe", labelEN: "Turkish" };
    case Languages.Vietnamese:
      return { labelNative: "Tiếng Việt", labelEN: "Vietnamese" };
    case Languages.Indonesian:
      return { labelNative: "Bahasa Indonesia", labelEN: "Indonesian" };
    case Languages.Dutch:
      return { labelNative: "Nederlands", labelEN: "Dutch" };
    case Languages.Greek:
      return { labelNative: "Ελληνικά", labelEN: "Greek" };
    case Languages.Swedish:
      return { labelNative: "svenska", labelEN: "Swedish" };
    case Languages.Ukrainian:
      return { labelNative: "українська", labelEN: "Ukrainian" };
    case Languages.Thai:
      return { labelNative: "ไทย", labelEN: "Thai" };
    default:
      return { labelNative: "", labelEN: "" };
  }
};
