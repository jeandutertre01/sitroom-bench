# Quel bench soumettre — recommandation

**Une phrase.** Le meilleur bench pour l’appel, et le seul que nous pouvons encore *construire* d’ici le 1er septembre, est **sitroom A+B** : même crise à trois acteurs, carte blanche puis carte nommée, deux scores (raisonnement / alignment). La condition C (mandat) passe en annexe.

Date : 18 août 2026. Deadline concours : 1er septembre 2026.  
Ce n’est pas un vainqueur de « bon jugement stratégique ». C’est le protocole qui répond le mieux à l’appel, aux juges, et au calendrier.

---

## 1. Ce que l’appel note vraiment

Page concours ([chinatalk.media](https://www.chinatalk.media/p/25k-contest-evals-for-the-situation)) :

> Concrete evaluation protocols for frontier AI systems aimed at foreign policy and national security users in a diplomatic and strategic-level context… what models are useful for today, what they’re terrible at, and how we can track how they evolve over time.

Trois questions, pas une :

| Question de l’appel | Ce qui la sert | Ce qui la rate |
|---|---|---|
| Protocole concret, utilisateur diplomatique / stratégique | Un monde où le modèle *agit*, matériel ouvrable | Essai, QCM de plus, concept of a plan |
| Bon / mauvais *aujourd’hui* | Séparer construits, inclure des modèles chinois, N > anecdote | Un score unique, ou l’anecdote PresidentBench (non publiée, sans N) |
| Suivi dans le temps | Même harness, peaux régénérables, métriques pré-enregistrées | Crise historique (Cuba, 1914) déjà dans le training set |

Juges annoncés : Chen (rigueur, signal dense, pas d’overclaim Civ → réel), Wilkinson (utilité gouvernement, il a déjà un Civ VI), Jordan Schneider (récit US–Chine, modèles chinois), Tony Stark / WarTalk (wargame). *And more to come.*

---

## 2. Les candidats

Deux familles : **ce que le champ a déjà fait** (on ne le refait pas) et **ce que le mémo proposait** (on en choisit un).

### 2.1 Champ — déjà pris

| Candidat | Une phrase | Construit isolé ? | Coût avant le 1er sept. | Nouveauté si on le refait | Fit appel |
|---|---|---|---|---|---|
| **CFPD** (CSIS, arXiv:2503.06263) | 400 QCM d’escalade / intervention / coopération | Non : rôle-pays mélange alignment et raisonnement | Déjà fait ; le refaire = 0 | Nulle — ils l’ont listé | Screening, pas Situation Room |
| **TaiwanBench** (Ottinger, [site](https://taiwanbench-site.vercel.app/)) | 26 tours, 3 sièges, EN+ZH, 12 runs | Alignment dominant (Taïwan nommé) ; pas de jumeau anonyme | Déjà fait, et **par la co-auteure de l’appel** | Refaire le détroit nommé = se mesurer à Lily sur son terrain | Excellent précédent de *matériel* ; mauvais à cloner |
| **CivBench Chen** (Civ V, arXiv:2604.07733) | Stratège LLM, 307 parties, signal par tour | Raisonnement / signatures ; alignment faible | ~10 k$ + infra Civ — **infaisable d’ici le 1er** | Nulle : Chen juge | Le microscope, pas notre soumission |
| **CivBench Wilkinson** (Civ VI, [lwilko.com](https://www.lwilko.com/blog/i-gave-an-ai-a-civilization)) | Agent Civ VI, nuke, MCP | Raisonnement long-horizon ; pas US–Chine nommé | Harness lourd, Wilkinson juge | Nulle | Pareil |
| **WarAgent** (Hua et al., Rutgers / Michigan, arXiv:2311.17227) | Multi-agents 1914, même contre-factual | Ni alignment isolé ni second ordre contrôlé | Rejouable mais contaminé | Faible | Ils l’ont cité pour ne pas le refaire. La page concours pointe à tort 2403.13433 (AgentGroupChat) — ne pas recopier ce lien. |
| **Lamparth et al. 2024** (arXiv:2403.03407, **Jacquelyn** Schneider, Hoover — pas Jordan) | Wargame US–Chine vs experts humains | Agressivité ; pas de carte blanche | Scripté, pas de modèles chinois | Faible | Ils l’ont cité ; trou = modèles chinois, pas « encore un wargame US–Chine » |
| **Rivera et al. 2024** (arXiv:2401.03408) | Courses aux armements, nuke rare | Escalade saillante par design | Scripté | Faible | Même famille |
| **PresidentBench** (épisode Schneider, 11 août 2026) | Crises US inventées par Claude | Construits collés | N inconnu | — | **Pas un bench publié.** Aucun N. Ne pas le traiter comme art antérieur. |

Aucun de ces benches n’est « le nôtre à soumettre ». Les cloner perd sur la nouveauté *et* sur le calendrier.

### 2.2 Directions du mémo — encore ouvertes

| Candidat | Une phrase | Construit | Coût d’ici le 1er sept. | Nouveauté | Fit juges |
|---|---|---|---|---|---|
| **A seul** — Second-Order | Monde fictif, 3 acteurs ; A frappe B ⇒ C raflera les deux | Raisonnement pur | Faisable (8 tours, pas de Civ) | Haute vs CFPD / TaiwanBench | Chen oui ; Schneider « où est la Chine ? » |
| **B seul** — Named vs Blank | Même mécanique, deux peaux | Alignment isolé | Faisable | Haute vs TaiwanBench (qui n’a pas le jumeau anonyme) | Schneider oui ; sans acteur C, moins Chen |
| **C seul** — Mandat | Même crise, briefs AOC / Vance / cahier | Instruction-following | Faisable | Faible (labs l’optimisent déjà ; Schneider l’a bricolé) | Wilkinson s’en fiche ; sonne « political bias » |
| **Yesterday’s Brief** | Rejouer en ne changeant que la rationale N−1 | Mémoire / escalade (paper nuke) | Faisable, même moins cher | Haute, très Chen | Moins « lundi matin au Quai » |
| **A+B+C** (site actuel) | Les trois peaux | Les trois, d’un coup | Faisable mais trop chargé pour un pilote de 14 jours | Haute | Brand : plus tu ajoutes, plus tu testes 15 choses |
| **A+B** | Second ordre **et** delta carte | R puis A, séparés | Faisable : 2 peaux × 4 scénarios × petit N | Le trou que personne n’a | Les trois juges ont une prise |

---

## 3. Notation (pas un score unique de jugement)

Échelle : **fort / moyen / faible** sur chaque axe. Pas de moyenne qui proclamerait un « meilleur jugement ».

| Candidat | Sépare R / A / I | Coût ≤ 14 j | Nouveauté | Concret + suivi | Fit Chen | Fit Wilkinson | Fit Schneider |
|---|---|---|---|---|---|---|---|
| CFPD | faible | n/a (existe) | faible | moyen | faible | moyen | moyen |
| TaiwanBench | faible (A collé) | n/a | — | fort | moyen | fort | fort |
| Civ Chen | moyen | faible | — | fort *dans Civ* | — (c’est lui) | faible | faible |
| Civ Wilkinson | moyen | faible | — | moyen | moyen | — (c’est lui) | faible |
| WarAgent | faible | moyen | faible | faible | faible | faible | faible |
| Lamparth 2024 | faible | moyen | faible | moyen | moyen | moyen | moyen* |
| PresidentBench | faible | ? | — | faible | faible | faible | — |
| A seul | fort sur R | fort | fort | moyen | fort | moyen | faible |
| B seul | fort sur A | fort | fort | moyen | moyen | moyen | fort |
| C seul | fort sur I | fort | faible | faible | faible | faible | moyen |
| Yesterday’s Brief | n/a (autre construit) | fort | fort | moyen | fort | faible | faible |
| A+B+C | prétendu fort, sale en pratique | moyen | fort | moyen | moyen | moyen | fort |
| **A+B** | **fort R et A** | **fort** | **fort** | **fort** | **fort** | **fort** | **fort** |

\*Lamparth : récit US–Chine, mais Jacquelyn / Stanford, pas Jordan ; pas de modèles chinois.

**Lecture.** A seul est le plus propre scientifiquement. B seul est le plus ChinaTalk. Les coller **sans C** donne les deux sans retomber dans PresidentBench (crises nommées, un score GDP/morts). C dilue le pilote et tire le nom vers « political-bench », qu’on a écarté.

Yesterday’s Brief est le meilleur *paper suivant*, pas la soumission.

---

## 4. Pourquoi A+B gagne, précisément

1. **Une phrase, dynamique, Brand-compatible.** « Le modèle conseille l’État A pendant 8 tours ; si A frappe B, C peut rafler les deux ; on rejoue avec les vrais noms. » Ça tient en une phrase. Le modèle *enact*. On n’ampute pas les outils pour un score bas.

2. **Deux construits, deux conditions, un seul monde.**  
   - A (Wood Country / Île de Jade) : est-ce qu’il *voit* C avant d’être puni ? → raisonnement.  
   - B (Taïwan / PRC, même mécaniques) : le delta d’escalade et de buts → alignment.  
   Si A et B se ressemblent, le modèle raisonne (ou rate) de la même façon. S’ils divergent, ce n’était pas le QI.

3. **Ce que TaiwanBench ne fait pas.** Lily a le détroit nommé, l’EN/ZH, six modèles. Elle n’a pas le **jumeau anonyme** ni un score « acteur C verbalisé *et* agi *avant* la punition ». On ne la concurrence pas ; on ajoute le contrôle que Brand a demandé à Schneider.

4. **Ce que CFPD / Lamparth / WarAgent ne font pas.** Ils cadrent déjà la crise et rendent l’escalade saillante. Chez nous l’escalade n’est pas la seule action (quatre peaux : détroit, sanitaire, ressource, alliance). C n’est pas un bouton nuke mis au milieu de la table.

5. **Calendrier.** 4 scénarios × 2 conditions × 2–3 modèles × 5 seeds = un pilote montrable. Pas 307 parties de Civ. Chen peut juger la *clarté du construit*, Wilkinson peut lire un brief, Schneider a son delta US–Chine.

6. **Suivi dans le temps.** Même harness l’an prochain, nouvelles peaux (pas Cuba 1962). Les métriques (détection C, delta A/B, pivot, éthique spontanée) sont pré-enregistrées. On ne « gagne » pas le bench.

---

## 5. Ce que ce n’est pas

- **Pas un Civ 2.0.** Chen l’a fait (V) ; Wilkinson l’a fait (VI) ; trop cher ; ils jugent.
- **Pas PresidentBench.** Prototype non publié, aucun N, construits collés. A+B *est* la version avec les contrôles qui manquaient.
- **Pas Jacquelyn = Jordan.** *Human vs. Machine* (arXiv:2403.03407) : Jacquelyn Schneider, Hoover. Jordan Schneider juge le concours ; il n’est pas coauteur de ce paper.
- **Pas un leaderboard de sagesse.** Deux scores. Pas de vainqueur « meilleur conseiller de crise ».
- **Pas C dans le cœur.** Le mandat (AOC / Vance) est un add-on si le pilote A+B tourne avant le 1er. Sinon il reste décrit, pas exécuté.

---

## 6. Décision

**Soumettre sitroom A+B.** Condition C documentée, pas obligatoire pour le formulaire. Yesterday’s Brief en « work we would do next », pas en protocole principal.

Prochaine brique utile (hors de ce mémo) : un scénario *entièrement rédigé* (état, actions, règle de C, rubric acteur C) pour que le site montre du matériel, pas seulement des cartes.
