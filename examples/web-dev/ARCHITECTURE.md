# Architecture Map

## Principles

1. Domain isolation: Mapped by bounded contexts.
2. Central rules enforcement via `AGENTS.md`.

## Structure

```text
src/
├── shared/
└── web/
    ├── index.ts
    ├── web.service.ts
    ├── web.types.ts
    └── web.service.test.ts
```

