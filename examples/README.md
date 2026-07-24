# Examples Placeholder Guide

The JSON files in this folder use placeholder tokens instead of real user data.

## Common Tokens

- `SAMPLE_API_KEY`: API key value
- `SAMPLE_USER_NAME`: Profile display name
- `SAMPLE_MEDIA_ID`: Media identifier

Numeric API identifiers use non-production example integers so their JSON types
match the OpenAPI contract. The uploaded-media identifier remains a string
because that is the value accepted by post creation.

## Usage

- Replace tokens before running API calls in your environment.
- Keep the response structure accurate and only swap placeholder values.
