'use client';

import React, { useState } from 'react';
import { Textarea } from '../atoms/shadcn/textarea';
import { Label } from '../atoms/shadcn/label';
import { SelectGroup } from '@radix-ui/react-select';
import MSelector from '../molecules/MSelector';

interface TranslatorProps {
    className?: string;
}

enum Language {
    English = 'en',
    Polish = 'pl',
    German = 'de',
    Undefined = 'undefined'
}

const transform = <T, G>(x: T, f: (x: T) => G): G => {
    return f(x);
}

const langObj = (lang: Language): {
    labelNative: string,
    labelEN: string
} => {
    switch (lang) {
        case Language.English: return { labelNative: 'English', labelEN: 'English' };
        case Language.Polish: return { labelNative: 'polski', labelEN: 'Polish' };
        case Language.German: return { labelNative: 'Deutsch', labelEN: 'German' };
        case Language.Undefined: return { labelNative: '?', labelEN: '?' };
        default: return { labelNative: '', labelEN: '' };
    }
}

const Translator: React.FC<TranslatorProps> = ({ className = '' }) => {
    const [text, setText] = useState('');
    const [translation, setTranslation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [langStart, setLangStart] = useState<Language>(Language.Undefined);
    const [langTarget, setLangTarget] = useState<Language>(Language.English);

    function createTranslationPrompt(): string {
        const context = undefined;
        const instruction =
            'Translate the following text ' +
            (langStart === Language.Undefined ? '' : `from ${langObj(langStart).labelEN} `) +
            `into ${langObj(langTarget).labelEN}. ` +
            (context ? 'Use the context to choose the correct meaning for the translation. ' : '') +
            'Output ONLY json {translation: "string"}\n';

        const contextPart = context ? `Context (for understanding meaning): ${context}\n` : '';
        const textPart = `Text to translate: ${text}`;

        return instruction + contextPart + textPart;
    }


    const handleTranslate = async () => {
        if (!text.trim() || isLoading) return;

        setIsLoading(true);

        const prompt = createTranslationPrompt();

        try {
            const response = await fetch('/api/prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: prompt,
                    history: [],
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            const t = data?.response ? JSON.parse(data.response) : '';

            setTranslation(t?.translation ?? '');
        } catch (error) {
            console.error('Error sending message:', error);
            setTranslation('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setText('');
        setTranslation('');
    }

    return (
        <div className={`max-w-4xl mx-auto p-6 ${className}`}>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Translator
                </h2>
            </div>

            <MSelector
                label='Language'
                onChange={val => {
                    setLangStart(val ? val as Language : Language.Undefined)
                }}
                defaultValue={Language.Undefined}
                options={[
                    transform(Language.Undefined, l => ({ label: 'detect language', value: l })),
                    transform(Language.Polish, l => ({ label: langObj(l).labelNative, value: l })),
                    transform(Language.English, l => ({ label: langObj(l).labelNative, value: l })),
                    transform(Language.German, l => ({ label: langObj(l).labelNative, value: l })),
                ]} />

            <MSelector
                label='Target language'
                onChange={val => {
                    setLangTarget(val ? val as Language : Language.Undefined)
                }}
                defaultValue={Language.English}
                options={[
                    transform(Language.English, l => ({ label: langObj(l).labelNative, value: l })),
                    transform(Language.Polish, l => ({ label: langObj(l).labelNative, value: l })),
                    transform(Language.German, l => ({ label: langObj(l).labelNative, value: l })),
                ]} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Text Input */}
                <div className="space-y-2">
                    <Label htmlFor='translator-text'>Text to translate</Label>
                    <Textarea
                        id='translator-text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter the text you want to translate..."
                        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 resize-none"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor='translator-translation'>Translation</Label>
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && <Textarea
                        id='translator-translation'
                        value={translation}
                        className="disabled:opacity-100 disabled:cursor-default w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 resize-none"
                        disabled={true}
                    />}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-3">
                <button
                    onClick={handleTranslate}
                    disabled={!text.trim()}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    Translate
                </button>
                <button
                    onClick={handleClear}
                    className="px-6 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    Clear
                </button>
            </div>

        </div>
    );
};

export default Translator;
