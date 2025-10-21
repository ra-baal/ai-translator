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
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <LanguageSelector
          label="From"
          value={sourceLang}
          onChange={setSourceLang}
          options={languageOptions}
          className="flex-1"
        />
        <LanguageSelector
          label="To"
          value={targetLang}
          onChange={setTargetLang}
          options={languageOptions}
          className="flex-1"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <TextAreaGroup
          label="Input"
          value={inputText}
          onChange={setInputText}
          placeholder="Enter text"
          className="flex-1"
        />
        <TextAreaGroup
          label="Output"
          value={outputText}
          onChange={() => {}}
          placeholder="Translated text"
          readOnly
          className="flex-1"
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleTranslate}>
          {loading ? "Translating..." : "Translate"}
        </Button>
      </div>
    </div>
  );
};
