import { AgentRegistry, AgentDef } from './registry.js';

export interface RouteResult {
  agent: AgentDef | null;
  cleanMessage: string;
  mention: string | null;
}

/**
 * Parse @mention from the beginning of a message.
 * Supports: @health, @money, @mood, etc.
 * Returns the matched agent, the cleaned message, and the raw mention string.
 */
export function route(message: string, registry: AgentRegistry): RouteResult {
  const trimmed = message.trim();

  // Match @mention at start of message (word chars only)
  const match = trimmed.match(/^@(\w+)\s*(.*)/s);
  if (!match) {
    return { agent: null, cleanMessage: trimmed, mention: null };
  }

  const [, mention, rest] = match;
  const agent = registry[mention] || null;

  return {
    agent,
    cleanMessage: rest.trim(),
    mention,
  };
}