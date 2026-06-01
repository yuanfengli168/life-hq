# CONTRIBUTING

We love contributions! 🎉

## Ways to Contribute

- **New agents** — Write a SOUL.md and add it to agents.yaml
- **Agent improvements** — Better personalities, more domain knowledge
- **Bug fixes** — Found an issue? Open an issue or PR
- **Documentation** — Docs always need love
- **Integrations** — Connect agents to external tools

## Adding a New Agent

1. Create `agents/<name>/SOUL.md` with personality and domain
2. Add entry to `agents.yaml`
3. Create a shared memory folder if needed
4. Submit a PR

## Development

```bash
npm install
npm run build
npm run dev
```

## Code Style

- TypeScript strict mode
- Keep agents stateless — state lives in shared memory files
- SOUL.md files are the primary agent configuration

## License

By contributing, you agree that your contributions will be licensed under the MIT License.