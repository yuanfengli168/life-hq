import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { parse as parseYaml } from 'yaml';

export interface AgentDef {
  name: string;
  emoji: string;
  model: string;
  soul: string;
  description: string;
  memory: string;
  skills?: string[];
}

export interface AgentRegistry {
  [name: string]: AgentDef;
}

const REGISTRY_PATH = resolve(dirname(process.argv[1] || __dirname), '..', 'agents.yaml');

export function loadRegistry(path?: string): AgentRegistry {
  const filePath = path || REGISTRY_PATH;
  const raw = readFileSync(filePath, 'utf-8');
  const parsed = parseYaml(raw) as { agents: Record<string, Omit<AgentDef, 'name'>> };
  const registry: AgentRegistry = {};
  for (const [name, def] of Object.entries(parsed.agents)) {
    registry[name] = { name, ...def };
  }
  return registry;
}

export function loadSoul(agent: AgentDef): string {
  const soulPath = resolve(dirname(process.argv[1] || __dirname), '..', agent.soul);
  return readFileSync(soulPath, 'utf-8');
}