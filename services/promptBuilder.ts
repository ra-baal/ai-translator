import { Either, left, right } from "@/common/either";
import { AllLanguages, getLangData, Language } from "@/common/language";

type TranslationArgs = {
  text: string;
  sourceLanguage?: Language;
  targetLanguage: Language;
  context?: string;
};

export default function createPromptBuilder() {
  return {
    translation: function (
      args: TranslationArgs
    ): Either<"no text to translate", string> {
      args = safeArgs(args);

      const type = detectInputType(args.text);

      if (type === "nothing") {
        return left("no text to translate");
      }

      const sourceLabel = args.sourceLanguage
        ? getLangData(args.sourceLanguage).labelEN
        : undefined;

      const targetLabel = getLangData(args.targetLanguage).labelEN;

      const lang = sourceLabel
        ? `from ${sourceLabel} into ${targetLabel}`
        : `into ${targetLabel}`;

      const context = args.context ? `Context: "${args.context}"` : null;

      const prompt = joinLines([
        "You are a professional translator.",
        ...(context ? [context] : []),
        `Translate the following ${type} ${lang}.`,
        `The ${type} to translate: "${args.text}".`,
        "Instructions:",
        type === "word" ? null : "- Maintain original meaning and tone.",
        type === "word"
          ? null
          : `- Adapt idioms and phrasing naturally to ${targetLabel}.`,
        context && "- Use context to choose the most accurate translation.",
        "- Return only the translation as a single string, with no additional text, labels, or formatting.",
      ]);

      return right(prompt);
    },
  };
}

type InputType = "nothing" | "word" | "phrase" | "sentence" | "text";

/**
 * Na podstawie długosci, liczby slow i interpunkcji
 * okresla typ wejscia: word / phrase / sentence / text
 */
function detectInputType(text: string): InputType {
  const trimmedText = text.trim();

  if (trimmedText === "") return "nothing";

  const wordCount = trimmedText.split(/\s+/).length;
  const hasPunctuation = /[.!?]/.test(trimmedText);
  const endsWithPunctuation = /[.!?]$/.test(trimmedText);

  if (wordCount === 1) return "word";
  if (wordCount <= 4 && !hasPunctuation) return "phrase";
  if (wordCount <= 20 && hasPunctuation && endsWithPunctuation)
    return "sentence";
  return "text";
}

function joinLines(lines: (string | null)[]): string {
  return lines.filter((x) => x !== null).join("\n");
}

function safeArgs(args: TranslationArgs): TranslationArgs {
  const targetLanguage = AllLanguages.find((x) => x === args.targetLanguage);

  if (!targetLanguage) {
    throw new Error("Invalid target language.");
  }

  return {
    text: safeText(args.text),
    sourceLanguage:
      AllLanguages.find((x) => x === args.sourceLanguage) ?? undefined,
    targetLanguage: targetLanguage,
    context: args.context ? safeText(args.context) : undefined,
  };
}

function safeText(text: string): string {
  return text.replace(/"/g, '\\"');
}
