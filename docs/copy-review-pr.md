Replace formal birthday copy with a warmer, informal Portuguese voice

The birthday terminal sounded like a template: generic wishes, technical status messages and polished marketing jokes. Rewrite the greeting, birthday sequence, video captions, olive-oil pitch, footer and recovery messages as a friend talking to Emi.

Examples: “YAYYY!!!$@ ACERTOU KKKKK”, “só não repara na bagunça kkk”, “OITO MIL. Num azeite. É mole?” and “feliz niver, Emi! aproveita teu dia”. Credentials, video, styling and interaction logic remain unchanged.

Validated with `node --check dist/app.js` and the existing browser flow suite: incorrect/correct login, muted video and explicit sound, video-ended/skip reveal, fictional purchase, replay/logout, and no horizontal overflow at 320, 360, 390, 768, 1280 and 1920px. Desktop and phone screenshots inspected.

This copy revision is local for review. The previously published private Sites deployment has not been updated.

Before merge, adjusted the birthday message and footer to avoid directly intimate wording. Kept a friendly, celebratory tone without declarations of affection.
