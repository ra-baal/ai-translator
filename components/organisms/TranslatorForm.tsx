"use client";

import { useState } from "react";
import { LanguageSelector } from "../molecules/LanguageSelector";
import { TextAreaGroup } from "../molecules/TextAreaGroup";
import { Button } from "../atoms/shadcn/button";

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "Polish", value: "pl" },
  // add more languages as needed
];

export const TranslatorForm = () => {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      // MVP: simulate translation
      await new Promise((resolve) => setTimeout(resolve, 500)); // fake API delay
      setOutputText(`[${targetLang}] ${inputText}`);
    } catch (err) {
      console.error("Translation error:", err);
      setOutputText("Error translating text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto p-4">
      <div className="flex gap-4 flex-wrap">
        <LanguageSelector
          label="From"
          value={sourceLang}
          onChange={setSourceLang}
          options={languageOptions}
        />
        <LanguageSelector
          label="To"
          value={targetLang}
          onChange={setTargetLang}
          options={languageOptions}
        />
      </div>

      <TextAreaGroup
        label="Input"
        value={inputText}
        onChange={setInputText}
        placeholder="Enter text"
      />

      <Button onClick={handleTranslate} disabled={loading}>
        {loading ? "Translating..." : "Translate"}
      </Button>

      <TextAreaGroup
        label="Output"
        value={outputText}
        onChange={() => {}}
        placeholder="Translated text"
        readOnly
      />
    </div>
  );
};
