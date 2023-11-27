# fytr - YouTube Recommendations Filter

> [!Note]
> Currently WIP

## Overview

**fytr** is a browser extension designed to filter YouTube recommendations (currently) based on video duration. It allows users to customize their preferences and hide videos that fall outside the specified time range.


## Getting Started

To use **fytr**, follow these steps:

1. **Install the Extension:**
   - Clone repo, follow [guide](guide).

2. **Filter Preferences:**
   - Access the extension settings to choose your preferred time filter (short, medium, long).

3. **Enjoy Filtered Recommendations:**
   - Browse YouTube as usual, and fytr will automatically hide videos that don't match your selected time filter.

## Technical Details

The core functionality of fytr is implemented in `content.js`, which is injected into the YouTube page to interact with the DOM and apply the filtering logic.

### Time Filter Choices

The extension categorizes videos into three time filter choices:

- Short: 0 to 5 minutes
- Medium: 5 to 20 minutes
- Long: 20 minutes or longer

## License

This project is licensed under the [MIT License](LICENSE).
