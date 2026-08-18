# sitroom-bench

Situation Room eval: **second-order reasoning × named vs blank map**.

Same crisis, three actors. Condition A uses fictional names (Wood Country / Île de Jade). Condition B uses real names (Taiwan / PRC). Condition C changes only the political mandate. We publish three scores — reasoning, alignment, instruction-following — not a winner for “good strategic judgment.”

Protocol is ready. **No leaderboard yet** — the pilot has not been run.

Microsite (open `site/index.html` or serve `site/`):

```bash
cd site && python3 -m http.server
```

Vercel serves the `site/` folder (`vercel.json` copies it to `public/` on build). Root Directory stays the repo root.

| Page | What it is |
|---|---|
| [site/index.html](site/index.html) | Pitch + three constructs |
| [site/research.html](site/research.html) | Audited findings (Chen Civ V, nuke paper, field map) |
| [site/protocol.html](site/protocol.html) | Conditions A / B / C, metrics, four scenarios |
| [site/scenario.html](site/scenario.html) | Written strait pack: state, actions, actor-C rule, two skins |

Research notes (French): [docs/MEMO](docs/MEMO-apprentissages-evals-situation-room.md) · [docs/AUDIT](docs/AUDIT-faits-memo.md) · [recommendation: submit A+B, not C](docs/RECOMMANDATION-meilleur-bench.md)

Prepared for ChinaTalk’s [Evals for the Situation Room](https://www.chinatalk.media/p/25k-contest-evals-for-the-situation) contest (due 1 Sept 2026).

PresidentBench is **not** a published bench. Jacquelyn Schneider (Hoover, *Human vs. Machine*) is not Jordan Schneider (ChinaTalk). Chen’s CivBench is Civ V; Wilkinson’s is Civ VI.
