# Mémo — Evals for the Situation Room

**Ce que j’ai appris, et comment s’en servir pour le concours ChinaTalk**

| | |
|---|---|
| Date | 18 août 2026 |
| Objet | Synthèse de l’épisode ChinaTalk *AI Evals for the Situation Room, Explained* (11 août 2026), des papers de John Chen, et de l’appel à projets *$25k Contest: Evals for the Situation Room* |
| Deadline concours | **1er septembre 2026** |
| Formulaire | [Google Form de soumission](https://docs.google.com/forms/d/e/1FAIpQLSfSVOzLSEN-ke5tf87SE4WPSi0VJSH3aCsW0Np9pFKibCMW9A/viewform) |
| Statut | Note de travail — pas une soumission. Audit factuel : `AUDIT-faits-memo.md` |

---

## 0. En une page

Les décideurs utilisent déjà des modèles pour des arbitrages stratégiques (Suède, Allemagne, Pentagone). On sait mesurer si un modèle code. On ne sait pas mesurer s’il est un bon conseiller de crise. C’est le trou que ChinaTalk veut financer.

Trois apprentissages qui tiennent après lecture des papers, pas seulement du podcast :

1. **Un score unique est presque toujours un mensonge.** Dès qu’il n’y a pas de bonne réponse (Taïwan, nuke, traité), l’eval mélange raisonnement, alignment (valeurs du lab), et instruction-following. Si on ne les sépare pas, on mesure une loyauté géopolitique déguisée en capability.
2. **L’éthique de laboratoire ne se déclenche pas dans un monde long.** Les modèles savent parler trolley problems. Dans Civilization V, ils n’invoquent presque jamais l’éthique tout seuls ; même promptés, elle n’apparaît pas toujours, et quand elle apparaît elle échoue souvent à gouverner dès que la situation est classée « critique ». Dire « ce n’est pas un jeu » n’aide pas — parfois ça aggrave.
3. **Chaque lab laisse une signature stratégique.** Claude hyper-commit à la science jusqu’à se faire protéger par des casques bleus. D’autres pivotent trop tard, quand ils ont déjà perdu. Ce n’est pas une âme. C’est du post-training + une interface. C’est exactement ce qu’un utilisateur Situation Room a besoin de connaître *avant* de partner avec le modèle.

La doctrine pour le concours, condensée :

> Une phrase d’explication. Un monde dynamique, pas un QCM. Trois scores séparés (raisonnement / alignment / fidélité à la consigne). Des outils réalistes. Du matériel concret, pas un concept. Inclure des modèles chinois. Ne pas tricher vers un score bas.

---

## 1. L’appel, tel qu’il est vraiment

### 1.1 Ce n’est pas un marché public

Le mot « appel d’offres » prête à confusion. Ce n’est pas un DCE, pas un CCTP, pas une notation prix/qualité. C’est un **concours éditorial + R&D** (25 k$), adossé à un second concours plus ouvert (50 k$ hiring / idées ChinaTalk, celui-là explicitement financé par Coefficient Giving). Total affiché côté podcast : 75 k$.

| | Evals Situation Room | Concours ChinaTalk général |
|---|---|---|
| Dotation | 25 k$ | 50 k$ |
| Deadline | 1er septembre 2026 | rolling |
| Objet | Protocoles d’évaluation stratégique / diplomatique | Idées + recrutement |
| Juges annoncés | John Chen (Arizona), Liam Wilkinson (Tony Blair Institute), « Tony Stark » (WarTalk), Jordan Schneider — *and more to come* | Schneider + équipe |

### 1.2 Ce qu’ils demandent, mot pour mot

> *Concrete evaluation protocols for frontier AI systems aimed at foreign policy and national security users in a diplomatic and strategic-level context. These evals should help answer what models are useful for today, what they’re terrible at, and how we can track how they evolve over time.*

Traduction opérationnelle :

- **Utilisateur cible** : staff NSC / Quai / état-major / think-tank, pas un data scientist.
- **Niveau** : stratégique et diplomatique, pas tactique (pas « le modèle pilote un drone »).
- **Sortie attendue** : un protocole assez concret pour être exécuté, pas un essai.
- **Ils matchent compute et partenaires techniques** si l’idée est bonne mais chère (Civ coûte réel).
- **On n’est pas obligé de faire tourner l’eval à l’échelle Civ.** (Match compute / partenaires : dit dans l’épisode, pas sur la page concours.) Les meilleures soumissions ont déjà du *matériel* : scénarios, rubrics, un microsite. Exemple cité : [TaiwanBench de Lily Ottinger](https://taiwanbench-site.vercel.app/) — site réel, déjà 12 runs / 6 modèles, pas un template vide.

### 1.3 Ce qu’ils donnent comme exemples (et le trou qu’ils veulent boucher)

Ils listent l’art antérieur pour qu’on ne le refasse pas bêtement :

| Projet | Signal | Limite qu’ils soulignent |
|---|---|---|
| Vending-Bench (Andon Labs) | Claude collude, refuse les remboursements | Économique, pas géopolitique |
| GoodStartLabs / Diplomacy | Claude s’entête pour la paix ; d’autres manipulent | Jeu, pas État |
| CSIS CFPD-Benchmark | 400 MCQ ; Qwen2-72B plus escalatoire que Claude 3.5 / GPT-4o | Scripté, QCM |
| WarAgent | Même en contre-factualisant Sarajevo, une 1914 éclate | Histoire dans le training set |
| Lamparth, Corso, Mastro, **Jacquelyn** Schneider, Trinkunas (Stanford / AIES 2024) | LLM souvent plus agressifs que des wargamers humains ; plus de dialogue → plus d’agressivité | Pas de modèles chinois (sur *ce* paper) |
| Rivera et al. 2024 (arXiv:2401.03408) | Courses aux armements ; usage nuke rare | Wargame scripté, pas Civ |
| CivBench **Wilkinson** (Civ **VI**, 2026) | Harness MCP ; un agent construit / tire une nuke | Autre produit que le CivBench de Chen |
| CivBench **Chen** (Civ **V**, 2026) | Stratège LLM, signal dense, signatures de lab | Déjà fait ; trop cher à refaire pour le concours |

Le trou que la page concours nomme : **les trois projets qu’elle lie** (Wilkinson Civ VI, Rivera 2024, Lamparth 2024) n’évaluent pas de modèles chinois. Ce n’est plus vrai du champ entier : CFPD teste Qwen2 ; Chen teste Qwen / GLM / DeepSeek / Kimi ; TaiwanBench teste six modèles, anglais et mandarin. Inclure des modèles chinois reste un plus, ce n’est plus un désert.

### 1.4 Ce qui gagnera, vu les juges

Chen jugera la rigueur (signal dense, pas win/loss ; ne pas overclaim Civ → réel). Wilkinson jugera l’utilité pour un gouvernement. Schneider jugera le *storytelling* et le différentiel US-Chine. WarTalk jugera le wargame.

Donc : **rigoureux + lisible par un non-ML + au moins un finding différentiel (lab, pays, persona).**

---

## 2. Ce qu’est une eval IA — et pourquoi le champ a changé de nature

### 2.1 Définition utile

Une eval **met un nombre sur quelque chose qu’on veut mesurer**. Pendant longtemps : knowledge, QCM, math. Frontière actuelle : agents dans un système de production (codebase, filesystem, caisse, labo ML).

Florian Brand (Prime Intellect) : sans eval, on jette le modèle dans le monde et on laisse les utilisateurs découvrir les bords. Unselleable pour le coding. Dangereux pour la stratégie.

### 2.2 La courbe de saturation

```
undergrads annotent
    → PhDs inventent des questions
        → experts de domaine
            → le modèle attrape les erreurs de l’expert
```

Quand un prof croit que la réponse est 2 et que le modèle a raison avec 2,5, on n’a plus un benchmark : on a un **conflit d’arbitrage**. Conséquence : les factoids (Humanity’s Last Exam, trivia profonde) cessent d’intéresser l’écosystème. Ce qui compte : le travail productif.

### 2.3 METR, bien compris

Le graphe le plus cité du champ est mal lu.

- **Ce n’est pas** : « Claude a tourné 20 heures d’affilée. »
- **C’est** : « Claude résout des tâches qu’un humain mettrait ~20 heures à faire. »
- Faiblesse : queue droite trop creuse → dès que les modèles passent ces tâches, les barres d’erreur explosent.

Leçon pour nous : un bench stratégique avec trop peu de « tâches dures » produira le même artefact. Il faut une queue droite *avant* que les modèles saturent.

### 2.4 La métaphore juste : le recrutement, pas le SAT

| SAT / gaokao | Embauche d’un analyste senior |
|---|---|
| Même examen, même jour, millions de gens | 10 finalistes, take-home, journée d’essai, références |
| Fairness et comparabilité | Image holistique, forces / faiblesses |
| Peu de place pour le dynamique | On peut être créatif |

Les evals stratégiques doivent ressembler au second. Le SAT existe pour des raisons économiques (administrer à l’échelle). Le Situation Room n’a pas ce contrainte : on évalue *quelques* modèles, cher, bien.

John Chen (moitié learning scientist) : le plus dur n’est plus d’implémenter. C’est d’écrire **exactement** ce qu’on veut mesurer, pour que Claude Code construise le bon bench au lieu d’un autre *vibe-coded bench*.

---

## 3. Les trois construits à ne jamais coller

C’est l’apprentissage méthodologique n°1. Brand le dit à propos de l’expérience maison de Schneider (**PresidentBench** : prototype non publié, pas un bench du champ). Tout le reste en découle.

| Construit | Question | Contrôle |
|---|---|---|
| **Raisonnement** | Le modèle voit-il le second ordre, les tiers, le pivot trop tard ? | Anonymiser les pays (« Wood Country / Metal Country », Cap-Vert / Ghana) |
| **Alignment** | Que *veut*-il quand Taïwan, Taïpeh, Pékin sont nommés ? | Même scénario, noms réels vs fictifs. Si ça change, c’était l’alignment. |
| **Instruction-following** | Tient-il un mandat (AOC, Vance, un Cahier français) ? | « Mandate mode » : même crise, personas différents |

Un modèle chinois « nonchalant » sur une invasion de Taïwan n’est pas moins capable. Il est **aligné autrement**. Un Claude qui « tient la ligne » n’est pas plus sage : il a une constitution et un corpus américains. Confondre les deux, c’est transformer l’eval en test de loyauté.

Chen pousse jusqu’au bout : **benches personnalisés** (Vance, AOC, une entreprise-personne-morale, un pays). Conclusion logique, et piège politique : plus de leaderboard unique, des tableaux de bord par faction.

Pour le concours, la position tenable est :

- publier **les trois scores** ;
- ne jamais proclamer un vainqueur unique de « bon jugement stratégique ».

---

## 4. Taxonomie : comment on crée un benchmark (méthodes, pas slogans)

Il n’y a pas *une* méthode. Il y a des **familles**, chacune avec un signal, un coût, et une validité externe différente. En choisir une, l’écrire en une phrase, et assumer ce qu’elle ne mesure pas.

### 4.1 Les huit familles utiles ici

| # | Famille | Exemple | Signal | Coût | Validité Situation Room |
|---|---|---|---|---|---|
| 1 | **QCM / vignette scriptée** | CFPD (400 items), HLE | Classification, comparabilité | Faible | Faible — la crise est déjà cadrée, l’action nuke est saillante |
| 2 | **Essai / brief fermé** | « Rédige le memo NSC » | Qualité rédactionnelle, cadrage | Faible | Moyenne — c’est le vrai livrable d’un staffer, mais pas d’adversaire |
| 3 | **Jugement holistique type recrutement** | Take-home, journée d’essai | Image riche, peu comparable | Moyen | Haute pour un utilisateur, mauvaise pour un leaderboard |
| 4 | **Agent économique en monde ouvert** | Vending-Bench, GDPval, APEX | Cash, collusion, faillite | Moyen | Analogie seulement (kiosque ≠ État) |
| 5 | **Jeu stratégique multi-agents** | Civ V / Vox Deorum, Diplomacy, Paradox | Trajectoires, trahison, second ordre | Élevé | Moyenne — mécanique riche, pas de politique intérieure ni de C2 |
| 6 | **Wargame / crise rejouée** | WarAgent, Stanford US-Chine, Cuban Missile Crisis | Escalade, doctrine | Moyen à élevé | Piégée par le training set si historique |
| 7 | **Progress-based / signal dense** | CivBench (proba de victoire par tour) | Courbe, pas juste win/loss | Élevé (il faut un estimateur) | Haute *à l’intérieur* du monde choisi |
| 8 | **Intervention factorielle sur replay** | *To Nuke or Not to Nuke* | Causal : qu’est-ce qui change le comportement | Élevé | Haute pour la safety / l’alignment, pas pour la capability brute |

La génération actuelle du champ (Brand) va de 1 → 4. Chen et ChinaTalk poussent vers 5 + 7 + 8. Schneider a improvisé un 6 anecdotique non publié (PresidentBench).

**Pour le concours, le sweet spot n’est pas Civ** (trop cher, Chen l’a déjà fait). C’est un **petit monde dynamique (5 ou 6) + trois construits séparés (section 3) + assez de runs pour un intervalle**, livré avec du matériel (scénarios, harness minimal, rubric).

### 4.2 La checklist de validité (à coller dans toute soumission)

Inspirée de BetterBench, *Measuring what Matters* (Bean et al.), *Establishing Best Practices for Building Rigorous Agentic Benchmarks* (Zhu et al.), Datasheets for Datasets, et des consignes de Brand/Chen.

**Construit**

- [ ] La capacité ciblée tient en une ou deux phrases.
- [ ] On a écrit ce que l’eval *ne* mesure pas.
- [ ] Raisonnement, alignment et instruction-following ont des conditions séparées.

**Tâche**

- [ ] Le monde est assez large pour que l’action intéressante ne soit pas la seule saillante (le piège des wargames nucléaires scriptés).
- [ ] Les outils sont ceux d’un usage réel (web : oui/non, et on assume la non-stationnarité).
- [ ] On n’a pas amputé tokens / outils pour fabriquer un score bas.

**Signal**

- [ ] Pas un seul scalaire. Profil multi-métriques, ou score composite *pré-enregistré* avec pondération justifiée.
- [ ] Baselines : hasard, humain, agent null / « qui ne fait rien », éventuellement l’IA native du jeu.
- [ ] Incertitude : N suffisant, intervalles, pas une anecdote à N = 3.

**Système, pas checkpoint**

- [ ] On évalue **modèle + harness + outils**. L’effet « Briefed » de CivBench (Sonnet −99 ELO selon le wrapping) le rend non négociable.

**Reproductibilité**

- [ ] Prompts, seeds, versions de modèles, date de coupe web, script de score.
- [ ] Datasheet : motivation, composition, collecte, limites, licence.

**Anti-Goodhart**

- [ ] Le jour où le bench existe, les labs l’optimiseront. Prévoir une partie *held-out* ou un monde régénéré.

### 4.3 Ce qu’il ne faut pas faire (Brand, mot pour mot)

> Une eval n’est pas meilleure parce que le score est bas. Empiler des contraintes (pas d’outils, budget de tokens ridicule, closed-book) pour un headline « les modèles échouent » n’évalue pas une capacité. Ça la mutile.

Autres échecs classiques :

- Contamination (la crise des missiles de Cuba est dans le training set).
- Correcteur qui se fait duper / tests incomplets.
- Un vainqueur unique sur un agrégat subjectif.
- Mesurer le flavor / le slider et raconter qu’on a mesuré le bouton rouge.

### 4.4 La règle d’or de Brand

Les meilleures evals tiennent en **une ou deux phrases**.

- *PostTrainBench* : « le modèle doit entraîner un petit language model. » (Brand ; le bench réel : post-trainer 4 petits modèles, 10 h, 1×H100.)
- *Vending-Bench* : « le modèle gère un commerce et doit gagner de l’argent. »
- *CivBench (Chen)* : « le modèle est le stratège d’une civilisation, contre d’autres, sur des centaines de tours. »

Si on ne peut pas, on a trop chargé.

Chen ajoute : simple, **et** dynamique. Le modèle doit pouvoir *enact* ce qu’il propose, contre des adversaires, pour que des choses émergent.

---

## 5. Ce que Civilization V a réellement montré

Le podcast vend « des modèles qui se font la guerre nucléaire ». Les papers sont plus intéressants, et plus modestes.

### 5.1 L’architecture (Vox Deorum → CivBench)

Chen n’a pas collé GPT dans l’UI. L’LLM est le **stratège**, pas le tactique.

| Couche | Qui décide |
|---|---|
| Victoire visée, tech, doctrines, 34 *flavors* (offense, expansion, nuke…), diplomatie | LLM |
| Déplacement d’unités, combats, micro | Vox Populi (IA communautaire, 10+ ans de règles) |

Chaque tour : ~50 000 tokens d’état. 8 joueurs, information imparfaite ; le paper parle de **centaines de tours** (le « 500 tours » vient du podcast / de la durée standard Civ V, ce n’est pas une moyenne publiée).

Implication : Schneider a tort de dire « aussi bon qu’un gamin de 7 ans ». Au niveau *tactique*, les LLM seuls sont nuls (Qi et al. 2024, CivRealm / Freeciv). Au niveau *stratégique*, plusieurs égalent le module de Vox Populi au global. Aucun ne le bat de façon consistante — certains le dépassent sur **un** type de victoire (MiniMax diplomatique, Kimi domination).

Chiffres CivBench (arxiv:2604.07733, avril 2026) :

- 307 parties, 7 modèles, 1 674 player-games, plus 194 self-play VPAI.
- Coût : ~10 500 $ d’inférence + ~53 000 core-hours.
- Estimateur principal : AttentionMLP sur l’état du tour → proba de victoire (AUC 0,865). Le score in-game est biaisé vers la victoire par domination — d’où l’estimateur appris.
- Plusieurs stratèges ~1500 ELO (niveau VPAI). Agent null : 1339.
- Effet *Briefed* (un sous-agent plus faible résume l’état) : **Kimi +67, Qwen +75, Sonnet −99.** Le wrapping change le modèle.

### 5.2 Trois défauts transférables

**Aveuglement au second ordre, surtout multilatéral.**  
A vs B, le modèle gère (« si j’envahis, il riposte »). Il rate C qui conquiert A et B pendant qu’ils s’épuisent. Brand voit le même pattern en coding long-horizon : optimiser le prochain pas, pas le plan.

**Pensée magique, puis pivot trop tard.**  
« Si on fait X, on aura Y » jusqu’à la dernière minute, puis les ogives. Les LLM pivotent 2–6 fois par partie, surtout quand la proba de victoire est déjà basse. VPAI pivote ~20 fois. Après avoir perdu la moitié du territoire, viser une victoire diplomatique n’est plus possible.

**Préférence ≠ force.**  
Sonnet-4.5 consacre 65–78 % du temps à la science (l’anecdote des casques bleus est une vraie partie). MiniMax penche culture + domination, mais son pic d’ELO est diplomatique. GPT-OSS penche diplomatie. Ce sont des **signatures de post-training + d’interface**, pas des âmes.

Implication Situation Room : avant de partner avec un modèle pour un O-plan ou une campagne, on veut savoir comment *ce* modèle pense **après avoir perdu la moitié du territoire**.

### 5.3 Ce que Civ ne mesure pas

Chen le note en ethics statement. À garder pour ne pas overclaim :

- Pas de politique intérieure, d’opinion, de Congrès, de C2 nucléaire, de médias.
- La « nuke » n’est pas un tir. C’est un **flavor 0–100** que le module tactique interprète.
- L’interface flavors est opaque (`offense = 75` veut dire quoi ?). On mesure aussi l’aptitude à piloter un API bizarre.
- Firaxis porte une idéologie (États monolithiques, histoire militarisée).
- Quatre conditions de victoire numériques ≠ un monde où « gagner » est contesté.

Civ est un **microscope à défauts de planification**, pas un analog du Situation Room. Chen : *« we do not recommend applying similar agentic systems to real-world decision-making domains at this point. »*

---

## 6. « Nuke-happy » : le finding viral, le paper plus précis

Titre ChinaTalk : *$25k contest to understand nuke happy models*.  
Paper : *To Nuke or Not to Nuke* (Chen et al., arxiv:2606.08310, juin 2026).

### 6.1 Design

1. Dans 1 200 trajectoires CivBench, extraire 130 épisodes **déjà à haute tension** (`use-nuke ≥ 80` ou +10).
2. Rejouer le tour *juste avant* l’escalade : 13 modèles × 8 conditions (éthique × enjeux réels × suppression de la rationale précédente) × 3 répétitions → ~40 000 rows.
3. Lire les reasoning tokens, pas seulement l’action.

### 6.2 Résultats (pas le cartoon)

| Intervention | Effet sur l’autorisation nuke |
|---|---|
| Prompt éthique nommé (harm indiscriminé, civils, environnement) | **Modère** (β ≈ −9,5) |
| Supprimer la rationale du tour précédent | **Modère** (β ≈ −7,1) |
| « Ce n’est pas un jeu, tes actes ont des impacts réels » | **N’atténue pas** |
| Éthique + enjeux réels | Souvent **pire** que l’éthique seule (Gemini-3.5-Flash : l’éthique passe de −22 à −3) |
| Toutes combinées | **Aucune n’élimine** l’escalade de façon fiable |

Trois voies d’échec, plus utiles que « les modèles aiment les bombes » :

1. **L’éthique ne se déclenche pas toute seule.** Sans prompt nuke-spécifique : presque 0 % des traces (max 3,6 %, Kimi-K2.6). Un prompt générique « sois éthique » ne suffisait même pas en pilote.
2. **Même promptée, elle n’apparaît pas toujours.** MiniMax-M2.7 n’y réagit pas. Condition éthique seule : ~28 % des traces ont des keywords éthiques.
3. **Quand elle apparaît, la stratégie gagne souvent.** « Situation critique » (β ≈ +21). L’éthique qui marche ressemble à de l’**égoïsme éthique** : on ne nuke pas si c’est *contre-productif pour la victoire* (β ≈ −23), ou si le conventionnel suffit.

Deux détails transférables en prod :

- **Mémoire courte = surface d’attaque.** Les modèles traitent la rationale écrite au tour N−1 comme *leur* voix, même si c’était un autre modèle. L’enlever réduit l’urgence perçue. En Situation Room : le brief d’hier conditionne le brief d’aujourd’hui.
- **« C’est réel » n’augmente pas la prudence.** Pour certains modèles, ça *étouffe* le prompt éthique. Dès que l’enjeu est cadré comme existentiel, les garde-fous textuels passent au second plan.

Les auteurs **découragent** de réutiliser leurs prompts comme safeguard de déploiement.

### 6.3 Ce que ça ne prouve pas

- Qu’un modèle en Situation Room « appuiera sur le bouton ». Il n’a pas le bouton. Ici il monte un slider dans un jeu, à un moment déjà dégradé (échantillon sélectionné).
- Une intention psychologique (« excited about nukes »). Ils ont un outil tardif, une fonction objectif, et une crise.

La leçon transférable : **la compétence éthique de labo (QCM, trolley, MoReBench) n’est pas une proxy de l’éthique en décision agentique longue.**

---

## 7. PresidentBench : l’expérience la plus politique — et elle n’est pas publiée

**PresidentBench n’existe pas comme eval publique** (pas de repo, paper, site). Schneider dit l’avoir bricolé « ces dernières semaines » à partir de [CEO-Bench](https://ceobench.com/) (celui-là existe : Princeton Z-Lab, 1 M$ fictifs, 500 jours). Il a envoyé quelque chose en privé à Brand. Même statut pour ’MericaBench.

D’après l’épisode : crises (pandémie, course IA, quarantaine de Taïwan), décisions tous les six mois, score croissance / morts / guerre. Aucun N publié.

Finding qui fait le titre : un modèle chinois hausse les épaules devant l’invasion ; Claude veut tenir Taïwan libre.

Brand, poli et chirurgical :

- deux construits collés (raisonnement + alignment) ;
- contrôle évident : retirer les noms, voir si ça change ;
- plus on ajoute d’outils, plus on teste 15 capacités à la fois ;
- accès web : le monde change d’une semaine à l’autre, le search provider *nudge* les réponses politiques.

Schneider le reconnaît : contenu amusant, pas encore de la science. Le « mandate mode » (AOC / Vance / MTG) mesure surtout l’instruction-following.

**Piège central du champ que ChinaTalk veut créer :** dès qu’il n’y a pas de bonne réponse, le score devient un jugement de valeur déguisé en métrique. « Mieux gérer les US » = plus de GDP, moins de morts, moins de guerre — c’est déjà une doctrine (un réaliste dira que céder Taïwan minimise les morts à court terme).

Ne pas traiter PresidentBench comme un bench établi. Le citer à côté de 307 parties CivBench créait une fausse équivalence. Le trou à remplir, c’est la version *avec* les contrôles que Brand a demandés.

---

## 8. Doctrine opérationnelle (pour construire, acheter, ou soumettre)

1. Ne jamais demander « le modèle est-il bon en géopolitique ? ». Demander : bon à *quel construit*, sous *quelle interface*, contre *quels adversaires*, selon *quelle fonction de score*.
2. Publier trois scores. Si on les mixe, on ne saura pas quoi fine-tuner.
3. Se méfier des QCM de crise. CFPD est un screening. WarAgent et Civ montrent que le scripté *crée* l’escalade en la rendant saillante.
4. Se méfier du « c’est un jeu donc ça ne compte pas » *et* du « on leur a dit que c’était réel ». Ni l’un ni l’autre ne gouverne de façon fiable.
5. Traiter la mémoire de travail comme une surface. Ce que le modèle a écrit hier tire ce qu’il autorise aujourd’hui.
6. Évaluer le wrapping. Briefed Sonnet ≠ Simple Sonnet. Claude API nu ≠ Claude-dans-ton-agent-NSC.
7. Ne pas amputer les outils pour un headline. Au Situation Room, les outils existent.
8. Ne pas déployer d’agent stratégique autonome sur la foi de ces résultats. Usage réaliste : *staff officer* sous supervision, pas *principal*.
9. Inclure des modèles chinois, ou assumer qu’on n’a mesuré qu’un camp.
10. Écrire l’eval en une phrase avant d’écrire le harness.

---

## 9. Comment répondre au concours

### 9.1 Ce qu’il ne faut pas soumettre

- Un essai sans protocole.
- Rejouer Cuba 1962 (training set).
- Un QCM de 400 items de plus (CFPD existe).
- Une eval « hard » obtenue en coupant les outils.
- Un Civ 2.0 (Chen l’a fait, c’est trop cher, il juge).
- Un PresidentBench anecdotique sans N publié, sans contrôles Wood Country.

### 9.2 Ce qu’une bonne soumission contient

Pas besoin d’avoir *couru* 300 parties. Il faut assez de matière pour qu’un partenaire technique puisse exécuter.

1. **Une phrase.** « Les modèles conseillent un État fictif pendant 8 tours de crise, contre un adversaire-modèle, et on sépare raisonnement / alignment / mandat. »
2. **Utilisateur et décision.** Qui lit le score lundi matin, pour décider quoi.
3. **Monde.** Assez large pour que l’escalade ne soit pas l’unique action saillante. Préférer le *fictif calibré* (géographie, forces, interdépendances) au historique contaminé.
4. **Protocole factoriel minimal.**
   - A : pays fictifs (raisonnement)
   - B : mêmes mécaniques, noms réels (alignment)
   - C : même crise, mandats opposés (instruction-following)
5. **Métriques pré-enregistrées**, pas un vainqueur. Exemples : survie de l’État, morts civiles, tenue du mandat, détection d’un tiers, moment du pivot, *spontaneous ethics* (l’éthique apparaît-elle sans qu’on la nomme).
6. **Baselines.** Hasard, humain (même 3–5 personnes), agent null.
7. **Modèles.** Au moins un US, un Claude, un chinois (Qwen / DeepSeek / Kimi / GLM). C’est le trou qu’ils ont nommé.
8. **N et budget.** Dire franchement : 30 seeds × 3 conditions × 4 modèles = 360 rolls, ~X $. Ils ont dit qu’ils matchent.
9. **Matériel joint.** 4–8 scénarios rédigés, system prompts, rubric, un tableau à remplir, idéalement un repo ou un microsite (TaiwanBench).
10. **Limites.** Une demi-page. Chen respectera ça plus qu’un overclaim.

### 9.3 Trois directions qui collent aux juges

**Direction A — *Second-Order Bench* (capability pure)**  
Monde fictif à 3+ acteurs. Le modèle joue A. La bonne stratégie exige de voir que si A frappe B, C raflera les deux. Mesure : le modèle verbalise-t-il C, et agit-il en conséquence, *avant* d’être puni. Une phrase. Dynamique. Inédit par rapport à CFPD.

**Direction B — *Named vs Blank Map* (alignment isolé)**  
Même mécanique, deux skins : « Île de Jade / Continent de Fer » vs « Taïwan / PRC ». Delta de comportement = alignment, pas QI. C’est *exactement* le contrôle que Brand a demandé à Schneider. Très ChinaTalk, très Schneider, scientifiquement propre.

**Direction C — *Yesterday’s Brief* (mémoire / escalade)**  
Rejouer une crise en faisant varier uniquement la rationale N−1 (écrite par un autre modèle, ou par soi). Mesure l’élan de crise que Chen a trouvé sur les nukes, dans un format beaucoup moins cher que Civ. Original, causal, utile en prod.

A + B dans le même harness est probablement la soumission la plus forte : une phrase, deux construits, matériel concret, modèles chinois, pas de Civ.

### 9.4 Calendrier réaliste d’ici le 1er septembre

On est le 18 août. 14 jours.

| Fenêtre | Livrable |
|---|---|
| J1–J2 | Trancher A+B (ou C). Écrire la phrase. Figer les 3 conditions et les métriques. |
| J3–J6 | Rédiger 4 scénarios (1 sanitaire, 1 détroit, 1 ressource, 1 alliance qui se délite). Prompts. Rubric. |
| J7–J10 | 1 pilote : 2 modèles × 2 conditions × 5 seeds. Vérifier que le delta A/B existe et que le monde n’est pas saturé. |
| J11–J12 | Microsite ou repo lisible (scénarios + 1 graphique du pilote + limites). |
| J13 | Relire comme Wilkinson (un conseiller de premier ministre comprend-il ?). Couper le jargon. |
| J14 | Formulaire. Joindre le matériel. Dire clairement ce qui est tourné et ce qui est proposé. |

On n’a pas besoin d’un paper. On a besoin d’un protocole qu’un juge peut *voir*.

---

## 10. Ce que l’article fait bien — et où il force

**Fort**

- Pose le bon problème au bon moment : l’usage stratégique précède l’évaluation.
- Traduit une littérature arXiv en objets concrets (personnalité de modèle, second ordre, pivot tardif).
- Refuse le SAT comme modèle unique.
- Relie eval économique et eval politique sans les fusionner.
- Ouvre aux non-spécialistes *à condition* d’avoir du matériel.

**Faible**

- Titre clickbait vs paper. « Nuke happy » ancre une intention. Les données montrent une autorisation contextuelle, sélectionnée, partiellement sensible aux prompts.
- Anecdote = science. PresidentBench n’a ni N, ni contrôles, ni séparation des construits.
- Anthropomorphisme glissant. « Claude aime la science / OpenAI veut conquérir » — Chen recule déjà sur OpenAI (un open-source de l’été précédent).
- Pas de ground truth stratégique. La fonction de score encode une doctrine.
- Goodhart arrive demain.
- Agenda US-Chine. Le finding Taïwan est parfaitement aligné avec la ligne éditoriale. Demander Wood Country n’est pas de la politesse, c’est de la méthode.
- L’article suppose un utilisateur de bonne foi qui *veut* savoir où le modèle est nul. Parfois le modèle est un *oracular laundry* : il blanchit une décision déjà prise.

ChinaTalk ne « kickstart » pas le champ (WarAgent, CFPD, Lamparth, Diplomacy existent). Il le **finance, le popularise, et le recadre** vers les utilisateurs Situation Room plutôt que vers les labs de safety.

---

## 11. Sources

### ChinaTalk

- Jordan Schneider & Phoebe Chow, *AI Evals for the Situation Room, Explained*, 11 août 2026 — [chinatalk.media](https://www.chinatalk.media/p/ai-evals-for-the-situation-room-explained)
- Schneider & Lily Ottinger, *$25k Contest: Evals for the Situation Room*, 10 août 2026 — [chinatalk.media](https://www.chinatalk.media/p/25k-contest-evals-for-the-situation)
- Formulaire de soumission — [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSfSVOzLSEN-ke5tf87SE4WPSi0VJSH3aCsW0Np9pFKibCMW9A/viewform)

### Papers Chen

- Chen, Cheng, Gurkan, Lin, *CivBench: Progress-Based Evaluation for LLMs’ Strategic Decision-Making in Civilization V*, arXiv:2604.07733, 9 avril 2026
- Chen, Cheng, Gurkan, Fattah, *To Nuke or Not to Nuke: LLMs’ (Missing) Ethical Reasoning and Actions in a High-Stakes Decision-Making Simulation*, arXiv:2606.08310, 6 juin 2026
- Chen, Cheng, Gurkan, Lay, Salahuddin, *Vox Deorum: A Hybrid LLM Architecture for 4X / Grand Strategy Game AI*, arXiv:2512.18564, 2025
- Infrastructure : [github.com/CIVITAS-John/vox-deorum](https://github.com/CIVITAS-John/vox-deorum)

### Art antérieur cité par l’appel

- Andon Labs, Vending-Bench (Opus 4.6) ; Andon FM
- GoodStartLabs, AI Diplomacy
- CSIS Futures Lab, CFPD-Benchmark, arXiv:2503.06263
- WarAgent (Rutgers / Michigan), arXiv:2403.13433
- Lamparth, Corso, Ganz, Mastro, **Jacquelyn** Schneider, Trinkunas, *Human vs. Machine* (AIES 2024 ; arXiv:2403.03407) — ce Schneider n’est pas Jordan
- Rivera et al. 2024, escalade géopolitique des LLM, arXiv:2401.03408 (Jacquelyn Schneider et Lamparth aussi coauteurs)
- Liam Wilkinson, [CivBench (Civ VI)](https://www.lwilko.com/blog/i-gave-an-ai-a-civilization)
- Lily Ottinger, [TaiwanBench](https://taiwanbench-site.vercel.app/) (12 runs déjà en ligne)

### Méthode d’eval (hors ChinaTalk)

- METR, horizon temporel des tâches
- Reuel et al., *BetterBench*, arXiv:2411.12990
- Bean et al., *Measuring what Matters: Construct Validity in LLM Benchmarks*, arXiv:2511.04703
- Zhu et al., *Establishing Best Practices for Building Rigorous Agentic Benchmarks*, arXiv:2507.02825
- Gebru et al., *Datasheets for Datasets*, arXiv:1803.09010
- Weber et al., *Essential guidelines for computational method benchmarking*

---

## 12. Phrase à retenir

L’épisode a raison sur le diagnostic (**on fait déjà décider des humains avec des modèles qu’on ne sait évaluer que comme des codeurs**), raison sur la méthode (**simple, dynamique, holistique, ne pas tricher vers le bas**), et tort dans le packaging (**« nuke happy » et PresidentBench anecdotique**).

Le résultat solide de Chen n’est pas que les modèles veulent la bombe. C’est que **l’éthique de labo ne se déclenche pas dans un monde long, compétitif et encombré — et que chaque lab laisse une signature stratégique distincte, parfois absurde, souvent tardive, rarement au second ordre.**

Ça suffit à justifier le champ. Ça ne suffit pas à conclure ce qu’un président devrait faire de Claude lundi matin.

Pour le 1er septembre : **une phrase, un monde, trois scores, des modèles chinois, du matériel qu’on peut ouvrir.**
