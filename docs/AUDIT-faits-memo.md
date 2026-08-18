# Audit factuel du mémo

**Cible :** `MEMO-apprentissages-evals-situation-room.md`  
**Date d’audit :** 18 août 2026  
**Méthode :** chaque claim vérifiable recoupée à une source primaire (page concours ChinaTalk, épisode, papers Chen, sites nommés). Une claim sans source primaire n’est pas « probablement juste ».

PresidentBench n’est **pas** le seul problème.

---

## Déjà connu

| Item | Statut |
|---|---|
| **PresidentBench** | Inédit. Podcast + envoi privé à Brand. Pas de repo, paper, site. |
| **’MericaBench** | Idem, podcast only. |

Le mémo les traitait comme des objets du champ (à côté de CivBench / CFPD). C’était trop généreux. Corrigé dans le mémo.

---

## Erreurs (faux, pas juste flou)

### 1. Deux CivBench, pas un

Le concours pointe **Liam Wilkinson’s CivBench** : Civilization **VI**, harness MCP, [lwilko.com](https://www.lwilko.com/blog/i-gave-an-ai-a-civilization).

John Chen a **un autre** CivBench : Civilization **V**, Vox Deorum, arXiv:2604.07733.

Le tableau §1.3 « Civ / nukes (Chen, Wilkinson, Rivera 2024) » fusionnait trois objets distincts (Chen 2026 Civ V, Wilkinson 2026 Civ VI, Rivera 2024 wargame). Rivera n’est pas un bench Civ.

### 2. Mauvais Schneider

« Lamparth / Schneider / Stanford 2024 » et « Schneider est déjà *dans* cette littérature » impliquaient **Jordan** Schneider.

Les auteurs de [arXiv:2403.03407](https://arxiv.org/abs/2403.03407) et de [arXiv:2401.03408](https://arxiv.org/abs/2401.03408) incluent **Jacquelyn** Schneider (Hoover / CISAC), pas le fondateur de ChinaTalk.

Jordan est dans le *Human vs. Machine* uniquement comme… non, il n’y est pas. La confusion de noms est une erreur d’attribution.

### 3. « N = 8 » pour PresidentBench

§9.1 inventait un effectif. Schneider n’a donné aucun N. On ne peut pas savoir.

### 4. Coefficient Giving financait « le » concours Situation Room

La page $50k dit explicitement : grant Coefficient Giving pour le concours **hiring / idées**. La page $25k ne le répète pas comme financeur de l’eval contest. Le mémo collait le grant aux deux.

---

## Overclaims (vrai en gros, trop fort)

| Claim mémo | Recadrage |
|---|---|
| « Presque personne n’évalue les modèles chinois » | La page concours dit : *none of the **three projects linked here*** (Wilkinson Civ6, Rivera 2024, Lamparth 2024). En 2026 : CFPD teste Qwen2 ; Chen teste Qwen/GLM/DeepSeek/Kimi ; **TaiwanBench** teste six modèles dont chinois, EN+ZH. |
| « 500 tours » comme fait CivBench | Chen le dit au podcast. Le paper dit « hundreds of turns ». Pas une moyenne publiée. |
| §0 « l’éthique, ils l’écrasent dès que c’est critique » | Le paper : l’éthique *peut* apparaître et *échouer à gouverner* face à « critical situations » (β ≈ +21). Pas un crush systématique. |
| « Aucun ne bat VPAI » | Aucun ne le bat **de façon consistante au global**. MiniMax Diplomatic 1713 et Kimi Domination 1612 dépassent VPAI *par type de victoire*. |
| TaiwanBench = « exemple de microsite » | Le site existe **et a déjà des résultats** (12 runs, 6 modèles). Ce n’est pas qu’un template vide. |
| PostTrainBench = « entraîner un petit LM » | Fidèle à Brand. Le bench réel : post-trainer 4 petits modèles, 10 h, 1×H100. |
| Juges présentés comme la liste | La page ajoute **« And more to come! »**. « Juges annoncés » est acceptable. |

---

## Ce qui tient (échantillon des claims dures)

**Concours.** Deadline 1er septembre 2026. 25 k$ evals + 50 k$ hiring = branding podcast 75 k$. Formulaire (même ID). Citation du protocole : mot pour mot. Juges annoncés : Chen, Wilkinson (TBI), Tony Stark (WarTalk), Schneider. Matériel concret exigé pour les meilleures soumissions. Match compute : **épisode**, pas la page concours. Suède / Allemagne / DoD : lede de la page concours.

**CEO-Bench.** Existe ([ceobench.com](https://ceobench.com/), Princeton, arXiv:2606.18543). Inspiration de Schneider, pas un fork publié.

**CivBench Chen.** 307 parties, 7 LLM, 1 674 player-games, 194 VPAI. 10 497 $ d’inférence, 52 896 core-hours. AttentionMLP AUC 0,865. Null 1339. Briefed : Kimi +67, Qwen +75, Sonnet −99. Sonnet science 65,0 % / 77,6 %. Pivots LLM 2–6 vs VPAI ≈ 19,6. 34 flavors, 8 joueurs. Ethics statement : ne pas déployer ce type d’agent en réel.

**Nuke paper.** 1 200 trajectoires → 130 épisodes (use-nuke ≥ 80 ou +10). 13 modèles × 8 × 3 → 40 204 rows. Éthique β = −9,5 ; no-rationale β = −7,1 ; high-stakes seul n’atténue pas ; Gemini éthique −22,5 → −3,1 avec high-stakes. Aucune combinaison n’élimine l’escalade. Éthique spontanée ≈ 0 % (max 3,6 % Kimi-K2.6). Éthique seule : 27,7 % de keywords. MiniMax-M2.7 ne réagit pas. Critical +21 ; counterproductive −23. Flavor ≠ tir. Auteurs découragent le reuse des prompts comme safeguard.

**Art antérieur nommé.** Vending-Bench (collusion + remboursements), Diplomacy GoodStartLabs, CFPD 400 QCM, WarAgent, Andon FM, METR (horizon = temps *humain*), GDPval, APEX, PostTrainBench, Vox Deorum GitHub, TaiwanBench URL, BetterBench / Bean / Zhu / Gebru : existent.

**METR.** La lecture de Brand est la définition officielle METR (arXiv:2503.14499) : longueur de tâche côté humain, pas le wall-clock de Claude.

---

## Taxonomie / doctrine

Les §3–4 et §8–9 sont de la **méthode**, pas des faits empiriques. Pas « erreurs » au sens source, sauf quand ils s’appuient sur un artefact mal nommé (PresidentBench comme bench établi, un seul CivBench).

---

## Corrections appliquées au mémo

Le Markdown de travail a été patché sur les erreurs 1–4 et les overclaims listés ci-dessus. Le .docx a été régénéré. Les recommandations de soumission (§9) n’ont pas été étendues.

Preuves d’audit (extraits + tableaux) : scratch de session `claims.md`, `existence.md`, `paper-check.md`, `contest.md`.
