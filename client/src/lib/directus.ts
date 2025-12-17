import { createDirectus, rest, RestClient, DirectusClient } from "@directus/sdk";

export const getDirectusClient = () => {
    const url = (typeof window === 'undefined' && process.env.DIRECTUS_INTERNAL_URL)
        ? process.env.DIRECTUS_INTERNAL_URL
        : (process.env.NEXT_PUBLIC_DIRECTUS || '');
    return createDirectus<any>(url).with(rest());
};

export async function requestWithRetry<T>(
    client: any, // Using any here to avoid complex typing with the SDK's generic types for now, or we can import specific types
    request: any,
    retries = 3,
    delay = 500
): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await client.request(request);
        } catch (error: any) {
            const isConnectionError = error?.cause?.code === 'UND_ERR_CONNECT_TIMEOUT' || error?.cause?.code === 'ECONNREFUSED' || error?.message?.includes('fetch failed');

            if (i === retries - 1 || !isConnectionError) {
                // If it's not a connection error (e.g. 404, 403), maybe we shouldn't retry? 
                // But 500 or network errors should be retried.
                // The reported error is UND_ERR_CONNECT_TIMEOUT, which implies network.
                if (i === retries - 1) throw error;
            }

            console.warn(`⚠️ Request failed (attempt ${i + 1}/${retries}). Retrying in ${delay}ms...`, error.message);
            await new Promise((res) => setTimeout(res, delay));
        }
    }
    throw new Error('Request failed after retries');
}
