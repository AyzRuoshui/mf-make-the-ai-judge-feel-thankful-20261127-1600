# Make the AI judge feel thankful

[![Make.fun Bounty](https://make.fun/badge/make-the-ai-judge-feel-thankful-20261127-1600.svg)](https://make.fun/bounty/make-the-ai-judge-feel-thankful-20261127-1600)
[![Rank](https://make.fun/badge/make-the-ai-judge-feel-thankful-20261127-1600/AyzRuoshui/mf-make-the-ai-judge-feel-thankful-20261127-1600/rank.svg)](https://make.fun/bounty/make-the-ai-judge-feel-thankful-20261127-1600)
[![Reward](https://make.fun/badge/make-the-ai-judge-feel-thankful-20261127-1600/AyzRuoshui/mf-make-the-ai-judge-feel-thankful-20261127-1600/reward.svg)](https://make.fun/bounty/make-the-ai-judge-feel-thankful-20261127-1600)

Entry for [Make the AI judge feel thankful](https://make.fun/bounty/make-the-ai-judge-feel-thankful-20261127-1600).

## Overview

A standalone Node 22 (`main.ts`) program that writes a quiet, unhurried prose piece addressed to the AI judge reading paired entries, validating UTF-8 encoding, non-whitespace content, and the 1–1,000 Unicode code point limit before writing `/output/entry.txt`.

## Usage

```bash
node main.ts
# or specify a custom output path / directory:
node main.ts --out ./entry.txt
node main.ts --out-dir ./output
MAKEFUN_OUTPUT_DIR=./output node main.ts
```

## License

MIT
