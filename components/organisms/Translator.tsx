'use client';

import React, { useState } from 'react';

interface TranslatorProps {
    className?: string;
}

const Translator: React.FC<TranslatorProps> = ({ className = '' }) => {
    const [context, setContext] = useState('');
    const [text, setText] = useState('');
    const [translation, setTranslation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function createTranslationPrompt2(): string {
        const instruction =
            'Translate the following text into English. ' +
            'Provide a literal, word-for-word translation' + (context ? '. appropriate for the given context. ' : '. ') +
            'Output only the translated text, with no explanations, notes, or extra words.\n';

        const contextPart = context ? `Context: ${context}\n` : '';
        const textPart = `Text: ${text}`;

        return instruction + contextPart + textPart;
    }

    function createTranslationPrompt(): string {
        const instruction =
            'Translate the following text into English. ' +
            (context ? 'Use the context to choose the correct meaning for the translation. ' : '') +
            'Output only the translated text, with no explanations, notes, or extra words.\n';

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

            setTranslation(data.response ?? '');
        } catch (error) {
            console.error('Error sending message:', error);
            setTranslation('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setContext('');
        setText('');
        setTranslation('');
    };


    return (
        <div className={`max - w - 4xl mx - auto p - 6 space - y - 6 ${className} `}>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Translator
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Provide context and text to get accurate translations
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Context Input */}
                <div className="space-y-2">
                    <label htmlFor="context" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Context
                    </label>
                    <textarea
                        id="context"
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="Provide context for better translation accuracy..."
                        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 resize-none"
                    />
                </div>

                {/* Text Input */}
                <div className="space-y-2">
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Text to Translate
                    </label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter the text you want to translate..."
                        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 resize-none"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
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

            {/* Translation Output */}
            {/* {translation && ( */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Translation
                </label>
                <div className="w-full min-h-32 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                        {translation}
                    </p>
                </div>
            </div>
            {/* )} */}
        </div>
    );
};

export default Translator;
