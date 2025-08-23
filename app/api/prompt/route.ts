import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface RequestBody {
    message: string;
    history: ChatMessage[];
}

export async function POST(request: NextRequest) {
    try {
        const body: RequestBody = await request.json();
        const { message, history } = body;

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Check if GROQ_API_KEY is available
        const groqApiKey = process.env.GROQ_API_KEY;
        if (!groqApiKey) {
            return NextResponse.json(
                { error: 'GROQ_API_KEY is not configured' },
                { status: 500 }
            );
        }

        // Prepare messages for Groq API
        const messages: ChatMessage[] = [
            {
                role: 'system',
                content: 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.',
            },
            ...history.slice(-1), // Keep last 1 messages for context
            {
                role: 'user',
                content: message,
            },
        ];

        // Call Groq API
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${groqApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192', // You can change this to other Groq models
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
                stream: false,
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Groq API error:', errorData);
            return NextResponse.json(
                { error: 'Failed to get response from AI service' },
                { status: 500 }
            );
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content;

        if (!aiResponse) {
            return NextResponse.json(
                { error: 'No response from AI service' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            response: aiResponse,
            model: data.model,
            usage: data.usage,
        });

    } catch (error) {
        console.error('Error in prompt API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 
