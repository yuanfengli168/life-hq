# LifeHQ Product Spec

## Vision

One Telegram group. Nine AI agents. Your entire life, managed.

LifeHQ turns a single Telegram group chat into a life command center where specialized AI agents handle different domains of your life. No more app-switching, no more forgetting follow-ups, no more siloed advice.

## Problem

Modern life is fragmented across:
- 10+ apps for different life domains
- No cross-domain intelligence (health affects mood, money affects marriage)
- Important life context lives in scattered chats and notes
- No single place to ask "how am I doing overall?"

## Solution

A Telegram group with AI agents, each specialized in one life domain, sharing a common memory:

1. **@mention routing** — Tag an agent, get a response in the group
2. **Cross-domain memory** — @mood knows you had a bad night because @health logged it
3. **Multi-agent discussions** — CEO can pull @money + @mood together when financial stress is discussed
4. **Proactive check-ins** — Agents can initiate reminders based on patterns
5. **Model flexibility** — Each agent can run on the best model for its domain

## User Stories

### Core
- As a user, I want to @health in a group chat and get health advice
- As a user, I want to @money to check my Splitwise balance and generate PayNow QR
- As a user, I want agents to remember context across conversations
- As a user, I want @mood to know about my bad sleep from @health

### Advanced
- As a user, I want the CEO agent to automatically involve relevant agents
- As a user, I want different models for different agents (cheaper for simple tasks)
- As a user, I want daily/weekly life summaries from all agents
- As a user, I want to add custom agents by writing a SOUL.md

## Agent Roster (v1)

| Agent | Trigger | Key Capabilities |
|-------|---------|-----------------|
| @health | Health, fitness, diet, medical | Meal suggestions, exercise reminders, medical follow-ups |
| @work | Tasks, meetings, career | Daily priorities, meeting prep, career advice |
| @money | Budget, debts, investments | Splitwise integration (auto-settle), budget tracking |
| @mood | Feelings, stress, journaling | Mood check-ins, journaling prompts, pattern detection |
| @parenting | Baby care, kids, schedules | Feeding logs, milestone tracking, caregiver coordination |
| @marriage | Relationship, spouse, dates | Communication tips, date ideas, conflict resolution |
| @books | Reading, notes, learning | Book recommendations, reading notes, highlights |
| @fun | Entertainment, hobbies, travel | Movie/show recs, hobby ideas, trip planning |
| @other | Everything else | Flexible catch-all |

## MVP Scope (v0.1)

- CEO agent on Telegram group
- @mention routing to 9 specialist sub-agents
- Shared memory directory
- Each agent with its own SOUL.md
- Money agent integrates with auto-settle CLI
- Agent registry (agents.yaml)

## Future (v0.2+)
- Proactive agent check-ins (cron-based)
- Multi-agent panel discussions
- Web dashboard for life overview
- Voice messages support
- Agent personality customization via UI
- Plugin system for third-party agent extensions