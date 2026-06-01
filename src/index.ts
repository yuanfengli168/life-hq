import { loadRegistry } from './registry.js';
import { route } from './router.js';
import { prepareSpawn, formatSpawnPrompt } from './spawn.js';

function main() {
  const command = process.argv[2];
  const args = process.argv.slice(3);

  if (!command) {
    console.log('Usage: life-hq <route|list|spawn> [args]');
    process.exit(1);
  }

  const registry = loadRegistry();

  switch (command) {
    case 'route': {
      const message = args.join(' ');
      if (!message) {
        console.error('Provide a message to route, e.g.: life-hq route "@money check balance"');
        process.exit(1);
      }
      const result = route(message, registry);
      if (result.agent) {
        console.log(`→ ${result.agent.emoji} ${result.agent.name}: "${result.cleanMessage}"`);
      } else if (result.mention) {
        console.log(`→ ❓ Unknown agent "@${result.mention}". Available: ${Object.keys(registry).join(', ')}`);
      } else {
        console.log(`→ 🤖 CEO (no @mention): "${result.cleanMessage}"`);
      }
      break;
    }

    case 'list': {
      const count = Object.keys(registry).length;
      console.log(`LifeHQ Agent Registry (${count} agents):`);
      for (const [name, def] of Object.entries(registry)) {
        console.log(`  ${def.emoji} ${name} - ${def.description}`);
      }
      break;
    }

    case 'spawn': {
      const agentName = args[0];
      const taskMessage = args.slice(1).join(' ');
      if (!agentName || !registry[agentName]) {
        console.error(`Unknown agent "${agentName}". Available: ${Object.keys(registry).join(', ')}`);
        process.exit(1);
      }
      const ctx = prepareSpawn(registry[agentName], taskMessage || 'No task specified');
      console.log(formatSpawnPrompt(ctx));
      break;
    }

    default:
      console.error(`Unknown command: ${command}. Use: route, list, spawn`);
      process.exit(1);
  }
}

main();