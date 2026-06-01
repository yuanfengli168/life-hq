import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { AgentDef, loadSoul } from './registry.js';

export interface SpawnContext {
  agent: AgentDef;
  soulContent: string;
  memoryContext: string;
  taskMessage: string;
}

/**
 * Prepare a spawn context for a sub-agent.
 * Loads the agent's SOUL.md and any existing shared memory.
 */
export function prepareSpawn(agent: AgentDef, taskMessage: string, baseDir?: string): SpawnContext {
  const base = baseDir || resolve(dirname(process.argv[1] || __dirname), '..');
  const soulContent = loadSoul(agent);

  // Load shared memory if it exists
  const memoryDir = resolve(base, agent.memory);
  let memoryContext = '';
  if (existsSync(memoryDir)) {
    try {
      const files = require('fs').readdirSync(memoryDir).filter((f: string) => f.endsWith('.md')).sort().reverse().slice(0, 3);
      memoryContext = files.map((f: string) => readFileSync(resolve(memoryDir, f), 'utf-8')).join('\n---\n');
    } catch {
      memoryContext = '';
    }
  }

  return {
    agent,
    soulContent,
    memoryContext,
    taskMessage,
  };
}

/**
 * Format a spawn context as a prompt for the CEO to dispatch to a sub-agent.
 */
export function formatSpawnPrompt(ctx: SpawnContext): string {
  let prompt = `[Agent: ${ctx.agent.name} ${ctx.agent.emoji}]\n`;
  prompt += `Description: ${ctx.agent.description}\n\n`;
  prompt += `## SOUL\n${ctx.soulContent}\n\n`;
  if (ctx.memoryContext) {
    prompt += `## Recent Memory\n${ctx.memoryContext}\n\n`;
  }
  if (ctx.agent.skills?.length) {
    prompt += `## Skills\n${ctx.agent.skills.map(s => `- ${s}`).join('\n')}\n\n`;
  }
  prompt += `## Task\n${ctx.taskMessage}`;
  return prompt;
}