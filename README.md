# CleanFlux-AI JavaScript SDK

Official JavaScript SDK for the [CleanFlux-AI](https://cleanflux.ai) text cleaning and content moderation API.

[![npm version](https://badge.fury.io/js/cleanflux-ai.svg)](https://www.npmjs.com/package/cleanflux-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🧹 **Text Cleaning** - Remove unwanted content, normalize formatting
- 🔗 **URL Extraction** - Extract and validate URLs from text
- 🤬 **Profanity Filter** - Remove or mask inappropriate language
- 📊 **Text Metadata** - Word count, reading time, and more
- 📝 **Normalization** - Whitespace, unicode, and case normalization

## Installation

```bash
npm install cleanflux-ai
```

## Requirements

- Node.js 18 or higher (uses native fetch)

## Quick Start

```javascript
import CleanFlux from 'cleanflux-ai';

// Initialize with your API key
const client = new CleanFlux('sk_live_your_api_key');

// Clean some text
const result = await client.clean({
  text: 'Check out   http://spam.com  for FREE stuff!!!',
  options: {
    removeUrls: true,
    normalizeWhitespace: true
  }
});

console.log(result.cleaned);
// Output: 'Check out for FREE stuff!'
```

## API Reference

### Constructor

```javascript
const client = new CleanFlux(apiKey, options);
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiKey` | string | Yes | Your CleanFlux API key |
| `options.baseUrl` | string | No | Custom API base URL (default: `https://api.cleanflux.ai`) |

### Methods

#### `clean(payload)`

Clean text by removing unwanted content and normalizing formatting.

```javascript
const result = await client.clean({
  text: 'Your text here',
  options: {
    removeUrls: true,
    normalizeWhitespace: true,
    // ... more options
  }
});
```

#### `normalize(payload)`

Normalize text formatting (whitespace, unicode, case, etc.).

```javascript
const result = await client.normalize({
  text: '  Hello   World  ',
  options: {
    trim: true,
    collapseWhitespace: true
  }
});
// result.normalized = 'Hello World'
```

#### `extractUrls(payload)`

Extract URLs from text.

```javascript
const result = await client.extractUrls({
  text: 'Visit https://cleanflux.ai and https://github.com'
});
// result.urls = ['https://cleanflux.ai', 'https://github.com']
```

#### `removeProfanity(payload)`

Remove or mask profanity from text.

```javascript
const result = await client.removeProfanity({
  text: 'Some text with bad words',
  options: {
    replacement: '***'
  }
});
```

#### `metadata(payload)`

Extract metadata from text.

```javascript
const result = await client.metadata({
  text: 'This is a sample paragraph with several words.'
});
// result.wordCount = 8
// result.readingTime = '1 min'
```

#### `ping()`

Check API connectivity.

```javascript
const result = await client.ping();
// result.status = 'ok'
```

## Error Handling

The SDK throws descriptive errors for failed requests:

```javascript
try {
  const result = await client.clean({ text: 'Hello' });
} catch (error) {
  console.error(error.message);   // Human-readable error message
  console.error(error.status);    // HTTP status code
  console.error(error.response);  // Full API response
}
```

## Authentication

Get your API key from the [CleanFlux Dashboard](https://cleanflux.ai/dashboard).

API keys start with `sk_live_` for production use.

## Documentation

Full API documentation is available at [https://cleanflux.ai/docs](https://cleanflux.ai/docs).

## Support

- 📧 Email: support@cleanflux.ai
- 🐛 Issues: [GitHub Issues](https://github.com/Kyros-Groupe-Ltd/cleanflux-js/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with ❤️ by [Kyros Groupe Ltd](https://kyrosgroupe.com)

