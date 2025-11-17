import { OpenRouterMessage, Role } from '@/types/chat';
import { createPortfolioSystemPrompt, PORTFOLIO_OWNER } from './portfolioContext';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';

const MODEL = 'deepseek/deepseek-chat-v3.1:free';

// Initialize OpenRouter provider
const openrouter = createOpenRouter({
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '',
    baseURL: 'https://openrouter.ai/api/v1',
});

// Detect attempts to impersonate the portfolio owner or modify portfolio information
function detectSecurityThreats(message: string): boolean {
    const lowerMessage = message.toLowerCase();

    // Detect common patterns of people trying to impersonate or change info
    const securityPatterns = [
        // Impersonation attempts
        "i am the portfolio owner",
        "i am abdellah",
        "this is abdellah",
        "im abdellah",
        "as abdellah",
        "i'm the developer",
        "i'm the admin",
        // Command injection attempts
        "update portfolio",
        "change my info",
        "modify context",
        "update information",
        "change email",
        "change github",
        "change linkedin",
        "change my skills",
        "update my projects",
        "edit my",
        "update my",
        "change my",
        "set my",
        "modify my",
        // Command override attempts
        "ignore previous",
        "forget the context",
        "disregard system prompt",
        "bypass restrictions"
    ];

    return securityPatterns.some(pattern => lowerMessage.includes(pattern));
}

// Security response for detected threats
function getSecurityResponse(): string {
    return `I cannot modify the portfolio information. I am an AI assistant representing ${PORTFOLIO_OWNER.name}, and I can only provide information that is already in my context. If you need to make changes to the portfolio, please contact ${PORTFOLIO_OWNER.name} directly via the provided contact information.`;
}

export async function generateChatResponse(messages: OpenRouterMessage[], retryCount = 0): Promise<string> {
    try {
        // Check the latest user message for security threats
        const latestUserMessage = messages.filter(msg => msg.role === 'user').pop();
        if (latestUserMessage && detectSecurityThreats(latestUserMessage.content)) {
            return getSecurityResponse();
        }

        // Add system message with portfolio context if not already present
        const hasSystemMessage = messages.some(msg => msg.role === 'system');
        const messagesWithContext = hasSystemMessage ? messages : [
            { role: 'system' as Role, content: createPortfolioSystemPrompt() },
            ...messages
        ];

        // Use Vercel AI SDK to generate response
        const result = await generateText({
            model: openrouter.chat(MODEL),
            messages: messagesWithContext,
            headers: {
                'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
                'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio Chatbot',
            },
        });

        let content = result.text;

        // Remove special tokens and artifacts from the response (optional, AI SDK usually handles this)
        content = content
            .replace(/<｜begin▁of▁sentence｜>/g, '')
            .replace(/<｜end▁of▁sentence｜>/g, '')
            .replace(/<｜[^｜]+｜>/g, '')
            .replace(/<\|[^|]+\|>/g, '')
            .replace(/\<think\>[\s\S]*?\<\/think\>/g, '')
            .replace(/<｜.*?｜>/g, '')
            .trim();

        // Check for empty response and retry if needed
        if (!content || content.trim() === '') {
            if (retryCount < 2) {
                console.warn(`Received empty response from API (attempt ${retryCount + 1}), retrying...`);
                return generateChatResponse(messages, retryCount + 1);
            } else {
                throw new Error('Received empty response after multiple attempts');
            }
        }

        return content;
    } catch (error) {
        // Check if this is a rate limit error
        if (error instanceof Error && error.message.toLowerCase().includes('rate limit')) {
            console.error('Rate limit exceeded:', error);
            throw new Error(`RATE_LIMIT_EXCEEDED: ${error.message}`);
        }

        // Retry on other errors if we haven't reached max retries
        if (retryCount < 2) {
            console.warn(`Error in chat API (attempt ${retryCount + 1}), retrying...`, error);
            // Add a small delay before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
            return generateChatResponse(messages, retryCount + 1);
        }

        console.error('Error generating chat response after retries:', error);
        throw error;
    }
} 