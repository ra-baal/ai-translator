"use client";

import { RequestBody } from "@/app/api/translate/route";
import { ensure } from "@/common/ensure";
import { Language } from "@/common/language";
import { useState } from "react";

interface UseTranslationArgs {
  sourceLang?: Language;
  targetLang: Language;
}

interface UseTranslation {
  text: string;
  setText: (text: string) => void;
  translation: string;
  isLoading: boolean;
  sourceLang: Language | undefined;
  setSourceLang: (lang: Language | undefined) => void;
  targetLang: Language;
  setTargetLang: (lang: Language) => void;
  translate: () => void;
}

export default function useTranslation(
  args: UseTranslationArgs
): UseTranslation {
  const [sourceLang, setSourceLang] = useState<Language | undefined>(
    args.sourceLang
  );
  const [targetLang, setTargetLang] = useState<Language>(args.targetLang);
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);

    const request: RequestBody = {
      text: text,
      targetLanguage: targetLang,
      sourceLanguage: sourceLang,
    };

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const trans = ensure.objectWithFields(await response.json(), {
        response: "",
      });

      setTranslation(trans.response);
    } catch (error) {
      setTranslation("");
    } finally {
      setIsLoading(false);
    }
  };

  const hook: UseTranslation = {
    setText: setText,
    translation: translation,
    isLoading: isLoading,
    text: text,
    sourceLang: sourceLang,
    setSourceLang: setSourceLang,
    targetLang: targetLang,
    setTargetLang: setTargetLang,
    translate: handleTranslate,
  };

  return hook;
}
