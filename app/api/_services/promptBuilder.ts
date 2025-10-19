import { Either, left, right } from "@/common/either";

type TranslationArgs = {
  text: string;
  sourceLanguage?: string;
  targetLanguage: string;
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

      const lang = args.sourceLanguage
        ? `from ${args.sourceLanguage} into ${args.targetLanguage}`
        : `into ${args.targetLanguage}`;

      const ctx = args.context ? `Context: "${args.context}"` : null;

      const prompt = joinLines([
        "You are a professional translator.",
        ...(ctx ? [ctx] : []),
        `Translate the following ${type} ${lang}.`,
        `The ${type} to translate: "${args.text}".`,
        "Instructions:",
        "- Maintain original meaning and tone.",
        `- Adapt idioms and phrasing naturally to ${args.targetLanguage}.`,
        "- If context is provided, use it to choose the most accurate translation.",
        "- Return only the translated text as a single string, with no additional text, labels, or formatting.",
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
  return {
    text: safeText(args.text),
    sourceLanguage: args.sourceLanguage
      ? safeText(args.sourceLanguage)
      : undefined,
    targetLanguage: safeText(args.targetLanguage),
    context: args.context ? safeText(args.context) : undefined,
  };
}

function safeText(text: string): string {
  return text.replace(/"/g, '\\"');
}
