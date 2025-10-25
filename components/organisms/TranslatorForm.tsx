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
        options={[...options, { label: "detect", value: "detect" }]}
        className="flex-1"
      />
      <LanguageSelector<Language>
        label="To"
        value={translation.targetLang}
        onChange={translation.setTargetLang}
        options={options}
        className="flex-1"
      />
      <div className="flex items-end justify-end">
        <Button
          disabled={
            translation.isLoading || string.isNullOrWhiteSpace(translation.text)
          }
          onClick={translation.translate}
        >
          {translation.isLoading ? "Translating..." : "Translate"}
        </Button>
      </div>
    </div>
  );

  const areas = (
    <div className="flex flex-col gap-4">
      <TextAreaGroup
        value={translation.text}
        onChange={(val, key) => {
          translation.setText(val);
          if (key === "Enter") {
            translation.translate();
          }
        }}
        placeholder="Enter text to translate"
        className="flex-1"
        rows={5}
      />
      {translation.translation && (
        <TextAreaGroup
          value={translation.translation}
          onChange={() => {}}
          placeholder="Translation"
          readOnly
          className="flex-1"
          rows={5}
        />
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto p-4">
      {selectors}
      {areas}
    </div>
  );
};
