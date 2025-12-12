/**
 * CleanFlux-AI JavaScript SDK
 * Official SDK for the CleanFlux-AI text cleaning API
 * 
 * @module cleanflux-ai
 * @author Kyros Groupe Ltd
 * @license MIT
 */

/**
 * CleanFlux API client for text cleaning and content moderation
 */
class CleanFlux {
  /**
   * Create a new CleanFlux client
   * 
   * @param {string} apiKey - Your CleanFlux API key (starts with sk_live_)
   * @param {Object} [options={}] - Configuration options
   * @param {string} [options.baseUrl='https://api.cleanflux.ai'] - API base URL
   * @throws {Error} If apiKey is not provided
   * 
   * @example
   * const client = new CleanFlux('sk_live_your_api_key');
   * 
   * @example
   * // With custom base URL
   * const client = new CleanFlux('sk_live_your_api_key', {
   *   baseUrl: 'https://custom-api.example.com'
   * });
   */
  constructor(apiKey, options = {}) {
    if (!apiKey) {
      throw new Error('CleanFlux: API key is required. Get yours at https://cleanflux.ai/dashboard');
    }

    if (typeof apiKey !== 'string') {
      throw new Error('CleanFlux: API key must be a string');
    }

    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl || 'https://api.cleanflux.ai';
    
    // Remove trailing slash if present
    this.baseUrl = this.baseUrl.replace(/\/$/, '');
  }

  /**
   * Make an authenticated request to the CleanFlux API
   * 
   * @private
   * @param {string} endpoint - API endpoint path
   * @param {Object} payload - Request body
   * @returns {Promise<Object>} Parsed JSON response
   * @throws {Error} On non-2xx responses
   */
  async _request(endpoint, payload) {
    const url = `${this.baseUrl}/api/${endpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
        'User-Agent': 'cleanflux-js/1.0.0'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = data?.error || data?.message || `Request failed with status ${response.status}`;
      const error = new Error(`CleanFlux API Error: ${message}`);
      error.status = response.status;
      error.response = data;
      throw error;
    }

    return data;
  }

  /**
   * Clean text by removing unwanted content, normalizing formatting, and more
   * 
   * @param {Object} payload - Request payload
   * @param {string} payload.text - The text to clean
   * @param {Object} [payload.options] - Cleaning options
   * @returns {Promise<Object>} Cleaned text result
   * 
   * @example
   * const result = await client.clean({
   *   text: 'Check out http://example.com for more info!!!',
   *   options: { removeUrls: true, normalizeWhitespace: true }
   * });
   * console.log(result.cleaned); // 'Check out for more info!'
   */
  async clean(payload) {
    return this._request('clean', payload);
  }

  /**
   * Normalize text formatting (whitespace, unicode, case, etc.)
   * 
   * @param {Object} payload - Request payload
   * @param {string} payload.text - The text to normalize
   * @param {Object} [payload.options] - Normalization options
   * @returns {Promise<Object>} Normalized text result
   * 
   * @example
   * const result = await client.normalize({
   *   text: '  Hello   World  ',
   *   options: { trim: true, collapseWhitespace: true }
   * });
   * console.log(result.normalized); // 'Hello World'
   */
  async normalize(payload) {
    return this._request('normalize', payload);
  }

  /**
   * Extract URLs from text
   * 
   * @param {Object} payload - Request payload
   * @param {string} payload.text - The text to extract URLs from
   * @param {Object} [payload.options] - Extraction options
   * @returns {Promise<Object>} Extracted URLs and metadata
   * 
   * @example
   * const result = await client.extractUrls({
   *   text: 'Visit https://cleanflux.ai and https://github.com'
   * });
   * console.log(result.urls); // ['https://cleanflux.ai', 'https://github.com']
   */
  async extractUrls(payload) {
    return this._request('extract-urls', payload);
  }

  /**
   * Remove or mask profanity from text
   * 
   * @param {Object} payload - Request payload
   * @param {string} payload.text - The text to filter
   * @param {Object} [payload.options] - Profanity filter options
   * @returns {Promise<Object>} Filtered text result
   * 
   * @example
   * const result = await client.removeProfanity({
   *   text: 'Some text with bad words',
   *   options: { replacement: '***' }
   * });
   * console.log(result.filtered);
   */
  async removeProfanity(payload) {
    return this._request('remove-profanity', payload);
  }

  /**
   * Extract metadata from text (word count, reading time, etc.)
   * 
   * @param {Object} payload - Request payload
   * @param {string} payload.text - The text to analyze
   * @param {Object} [payload.options] - Metadata options
   * @returns {Promise<Object>} Text metadata
   * 
   * @example
   * const result = await client.metadata({
   *   text: 'This is a sample paragraph with several words.'
   * });
   * console.log(result.wordCount); // 8
   * console.log(result.readingTime); // '1 min'
   */
  async metadata(payload) {
    return this._request('metadata', payload);
  }

  /**
   * Check API connectivity
   * 
   * @returns {Promise<Object>} Ping response
   * 
   * @example
   * const result = await client.ping();
   * console.log(result.status); // 'ok'
   */
  async ping() {
    const url = `${this.baseUrl}/api/ping`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'cleanflux-js/1.0.0'
      }
    });

    return response.json();
  }
}

export default CleanFlux;
export { CleanFlux };

