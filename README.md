# LifeHQ 🏠

**Your life, orchestrated by AI agents in one chat.**

LifeHQ is an open-source multi-agent system that runs on [OpenClaw](https://github.com/openclaw/openclaw). It turns a single Telegram group into your personal life command center — one place to manage health, work, money, mood, parenting, marriage, reading, and everything else.

## How It Works

```
Telegram Group (your life command center)
  └─ CEO Agent (receives all messages, routes by @mention)
       ├─ @health    → Health agent (fitness, diet, medical reminders)
       ├─ @work      → Work agent (tasks, meetings, career moves)
       ├─ @money     → Money agent (budget, Splitwise, investments)
       ├─ @mood      → Mood agent (journaling, stress, emotional check-ins)
       ├─ @parenting → Parenting agent (baby care, schedules, milestones)
       ├─ @marriage  → Marriage agent (relationship, communication, date nights)
       ├─ @books     → Books agent (reading list, notes, recommendations)
       ├─ @fun       → Fun agent (entertainment, hobbies, travel)
       └─ @other     → Catch-all agent
```

- **@mention** any agent and it responds in the group
- Agents share a **common memory** so @money knows about your stress from @mood
- Each agent can use a **different LLM model** (e.g. health → conservative model, fun → creative model)
- CEO agent can **pull multiple agents** into a discussion when topics overlap

## Why LifeHQ?

- **One chat, not ten.** Stop switching between apps and DMs.
- **Agents that know your life.** Shared context means better advice.
- **Open source.** Your data stays on your machine.
- **Extensible.** Add new agents by writing a SOUL.md.

## Architecture

LifeHQ is a thin orchestration layer on top of OpenClaw:

- **CEO Agent** — the main OpenClaw agent bound to your Telegram group
- **Specialist Agents** — spawned as sub-agents via `sessions_spawn`, each with their own workspace, SOUL.md, and model
- **Shared Memory** — a common `memory/` directory readable by all agents
- **Agent Registry** — `agents.yaml` defines each specialist's name, model, emoji, and personality

```
life-hq/
├── README.md
├── docs/
│   ├── product-spec.md
│   └── design-doc.md
├── agents/
│   ├── health/
│   │   └── SOUL.md
│   ├── work/
│   │   └── SOUL.md
│   ├── money/
│   │   └── SOUL.md
│   ├── mood/
│   │   └── SOUL.md
│   ├── parenting/
│   │   └── SOUL.md
│   ├── marriage/
│   │   └── SOUL.md
│   ├── books/
│   │   └── SOUL.md
│   ├── fun/
│   │   └── SOUL.md
│   └── other/
│       └── SOUL.md
├── shared/
│   └── memory/           # shared context between agents
├── src/
│   ├── router.ts         # CEO agent routing logic
│   ├── registry.ts       # agent registry loader
│   └── spawn.ts          # sub-agent spawner
├── agents.yaml           # agent definitions (name, model, emoji, prompt)
└── package.json
```

## Quick Start

> ⚠️ LifeHQ is in early development. Below is the target experience.

```bash
# Install
npm install -g life-hq

# Configure
life-hq init

# Connect to Telegram
life-hq connect --telegram

# Start
life-hq start
```

Then in your Telegram group:
```
@money check my splitwise balance
@health what should I eat for lunch?
@mood I'm feeling overwhelmed today
```

## Agent Personalities

Each agent has a distinct personality defined in their `SOUL.md`:

| Agent | Emoji | Model | Vibe |
|-------|-------|-------|------|
| Health | 🏥 | glm-5 | Evidence-based, gentle nudges |
| Work | 💼 | glm-5 | Direct, actionable, prioritized |
| Money | 💰 | glm-5 | Practical, numbers-driven, integrates auto-settle |
| Mood | 🧘 | glm-5 | Empathetic, reflective, journaling-focused |
| Parenting | 👶 | glm-5 | Patient, practical, milestone-aware |
| Marriage | ❤️ | glm-5 | Thoughtful, communication-focused |
| Books | 📚 | glm-5 | Curious, insightful, note-preserving |
| Fun | 🎮 | glm-5 | Playful, creative, spontaneous |
| Other | 🤷 | glm-5 | Flexible catch-all |

## Contributing

PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT

## Built With

- [OpenClaw](https://github.com/openclaw/openclaw) — AI agent runtime
- [Telegram Bot API](https://core.telegram.org/bots/api) — chat interface