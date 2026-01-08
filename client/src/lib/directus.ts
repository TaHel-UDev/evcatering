import { createDirectus, rest, RestClient, DirectusClient } from "@directus/sdk";

export const getDirectusClient = () => {
    const isServer = typeof window === 'undefined';
    const url = (isServer && process.env.DIRECTUS_INTERNAL_URL)
        ? process.env.DIRECTUS_INTERNAL_URL
        : (process.env.NEXT_PUBLIC_DIRECTUS || '');

    // Log active URL on server side to debug connectivity issues
    if (isServer) {
        // console.log(`🔌 Directus Client initialized with URL: ${url}`);
    }

    return createDirectus<any>(url).with(rest({
        onRequest: (options) => {
            return { ...options, cache: 'no-store' };
        }
    }));
};

export async function requestWithRetry<T>(
    client: any,
    request: any,
    retries = 3,
    delay = 500
): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await client.request(request);
        } catch (error: any) {
            const isConnectionError = error?.cause?.code === 'UND_ERR_CONNECT_TIMEOUT' ||
                error?.cause?.code === 'ECONNREFUSED' ||
                error?.message?.includes('fetch failed') ||
                error?.code === 'UND_ERR_CONNECT_TIMEOUT';

            // Always retry 500 errors as well
            const isServerError = error?.response?.status >= 500;

            if (i === retries - 1 || (!isConnectionError && !isServerError)) {
                if (i === retries - 1) throw error;
            }

            const jitter = Math.random() * 200; // Add jitter to prevent thundering herd
            const waitTime = delay + (i * 500) + jitter; // Exponential backoff

            console.warn(`⚠️ Request failed (attempt ${i + 1}/${retries}). Retrying in ${Math.round(waitTime)}ms... Error: ${error.message} [${error?.cause?.code || 'NO_CODE'}]`);
            await new Promise((res) => setTimeout(res, waitTime));
        }
    }
    throw new Error('Request failed after retries');
}

/**
 * Runs an array of promise-returning functions in batches to limit concurrency.
 * @param items Array of items to process
 * @param fn Function that returns a promise for each item
 * @param batchSize Number of concurrent requests
 */
export async function runInBatches<T, R>(
    items: T[],
    fn: (item: T) => Promise<R>,
    batchSize = 5
): Promise<R[]> {
    const results: R[] = [];
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(
            batch.map(item => fn(item))
        );
        results.push(...batchResults);
    }
    return results;
}
