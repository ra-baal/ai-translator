"use client";

import { LanguageSelector } from "../molecules/LanguageSelector";
import { TextAreaGroup } from "../molecules/TextAreaGroup";
import { Button } from "../atoms/shadcn/button";
import { AllLanguages, getLangData, Language } from "@/common/language";
import useTranslation from "@/hooks/useTranslation";
import string from "@/common/string";

export const TranslatorForm = () => {
  const translation = useTranslation({
    targetLang: "pl",
  });

  const options = AllLanguages.map((l) => {
    const ld = getLangData(l);
    return { label: ld.labelEN, value: l };
  });

  const selectors = (
    <div className="flex flex-row gap-4">
      <LanguageSelector<Language | "detect">
        label="From"
        value={translation.sourceLang ?? "detect"}
        onChange={(val) =>
          translation.setSourceLang(val === "detect" ? undefined : val)
        }
        options={[...options, { label: "Detect language", value: "detect" }]}
        className="flex-1"
      />
      <LanguageSelector<Language>
        label="To"
        value={translation.targetLang}
        onChange={translation.setTargetLang}
        options={options}
        className="flex-1"
      />
    </div>
  );

  const areas = (
    <div className="flex flex-col md:flex-row gap-4">
      <TextAreaGroup
        label="Text"
        value={translation.text}
        onChange={translation.setText}
        placeholder="Enter text"
        className="flex-1"
        rows={5}
      />
      <TextAreaGroup
        label="Translation"
        value={translation.translation}
        onChange={() => {}}
        placeholder="Translated text"
        readOnly
        className="flex-1"
        rows={5}
      />
    </div>
  );

  const button = (
    <div className="flex justify-end">
      <Button
        disabled={
          translation.isLoading || string.isNullOrWhiteSpace(translation.text)
        }
        onClick={translation.translate}
      >
        {translation.isLoading ? "Translating..." : "Translate"}
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto p-4">
      {selectors}
      {areas}
      {button}
    </div>
  );
};
