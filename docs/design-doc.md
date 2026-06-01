# LifeHQ Design Doc

## System Architecture

```
┌─────────────────────────────────────────────┐
│              Telegram Group                  │
│  (user sends @health, @money, etc.)          │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│           OpenClaw Gateway                   │
│  ┌─────────────────────────────────────┐     │
│  │        CEO Agent (main)             │     │
│  │  - Receives all group messages      │     │
│  │  - Parses @mention → agent name     │     │
│  │  - Spawns specialist sub-agent      │     │
│  │  - Returns response to group        │     │
│  └──────────┬──────────────────────────┘     │
│             │ sessions_spawn                  │
│     ┌───────┴───────┐                         │
│     ▼               ▼                         │
│  ┌──────┐    ┌──────┐  ...                    │
│  │Health│    │Money │                         │
│  │Agent │    │Agent │                         │
│  └──┬───┘    └──┬───┘                         │
│     │           │                              │
│     ▼           ▼                              │
│  ┌──────────────────────┐                      │
│  │   Shared Memory      │                      │
│  │   (shared/memory/)   │                      │
│  └──────────────────────┘                      │
└─────────────────────────────────────────────┘
```

## Core Components

### 1. Agent Registry (`agents.yaml`)

Defines all specialist agents:

```yaml
agents:
  health:
    emoji: 🏥
    model: ollama/glm-5.1:cloud
    soul: agents/health/SOUL.md
    description: Health, fitness, diet, medical reminders
  
  money:
    emoji: 💰
    model: ollama/glm-5.1:cloud
    soul: agents/money/SOUL.md
    description: Budget, Splitwise, investments
    skills:
      - auto-settle
```

### 2. CEO Router (`src/router.ts`)

Parses incoming messages:
- Detect `@agentname` mentions
- Look up agent in registry
- Spawn sub-agent with `sessions_spawn`
- Return response to group chat
- If no @mention, CEO handles or asks for clarification

### 3. Sub-Agent Spawner (`src/spawn.ts`)

Uses OpenClaw's `sessions_spawn` API:
```typescript
sessions_spawn({
  runtime: "subagent",
  task: userMessage,
  model: agentConfig.model,
  // Agent reads its SOUL.md + shared memory
})
```

Each sub-agent:
- Reads its own `SOUL.md` for personality
- Reads `shared/memory/` for cross-domain context
- Has access to relevant skills (e.g. auto-settle for @money)

### 4. Shared Memory

```
shared/memory/
├── daily/           # Daily logs (YYYY-MM-DD.md)
├── health/          # Health-specific data
├── financial/       # Money/budget data
├── mood/            # Mood journal entries
└── family/          # Parenting/marriage notes
```

All agents can read from shared memory. Only their own domain agent writes to their domain folder.

### 5. Multi-Agent Discussion

When topics span domains, CEO can spawn multiple agents:

```
User: "I'm stressed about money and it's affecting my sleep"

CEO spawns:
  @money → financial analysis
  @mood → stress assessment
  @health → sleep recommendations

CEO synthesizes responses into one coherent reply.
```

## Data Flow

```
1. User sends "@money check splitwise" in Telegram group
2. Gateway receives message → routes to CEO agent
3. CEO parses @money → looks up money agent in registry
4. CEO spawns money sub-agent with task + shared memory context
5. Money agent reads SOUL.md, shared memory, runs auto-settle
6. Money agent returns balance info
7. CEO formats and sends response to Telegram group
```

## Technology Choices

| Component | Choice | Why |
|-----------|--------|-----|
| Runtime | OpenClaw | Agent lifecycle, sessions, tool access |
| Chat | Telegram Bot API | Group support, @mentions, mobile-first |
| Language | TypeScript | OpenClaw ecosystem, type safety |
| Config | YAML | Human-readable agent definitions |
| Memory | Markdown files | Git-friendly, human-readable, easy sharing |

## Security Considerations

- Agents only write to their own domain memory
- Personal data stays local (on your machine)
- No external API calls without explicit skill configuration
- Telegram bot token stored securely in OpenClaw config
- Shared memory is read-only for non-domain agents

## Milestones

### v0.1 — Foundation
- [ ] CEO agent on Telegram group
- [ ] @mention routing
- [ ] 9 agent SOUL.md files
- [ ] agents.yaml registry
- [ ] Shared memory structure
- [ ] @money + auto-settle integration

### v0.2 — Intelligence
- [ ] Cross-domain context (CEO passes relevant shared memory)
- [ ] Multi-agent discussions
- [ ] Proactive daily check-ins
- [ ] Per-agent model configuration

### v0.3 — Polish
- [ ] Web dashboard
- [ ] Agent customization UI
- [ ] Plugin system
- [ ] Voice message support