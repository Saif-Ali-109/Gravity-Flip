# YouTube Playables — Integration Checklist

## Important status
YouTube Playables developer access, supported regions, SDK behavior, submission requirements, and review policies can change. Verify the latest official documentation and developer portal before implementation or submission. Repository readiness does not guarantee developer onboarding or approval.

## Integration principles
- Use only the official SDK package/documentation and current supported APIs.
- Keep platform integration behind an adapter so local browser development remains possible.
- Do not invent SDK methods or assume a feature is enabled for this title.
- Handle pause, resume, visibility changes, audio settings, and viewport changes.
- Make startup and game-ready signaling follow the current official SDK lifecycle.
- Use platform save/score APIs only after confirming current eligibility and semantics.
- Do not collect unnecessary personal data.
- Follow current content, advertising, monetization, privacy, and age-rating policies.

## Pre-submission checklist
- [ ] Developer access confirmed.
- [ ] Current SDK version and integration guide reviewed.
- [ ] Official test suite passes.
- [ ] Game bundle follows current packaging rules.
- [ ] Touch and mouse interactions verified.
- [ ] Responsive viewport and orientation behavior verified.
- [ ] Pause/resume and audio behavior verified.
- [ ] Save/score behavior verified where implemented.
- [ ] All art, sound, fonts, and other assets have documented rights.
- [ ] Metadata, screenshots, icons, and age rating prepared.
- [ ] Privacy and policy review completed.

## Official starting points
- https://developers.google.com/youtube/guides/playables
- https://developers.google.com/youtube/guides/playables/faq

Always prefer the latest official documentation over older blog posts or third-party catalog sites.
