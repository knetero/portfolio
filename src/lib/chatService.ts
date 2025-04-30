import { OpenRouterMessage, OpenRouterRequestBody, OpenRouterResponse, Role } from '@/types/chat';
import { createPortfolioSystemPrompt, PORTFOLIO_OWNER } from './portfolioContext';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'deepseek/deepseek-r1:free';

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

// Check if the error is a rate limit error
function isRateLimitError(response: Response, errorData: any): boolean {
    // Check HTTP status code (429 is "Too Many Requests")
    if (response.status === 429) {
        return true;
    }

    // Check error message content
    const errorMessage = errorData?.error?.message || errorData?.message || '';
    return errorMessage.toLowerCase().includes('rate limit') ||
        errorMessage.toLowerCase().includes('too many requests') ||
        errorMessage.toLowerCase().includes('quota exceeded');
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

        const requestBody: OpenRouterRequestBody = {
            model: MODEL,
            messages: messagesWithContext,
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
                'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || window.location.origin,
                'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio Chatbot',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();

            // Check specifically for rate limit errors
            if (isRateLimitError(response, errorData)) {
                throw new Error('RATE_LIMIT_EXCEEDED: API request limit reached. Please try again later.');
            }

            throw new Error(errorData.error?.message || 'Failed to generate response');
        }

        const data: OpenRouterResponse = await response.json();
        const content = data.choices[0].message.content;

        // Check for empty response and retry if needed
        if (!content || content.trim() === '') {
            if (retryCount < 2) { // Allow up to 2 retries (3 total attempts)
                console.warn(`Received empty response from API (attempt ${retryCount + 1}), retrying...`);
                return generateChatResponse(messages, retryCount + 1);
            } else {
                throw new Error('Received empty response after multiple attempts');
            }
        }

        return content;
    } catch (error) {
        // Check if this is a rate limit error
        if (error instanceof Error && error.message.startsWith('RATE_LIMIT_EXCEEDED:')) {
            console.error('Rate limit exceeded:', error);
            throw error; // Don't retry rate limit errors
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